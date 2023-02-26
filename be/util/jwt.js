const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')

const createJWT = (user, type) => {
	return new Promise((resolve, reject) => {
		const payload = { email: user.email, id: user._id }
		const secret =
            type === 'at'
            	? process.env.ACCESS_TOKEN_SECRET
            	: process.env.REFRESH_TOKEN_SECRET
		const options =
            type === 'at' ? { expiresIn: '1m' } : { expiresIn: '1d' }
		jwt.sign(payload, secret, options, (err, token) => {
			if (err) {
				console.log(err.message)
				reject(createError.InternalServerError())
				return
			}
			resolve(token)
			return
		})
	})
}

// This is middleware should gto middlware folders
const isTokenValid = (req, res, next) => {
	if (!req.cookies?.accessToken)
		return res.sendStatus(StatusCodes.UNAUTHORIZED)
	jwt.verify(
		req.cookies.accessToken,
		process.env.ACCESS_TOKEN_SECRET,
		async (err, decoded) => {
			if (err) {
				res.status(StatusCodes.UNAUTHORIZED)
				return next(new Error('Token Expired'))
			}
			console.log('DECODED >>', decoded)
			req.userInfo = decoded
			next()
			// Should we lookup again in User DB for thisUser for more Info?
			//const user = await User.findOne({ _id: decoded._id }).exec();
		}
	)
}

const attachCookiesToResponse = async (res, user) => {
	const accessTokenJWT = await createJWT(user, 'at')
	const refreshTokenJWT = await createJWT(user, 'rt')
	const AT15sec = 1000 * 60 * 60
	// const AT15sec = 1000 * 60;
	const RT1Day = 1000 * 60 * 60 * 24

	res.cookie('accessToken', accessTokenJWT, {
		//sameSite:none, path:'/'
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		expires: new Date(Date.now() + AT15sec),
	})
	res.cookie('refreshToken', refreshTokenJWT, {
		//sameSite:none
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		expires: new Date(Date.now() + RT1Day),
	})
	console.log('#46', { accessTokenJWT, refreshTokenJWT })
	return [accessTokenJWT, refreshTokenJWT]
}

module.exports = {
	createJWT,
	isTokenValid,
	attachCookiesToResponse,
}
