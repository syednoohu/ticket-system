const mongoose = require('mongoose')
const { StatusCodes } = require('http-status-codes')
const Property = require('../../models/property.model')

console.log('property.controllers.js')

const propertyController = {
	async newProperty(req, res, next) {
		const {
			name,
			type,
			status,
			grossSize,
			saleableSize,
			noOfBeds,
			noOfBaths,
			rent,
			features,
			location,
			ownerShipType,
			yearOfCompletion,
		} = req.body
		const { role } = req.body
		const {
			dateOfOwnership,
			sellOrTrasnferDate,
			buyPrice,
			sellPrice,
			ifmortgaged,
			ifRented,
		} = req.body
		const { ownershipPercent } = req.body
		const session = await mongoose.startSession()
		session.startTransaction()
		try {
			/* PropertyScehma*/
			let newProperty = new Property({
				name,
				type,
				status,
				grossSize,
				saleableSize,
				noOfBeds,
				noOfBaths,
				rent,
				features,
				location,
				ownerShipType,
				yearOfCompletion,
			})

		
			await Promise.all([
				newProperty.save({ session }),
			
			])
			await session.commitTransaction()
			session.endSession()

			return res.status(StatusCodes.OK).json({
				newProperty,
			
			})
		} catch (err) {
			await session.abortTransaction()
			session.endSession()

			console.log(err)
			res.status(StatusCodes.BAD_REQUEST)
			const error = new Error('Cannot create the property')
			next(error)
		}
	},

	async viewProperty(req, res, next) {
		try {
			let property = await Property.find()
			if (!property) {
				res.status(StatusCodes.BAD_REQUEST)
				throw new Error('No property!!!')
			}
			console.log(property)
			return res.status(StatusCodes.OK).json(property)
		} catch (err) {
			console.log(err)
			res.status(StatusCodes.BAD_REQUEST)
			const error = new Error('Cannot Find any property')
			next(error)
		}
	},
	async deleteProperty(req, res, next) {
		console.log('inside deleteProperty')
		try {
			if (!req.body.id) {
				res.status(333)
				throw new Error(
					'Property ID is Empty!! Please enter Valid Property ID'
				)
			}
			if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
				res.status(404)
				throw new Error('Please enter Valid Property ID...')
			}
			let deletedProperty = await Property.findById({ _id: req.body.id })
			if (!deletedProperty) {
				res.status(StatusCodes.NOT_FOUND)
				throw new Error('Property ID Not Found!')
			}
			deletedProperty = await Property.findByIdAndDelete({
				_id: req.body.id,
			})
			return res.status(200).json({ deletedProperty }) // WY {person}
		} catch (err) {
			res.status(res.statusCode ? res.statusCode : 501)
			next(err)
		}
	},
	async editProperty(req, res, next) {
		try {
			console.log(req.body.id)
			if (!req.body.id) {
				res.status(400)
				throw new Error('Please enter Valid Property ID')
			}
			if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
				res.status(401)
				throw new Error('Invalid Property ID')
			}
			let property = await Property.findById({ _id: req.body.id })
			if (!property) {
				res.status(402)
				throw new Error('User Not Found!')
			}
			let updatedProperty = await Property.findByIdAndUpdate(
				{ _id: req.body.id },
				{ $set: req.body },
				{ new: true }
			)
			return res.status(200).json(updatedProperty)
		} catch (err) {
			res.status(res.statusCode ? res.statusCode : 501)
			next(err)
		}
	},

	async seedProperty(req, res, next) {
		try {
			console.log('INSIDE SEED')
			const seededProperty = await Property.insertMany(req.body)
			res.status(200).json(seededProperty)
		} catch (err) {
			const error = new Error('Can\'t Seed the Property')
			res.status(StatusCodes.NOT_FOUND)
			next(error)
		}
	},
	async getAllProperty(req, res, next) {
		try {
			let allProperty = await Property.find({})
			return res.status(200).json(allProperty)
		} catch (err) {
			const error = new Error('Cannot get the Property(s)')
			res.status(501)
			next(error)
		}
	},
	async getPropertyByUser(req, res, next) {
		try {
			console.log(req.body.id)

			if (!req.body.id) {
				res.status(400)
				throw new Error('Please enter Valid Property ID')
			}
			if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
				res.status(401)
				throw new Error('Invalid Property ID')
			}
			let property = await Property.findById({ _id: req.body.id })
			if (!property) {
				res.status(402)
				throw new Error('Property Not Found!')
			}
			return res.status(200).json(property)
		} catch (err) {
			res.status(res.statusCode ? res.statusCode : 501)
			next(err)
		}
	},
}
module.exports = propertyController
