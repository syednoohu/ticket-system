const express = require('express')
const authRouter = express.Router()
const authController = require('./auth.controllers')
console.log("inside controller")
authRouter.post('/login', authController.login)
authRouter.post('/register', authController.register)
authRouter.post('/refresh', authController.refresh)
authRouter.post('/logout', authController.logout)

module.exports = authRouter