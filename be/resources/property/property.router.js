const express = require('express')
const propertyRouter = express.Router()
const propertyController = require('./property.controllers')
// const verifyJWTxxx = require("../../middleware/xxx");
const { isTokenValid } = require('../../util/jwt')

propertyRouter.post(
	'/newProperty',
	isTokenValid,
	propertyController.newProperty
)
propertyRouter.post('/viewProperty', propertyController.viewProperty)
propertyRouter.post('/editProperty', propertyController.editProperty)
propertyRouter.post('/getAllProperty', propertyController.getAllProperty)
propertyRouter.get('/getPropertyByUser', propertyController.getPropertyByUser)
propertyRouter.post('/deleteProperty', propertyController.deleteProperty)
propertyRouter.post('/seedProperty', propertyController.seedProperty)
module.exports = propertyRouter
