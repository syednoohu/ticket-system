const express = require('express')
const shopRouter = express.Router()
const shopController = require('./shop.controllers')
console.log("INSIDE shopRouter")
shopRouter.get('/getAllShops', shopController.getAllShops)
shopRouter.post('/createShop', shopController.createShop)
shopRouter.put('/updateShop', shopController.updateShop)
shopRouter.post('/deleteShop', shopController.deleteShop)

module.exports = shopRouter