const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { StatusCodes } = require('http-status-codes')

const { attachCookiesToResponse, isTokenValid } = require('../../util/jwt.js')
const userData = require('../../util/seedData')
// const User = require('../../models/User');
const User = require('../../models/User')

// const User = require("../user/user.model.js");

const userController = {
	async getUserById(req, res, next) {
		try {
			// console.log(req.body.id)
			// 	res.status(400)
				req.body.id = req.params.id
			if (!req.body.id) {
				res.status(400)
				throw new Error('Please enter Valid User ID')
			}
			if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
				res.status(401)
				throw new Error('Invalid User ID')
			}
			let user = await User.findById({ _id: req.body.id })
			if (!user) {
				res.status(StatusCodes.NOT_FOUND)	//404
				throw new Error('User Not Found!')
			}
			return res.status(200).json(user)
		} catch (err) {
			const error = new Error(err || 'Somethig Went Wrong')
			// res.status(res.statusCode ? res.statusCode : 501)
			next(error)
		}
	},	

	async getAllUsers(req, res, next) {
		// console.log("INSIDE async getAllUsers(req, res, next) {") 
			if (!req.cookies?.refreshToken)
		return res.sendStatus(StatusCodes.UNAUTHORIZED)

		const { page=0, pageSize =10, search=''} = req.query;

		let condSearch = { 
			$match: {
				$or : [ 
					{loginName : { $regex: search, $options: "i",	}},
					{userFullName : { $regex: search, $options: "i",	}},
				]
			} 
		}
		let results = await User.aggregate([
			condSearch,
			{ $facet: {
				data: [
					{ $skip: Number(page) * Number(pageSize) },
					{ $limit: Number(pageSize) },
				],
				total: [{$count: "total"}]
				}
			}
		]);
		let users = [], total = 0
		// console.log("results.length : ",results.length) 
		if (results.length){
			users = results[0].data
			total = results[0]?.total[0]?.total
		}
		// console.log("companys : ", companys.length)
		// console.log("total : ", total)
		// return res.status(200).json({ total:0, success: true, products:[] });
		return res.status(200).json({ total:total, success: true, users:users });
	},

	async createUser(req, res, next) {
    console.log('INSIDE user CREATE',req.body) 

		const { loginName, password, userFullName, phone, email, role} = req.body
		try {
			const duplicateUserName = await User.findOne({ loginName }).lean().exec()
			if (duplicateUserName ) {
				res.status(StatusCodes.UNAUTHORIZED)	//401// change the code
				throw new Error('Duplicate User')
			}
			const userObject = {
				loginName, password, userFullName, phone, email, role  
			}
			const user = await User.create(userObject)
			if (user) { 
        res.status(201).json({ user, message: `New user ${loginName} created` })
    } else {
        res.status(400).json({ message: 'Invalid User data received' })
    }

		} catch (err) {

			next(err)
		}
	},


	async editUserById(req, res, next) {
		try {
			console.log(req.body.id)
			req.body.id = req.params.id
			console.log(req.body.id)
			if (!req.body.id) {		// never come to this METHOD "editUserById", if no "req.param.Id"
				res.status(StatusCodes.BAD_REQUEST)	//So, we can't check for empty req.params.id
				throw new Error('Please enter Valid User ID')
			}
			if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
				res.status(401)
				throw new Error('Invalid User ID')
			}
			let user = await User.findById({ _id: req.body.id })
			if (!user) {
				res.status(404)
				throw new Error('User Not Found!')
			}
			let updatedUser = await User.findByIdAndUpdate(
				{ _id: req.body.id },
				{ $set: req.body },
				{ new: true }
			)
			return res.status(200).json(updatedUser)
		} catch (err) {
			res.status(res.statusCode ? res.statusCode : 501)
			next(err)
		}
	},

	async deleteUserById(req, res, next) {
		console.log('inside deleteUser')
		req.body.id = req.params.Id

		try {
			if (!req.body.id) {		// never come to this METHOD "editUserById", if no "req.param.Id"
				res.status(333)			//So, we can't check for empty req.params.id
				throw new Error('User ID is Empty!! Please enter Valid User ID')
			}
			if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
				res.status(StatusCodes.BAD_REQUEST)
				throw new Error('Please enter Valid User ID...')
			}
			let deletedUser = await User.findById({ _id: req.body.id })
			if (!deletedUser) {
				res.status(StatusCodes.NOT_FOUND)
				throw new Error('User ID Not Found!')
			}
			deletedUser = await User.findByIdAndDelete({ _id: req.body.id })
			return res.status(200).json({ deletedUser }) // WY {person}
		} catch (err) {
			res.status(res.statusCode ? res.statusCode : 501)
			next(err)
		}
	},

	async seedUser(req, res, next) {
		try {
			console.log('INSIDE SEED')
			const seededUsers = await User.insertMany(req.body)
			// const seededUsers = await User.insert(userData.users);
			// const seededUsers = await User.insertMany([
			//   { displayName: "Gourav", email: "Gourav@gmail.com.hk" },
			//   { displayName: "Kartik", email: "Kartik@gmail.com.hk" },
			//   { displayName: "Niharika", email: "Niharika@gmail.hk.com" },
			// ]);
			res.status(200).json(seededUsers)
		} catch (err) {
			const error = new Error('Can\'t Seed the data')
			res.status(StatusCodes.NOT_FOUND)
			next(error)
		}
	},

}

module.exports = userController
