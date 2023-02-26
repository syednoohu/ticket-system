// @25:40 https://www.youtube.com/watch?v=JR9BeI7FY3M&list=PL0Zuz27SZ-6P4dQUsoDatjEGpmBpcOW8V&index=2
//!origin for POSTMAN like clients
// Can retrieve from backend databases
const allowedOrigins = [
	'https://www.yoursite.com',
	'http://127.0.0.1:5500',
	'http://localhost:3500',
	'http://localhost:3000',
]

const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.indexOf(origin) !== 1 || !origin) {
			callback(null, true)
		} else {
			callback(new Error(' Not Allowed by CORS '))
		}
	},
	credentials: true, //beware of spelling ?? credential or credentialS
	optionsSuccessStatus: 200,
}

module.exports = corsOptions
