const express = require('express')
const projectRouter = express.Router()
const projectController = require('./project.controllers')
console.log("INSIDE projectRouter")
projectRouter.get('/getAllProjects', projectController.getAllProjects)
projectRouter.post('/createProject', projectController.createProject)
projectRouter.put('/updateProject', projectController.updateProject)
projectRouter.post('/deleteProject', projectController.deleteProject)

module.exports = projectRouter