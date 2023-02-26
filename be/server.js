const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

// const swaggerJSdoc = require('swagger-jsdoc')
const swaggerUIexpress = require('swagger-ui-express')

const credentials = require('./middleware/credentials')

const authRouter = require('./resources/auth/auth.router.js')
const companyRouter = require('./resources/company/company.router.js')
const contractRouter = require('./resources/contract/contract.router.js')
const projectRouter = require('./resources/project/project.router.js')
const shopRouter = require('./resources/shop/shop.router.js')
const orderRouter = require('./resources/order/order.router.js') 
const userRouter = require('./resources/user/user.router.js') 

const corsOptions = require('./config/corsOptions')
const { logger } = require('./middleware/logEvents')
const { notFound, errorHandler } = require('./middleware/errorHandler')
const connectDB = require('./config/connectDB')

// As YAML
const YAML = require('yamljs');
const swaggerOptionsyaml = YAML.load('./swagger.yaml');

// As JSON
// const swaggerFile = require('./swagger.json')
// const swaggerOptionsJSON = swaggerFile

class Server {
	constructor() {
		this.app = express()
		this.app.use(logger)
		this.app.use(credentials) // Handle options credentials check - before CORS! and fetch cookies credentials requirement
		this.app.use(cors(corsOptions)) // Cross Origin Resource Sharing

		this.app.use(express.json())
		this.app.use(express.urlencoded({ extended: true }))
		this.app.use(cookieParser())
		dotenv.config()

		// this.app.use('/api-json', swaggerUIexpress.serve, swaggerUIexpress.setup(swaggerOptionsJSON))
		this.app.use('/api-yaml', swaggerUIexpress.serve, swaggerUIexpress.setup(swaggerOptionsyaml))
		this.app.use('/api/v1/auth', authRouter)
		this.app.use('/api/v1/order', orderRouter)
		this.app.use('/api/v1/company', companyRouter)
		this.app.use('/api/v1/contract', contractRouter)
		this.app.use('/api/v1/project', projectRouter)
		this.app.use('/api/v1/shop', shopRouter)
		this.app.use('/api/v1/user', userRouter)

		this.app.use(notFound)
		this.app.use(errorHandler)
		this.start()
	}
	start = () => {
		try {
			const PORT = process.env.PORT || 3500
			connectDB()
			mongoose.connection.on('connected', () => {
				console.log('Connected on Connected')
				this.app.listen(PORT, () =>
					console.log(`Server is listening on port ${PORT}...!!!!`)
				)
			})
		} catch (error) {
			console.log(error)
		}
	}
}

new Server()
// const server = new Server()
// server();
