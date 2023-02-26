const mongoose = require('mongoose')
const { StatusCodes } = require('http-status-codes')

const User = require('../../models/Order');
const Order = require('../../models/Order');

const userController = {
	async getOrders(req, res, next) {
		if (!req.cookies?.refreshToken)
		return res.sendStatus(StatusCodes.UNAUTHORIZED)

  const { page=0, pageSize =10, search='XS-2022-12-01'} = req.query;
	console.log(search)
	const products = await Order.find({
		$or: [
			
			{ clientName: { $regex: new RegExp(search, "i") } },
			{ clientId: { $regex: new RegExp(search, "i") } },
			{ orderId: { $regex: new RegExp(search, "i") } },
		],
	})
	.skip(page * pageSize)
	.limit(pageSize);
console.log("products",products.length)
	const total = await Order.countDocuments({
		$or: [
			{ clientName: { $regex: new RegExp(search, "i") } },
			{ clientId: { $regex: new RegExp(search, "i") } },
			{ orderId: { $regex: new RegExp(search, "i") } },
		],
	});

	// return res.status(200).json( products );
	return res.status(200).json({ total, success: true, products });
	},

	async getOrdersXXX(req, res, next) {
		let orderFound = await Order.find({isActive: true });
		// return res.status(200).json({ orderFound });
		products = orderFound.slice(1,50) 
		// return res.status(200).json({ total:orderFound.countDocuments(), success: true, products });
		const total = await Order.countDocuments({isActive: true })
		console.log(total)
		return res.status(200).json({ total, success: true, products });

	},



}

module.exports = userController
