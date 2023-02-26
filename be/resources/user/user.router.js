const express = require('express')
const userRouter = express.Router()
const userController = require('./user.controllers')

userRouter.post('/seedUser', userController.seedUser)
userRouter.get('/getAllUsers', userController.getAllUsers)
userRouter.post('/createUser', userController.createUser)
userRouter.delete('/deleteUserById/:Id', userController.deleteUserById)
userRouter.put('/editUserById/:id', userController.editUserById)
userRouter.post('/getUserById/:id', userController.getUserById)
module.exports = userRouter