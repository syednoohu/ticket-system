// const mongoose = require('mongoose')
const { StatusCodes } = require('http-status-codes')

const Company = require('../../models/Company');

const companyController = {
	async getAllCompanys(req, res, next) {
		// console.log("INSIDE async getAllCompanys(req, res, next) {") 
			if (!req.cookies?.refreshToken)
		return res.sendStatus(StatusCodes.UNAUTHORIZED)

		const { page=0, pageSize =10, search=''} = req.query;

		let condSearch = { 
			$match: {
				$or : [ 
					{companyName : { $regex: search, $options: "i",	}},
					{phone : { $regex: search, $options: "i",	}},
				]
			} 
		}
		let results = await Company.aggregate([
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
		let companys = [], total = 0
		// console.log("results.length : ",results.length) 
		if (results.length){
			companys = results[0].data
			total = results[0]?.total[0]?.total
		}
		// console.log("companys : ", companys.length)
		// console.log("total : ", total)
		// return res.status(200).json({ total:0, success: true, products:[] });
		return res.status(200).json({ total:total, success: true, companys:companys });
	},

	
	async getAllshopsByCompany(req, res, next) {
		console.log("INSIDE async getAllshopsByCompany(req, res, next) {") 
		console.log("req.query.selectedCompany : ", req.query.selectedCompany)

			if (!req.cookies?.refreshToken)
		return res.sendStatus(StatusCodes.UNAUTHORIZED)
		let results = await Company.aggregate([
		{
			$lookup:
				{
					from: "shops",
					localField: "companyCode",
					foreignField: "companyCode",
					as: "shops",
				}
			},
			{
				$match : {
					companyCode: req.query.selectedCompany
				}
			},
			{
				$unwind : {
					path: "$shops"
				}
				
			},
			{
				$project: {
					shopCode : "$shops.shopCode",
					shopName : "$shops.shopName"
				}
			}
		]);
		return res.status(200).json(results);
	},

	async getAllCompanysNameWithCode(req, res, next) {
		// console.log("INSIDE async getAllCompanysNameWithCode(req, res, next)") 
			if (!req.cookies?.refreshToken) return res.sendStatus(StatusCodes.UNAUTHORIZED)
		let company = await Company.find().select('_id companyName companyCode').exec();
		// console.log(company)
		// return res.status(200).json({ total:0, success: true, products:[] });
		return res.status(200).json(company);
	},
	

	async createCompany(req, res, next) {
    // console.log(req.body) 
    // console.log("async createCompany(req, res, next) {") 
		

		const { companyName, companyCode, phone, contact, fax, email, website,  address, country  } = req.body
		try {
			const duplicateCompanyName = await Company.findOne({ companyName }).lean().exec()
			const duplicateCompanyCode = await Company.findOne({ companyCode }).lean().exec()
			if (duplicateCompanyName || duplicateCompanyCode) {
				res.status(StatusCodes.UNAUTHORIZED)	//401// change the code
				throw new Error('Duplicate company')
			}
			const companyObject = {
				companyName, companyCode, phone, contact, fax, email, website,  address, country 
			}
			const company = await Company.create(companyObject)
			if (company) { 
        res.status(201).json({ company, message: `New company ${companyName} created` })
    } else {
        res.status(400).json({ message: 'Invalid company data received' })
    }

		} catch (err) {

			next(err)
		}

	},
	async updateCompany(req, res, next) {},
	async deleteCompany(req, res, next) {}


}

module.exports = companyController
