const mongoose = require('mongoose')
const { StatusCodes } = require('http-status-codes')

const Shop = require('../../models/Shop');

const shopController = {
	async getAllShops(req, res, next) {
		console.log("INSIDE async getAllShops(req, res, next) {") 
			if (!req.cookies?.refreshToken)
		return res.sendStatus(StatusCodes.UNAUTHORIZED)

		const { page=0, pageSize =10, search=''} = req.query;

		let condSearch = { 
			$match: {
				$or : [ 
					{shopName : { $regex: search, $options: "i",	}},
				]
			} 
		}
		let results = await Shop.aggregate([
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
		let shops = [], total = 0
		console.log("results.length : ",results.length) 
		if (results.length){
			shops = results[0].data
			total = results[0]?.total[0]?.total
		}
		console.log("companys : ", shops.length)
		console.log("total : ", total)
		// return res.status(200).json({ total:0, success: true, products:[] });
		return res.status(200).json({ total:total, success: true, shops:shops });
	},

	async createShop(req, res, next) {
    console.log('INSIDE SHOP CREATE',req.body) 

		const { shopCode, shopName, companyCode, contact, phone, fax, email, address, country  } = req.body
		try {
			const duplicateShopName = await Shop.findOne({ shopName }).lean().exec()
			const duplicateShopCode = await Shop.findOne({ shopCode }).lean().exec()
			if (duplicateShopName || duplicateShopCode) {
				res.status(StatusCodes.UNAUTHORIZED)	//401// change the code
				throw new Error('Duplicate Shop')
			}
			const shopObject = {
				shopCode, shopName, companyCode, contact, phone, fax, email, address, country  
			}
			const shop = await Shop.create(shopObject)
			if (shop) { 
        res.status(201).json({ shop, message: `New shop ${shopName} created` })
    } else {
        res.status(400).json({ message: 'Invalid shop data received' })
    }

		} catch (err) {

			next(err)
		}
	},
	async updateShop(req, res, next) {},
	async deleteShop(req, res, next) {}


}

module.exports = shopController
