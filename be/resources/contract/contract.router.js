const express = require('express')
const contractRouter = express.Router()
const contractController = require('./contract.controllers')
console.log("INSIDE companyRouter")
contractRouter.get('/getAllContracts', contractController.getAllContracts)
contractRouter.post('/createContract', contractController.createContract)
contractRouter.put('/updateContracts', contractController.updateContract)
contractRouter.post('/deleteContracts', contractController.deleteContract)

module.exports = contractRouter