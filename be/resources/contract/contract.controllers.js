const mongoose = require('mongoose')
const { StatusCodes } = require('http-status-codes')
const moment = require("moment");

const Contract = require('../../models/Contract');

const contractController = {
	async getAllContracts(req, res, next) {
		console.log("INSIDE async getAllContracts(req, res, next) {") 
			if (!req.cookies?.refreshToken)
		return res.sendStatus(StatusCodes.UNAUTHORIZED)

		const { page=0, pageSize =10, search=''} = req.query;

		let condSearch = { 
			$match: {
				$or : [ 
					{contractName : { $regex: search, $options: "i",	}},
				]
			} 
		}
		let results = await Contract.aggregate([
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
		let contracts = [], total = 0
		console.log("results.length : ",results.length) 
		if (results.length){
			contracts = results[0].data
			total = results[0]?.total[0]?.total
		}
		console.log("contracts : ", contracts.length)
		console.log("total : ", total)
		// return res.status(200).json({ total:0, success: true, products:[] });
		return res.status(200).json({ total:total, success: true, contracts:contracts });
	},

	async createContract(req, res, next) {
    // console.log(req.body) 
    // console.log("async createCompany(req, res, next) {") 
		

		const { contractName, contractCode, location, serialNos } = req.body
		const { contractFrom } = req.body
		const { contractTo } = req.body

		try {
			const duplicateContractName = await Contract.findOne({ contractName }).lean().exec()
			const duplicateContractCode = await Contract.findOne({ contractCode }).lean().exec()
			if (duplicateContractName || duplicateContractCode) {
				res.status(StatusCodes.UNAUTHORIZED)	//401// change the code
				throw new Error('Duplicate Contract')
			}
			const contractObject = {
				contractName, contractCode, contractFrom, contractTo, location, serialNos
			}
			// const contract = await Contract.create(contractObject)
			console.log("#66", contractName, contractCode, contractFrom, contractTo, location, serialNos)
			const contract = await Contract.create(
				{
					contractName, contractCode, location, serialNos,
					contractFrom : moment.utc(contractFrom),
					contractTo : moment.utc(contractTo)
					// contractFrom ,contractTo
					// contractFrom : moment.utc(req.body.contractFrom),
					// contractTo : moment.utc(req.body.contractTo)
					// contractFrom : moment(req.body.contractFrom).format("DD-MM-YYYYTHH:mm:ss"),
					// contractTo : moment(req.body.contractTo).format("DD-MM-YYYYTHH:mm:ss")
				}
			)
			if (contract) { 
        res.status(201).json({ contract, message: `New contract ${contractName} created` })
    } else {
        res.status(400).json({ message: 'Invalid contract data received' })
    }

		} catch (err) {

			next(err)
		}

	},


	async createContractXXX(req, res, next) {
    console.log(req.body) 
    console.log("async createCompany(req, res, next) {") 
		

		const { contractName, contractCode, location, serialNos } = req.body
		const { contractFrom } = req.body.contractFrom
		const { contractTo } = req.body.contractTo
		// const { contractFrom } = new ISODate(req.body.contractFrom)
		// const { contractTo } = new ISODate(req.body.contractTo)
		console.log("55 req.body.contractFrom: ",req.body.contractFrom)
		console.log("56 req.body.contractTo : ",req.body.contractTo)
		try {
			const duplicateContractName = await Contract.findOne({ contractName }).lean().exec()
			const duplicateContractCode = await Contract.findOne({ contractCode }).lean().exec()
			if (duplicateContractName || duplicateContractCode) {
				res.status(StatusCodes.UNAUTHORIZED)	//401// change the code
				throw new Error('Duplicate Contract')
			}


			const contractObject = {
				contractName, contractCode, contractFrom, contractTo, location, serialNos
			}
			// const contract = await Contract.create(contractObject)
			const contract = await Contract.create(
				{
					contractName, contractCode, location, serialNos,
					contractFrom : moment(req.body.contractFrom),
					contractTo : moment.utc(req.body.contractTo)
					// contractFrom : moment(req.body.contractFrom).format("DD-MM-YYYYTHH:mm:ss"),
					// contractTo : moment(req.body.contractTo).format("DD-MM-YYYYTHH:mm:ss")
				}
			)
			if (contract) { 
        res.status(201).json({ contract, message: `New contract ${contractName} created` })
    } else {
        res.status(400).json({ message: 'Invalid contract data received' })
    }

		} catch (err) {

			next(err)
		}

	},
	async updateContract(req, res, next) {},
	async deleteContract(req, res, next) {}
}

module.exports = contractController
