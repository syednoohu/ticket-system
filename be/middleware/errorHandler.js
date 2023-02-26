//https://www.youtube.com/watch?v=rltfdjcXjmk&list=PLnHJACx3NwAdl4yeJF6LzjDiLyW1yF9Ds&index=3 @06:14
// for best Custome error handling
const { logEvents } = require('./logEvents')

const errorHandler = (err, req, res, next) => {
	logEvents(`${err.name}: ${err.message}`, 'errLog.txt')
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode
	res.status(statusCode).json({
		message: err.message,
		mode :process.env.NODE_ENV === 'development' ? 'development' : 'production',
		stack: process.env.NODE_ENV === 'development' ? err.stack : null,
		from: ' Custom ErrorHandler - errorHandler.js',
	})
}

const notFound = (req, res, next) => {
	console.log('ERR - req, res, next')
	const error = new Error(` Not Found ${req.originalUrl}`)
	res.status(404)
	next(error)
}

module.exports = { notFound, errorHandler }
