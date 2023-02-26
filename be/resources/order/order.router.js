const express = require('express')
const orderRouter = express.Router()
const orderController = require('./order.controllers')

orderRouter.post('/getOrders', orderController.getOrders)
// orderRouter.post('/newOrder', orderController.newOrder)
// orderRouter.post('/updateOrder', orderController.updateOrder)
// orderRouter.post('/deleteOrder', orderController.deleteOrder)
// orderRouter.put('/changePaymentStatus', orderController.changePaymentStatus)
// orderRouter.put('/changeShippingStatus', orderController.changeShippingStatus)
// orderRouter.post('/lastPriceAndFreeBox', orderController.lastPriceAndFreeBox)
// orderRouter.put('/applyOrderDiscount', orderController.applyOrderDiscount)
// orderRouter.put('/conformOrder', orderController.confirmOrder)

module.exports = orderRouter