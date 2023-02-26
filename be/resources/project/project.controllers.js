const mongoose = require('mongoose')
const { StatusCodes } = require('http-status-codes')
const moment = require("moment");

const Project = require('../../models/Project');

const projectController = {
	async getAllProjects(req, res, next) {
		console.log("INSIDE async getAllProjects(req, res, next) {") 
			if (!req.cookies?.refreshToken)
		return res.sendStatus(StatusCodes.UNAUTHORIZED)

		const { page=0, pageSize =10, search=''} = req.query;

		let condSearch = { 
			$match: {
				$or : [ 
					{projectCode : { $regex: search, $options: "i",	}},
				]
			} 
		}
		let results = await Project.aggregate([
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
		let projects = [], total = 0
		console.log("34 results JSON : ",JSON.stringify(results)) 
		console.log("35 results : ",results) 
		console.log("36 results.length : ",results.length) 
		if (results.length){
			projects = results[0].data
			total = results[0]?.total[0]?.total
		}
		console.log("projects : ", projects.length)
		console.log("total : ", total)
		// return res.status(200).json({ total:0, success: true, products:[] });
		return res.status(200).json({ total:total, success: true, projects:projects });
	},

	async createProject(req, res, next) {
    console.log(req.body) 
    // console.log("async createCompany(req, res, next) {") 
		

		const { projectCode, companyCode, location, serialNos } = req.body
		const { serviceFrom } = req.body
		const { serviceTo } = req.body

		try {
			const duplicateProjectCode = await Project.findOne({ projectCode }).lean().exec()
			if (duplicateProjectCode ) {
				res.status(StatusCodes.UNAUTHORIZED)	//401// change the code
				throw new Error('Duplicate project Code')
			}
			const projectObject = {
				projectCode, projectCode, serviceFrom, serviceTo, location, serialNos
			}
			// const contract = await Contract.create(contractObject)
			console.log("#66", projectCode, projectCode, serviceFrom, serviceTo, location, serialNos)
			const project = await Project.create({
				projectCode, companyCode, location, serialNos,
				serviceFrom : moment.utc(serviceFrom),
				serviceTo : moment.utc(serviceTo)
			})
			if (project) { 
        res.status(201).json({ project, message: `New project ${projectCode} created` })
    	} else {
        res.status(400).json({ message: 'Invalid project data received' })
    	}

		} catch (err) {

			next(err)
		}

	},


	async updateProject(req, res, next) {},
	async deleteProject(req, res, next) {}
}

module.exports = projectController
