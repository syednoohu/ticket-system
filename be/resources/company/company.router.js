const express = require('express')
const companyRouter = express.Router()
const companyController = require('./company.controllers')
console.log("INSIDE companyRouter")
companyRouter.get('/getAllCompanys', companyController.getAllCompanys)
companyRouter.get('/getAllCompanysNameWithCode', companyController.getAllCompanysNameWithCode)
companyRouter.get('/getAllshopsByCompany', companyController.getAllshopsByCompany)
companyRouter.post('/createCompany', companyController.createCompany)
companyRouter.put('/updateCompany', companyController.updateCompany)
companyRouter.post('/deleteCompany', companyController.deleteCompany)

module.exports = companyRouter