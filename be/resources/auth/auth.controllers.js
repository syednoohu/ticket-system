const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
// const ErrorHandler = require('../../middleware/error')
const { StatusCodes } = require('http-status-codes')

const { attachCookiesToResponse, isTokenValid } = require('../../util/jwt.js')
const userData = require('../../util/seedData')
const User = require('../../models/User')
// const User = require('../../models/user.js')
// const User = require('../../models/user.model')

const userController = {
	async login(req, res, next) {
		const { loginName, password } = req.body
		try {
			if (!loginName || !password) {
				// Option #2 : return next(new ErrorHandler('Please provide email and password',StatusCodes.BAD_REQUEST ))
				res.status(StatusCodes.BAD_REQUEST)	//400
				throw new Error('Please provide email and password')
			}
			let user = await User.findOne({ loginName :req.body.loginName })
			if (!user) {
				res.status(StatusCodes.NOT_FOUND)  //404
				throw new Error('Invalid User')
			}
			const isPasswordCorrect = await user.comparePassword(password)
			if (!isPasswordCorrect) {
				res.status(StatusCodes.UNAUTHORIZED)	//401
				throw new Error('Invalid Password')
			}

			let newRefreshTokenArray = !req.cookies?.refreshToken
				? user.refreshToken
				: user.refreshToken.filter(
					(rt) => rt !== req.cookies.refreshToken
				)
			if (req.cookies?.refreshToken) {
				res.clearCookie('accessToken', {
					httpOnly: true,
					secure: process.env.NODE_ENV === 'production',
				})
				res.clearCookie('refreshToken', {
					httpOnly: true,
					secure: process.env.NODE_ENV === 'production',
				})
				/* 
            1) User logs in but never uses RT and does not logout 
            2) RT is stolen
            3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
        */
				const foundToken = await User.findOne({
					refreshToken: req.cookies?.refreshToken,
				}).exec()
				if (!foundToken) {
					newRefreshTokenArray = [] //attempted refresh token reuse at login! clear out ALL previous refresh tokens
				}
			}
			const [accessTokenJWT, refreshTokenJWT] =
                await attachCookiesToResponse(res, user)
			user.refreshToken = [...newRefreshTokenArray, refreshTokenJWT]
			await user.save()
			res.status(StatusCodes.OK).json({ user, tokenExist : true })

		} catch (err) {
			const error = new Error(err || 'Somethig Went Wrong')
			// res.status( StatusCodes.NOT_FOUND)
			next(error)
		}
	},

	async refresh(req, res, next) {
		if (!req.cookies?.refreshToken)
			return res.sendStatus(StatusCodes.UNAUTHORIZED)
		res.clearCookie('accessToken', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
		})
		res.clearCookie('refreshToken', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
		})

		const foundUser = await User.findOne({
			refreshToken: req.cookies.refreshToken,
		}).exec()
		// 2. Have RT in cookie, but that RT not present in the user collection!
		//    Verify and decode the user._id RT, if RT invalid return 403,
		//      else clear the user.refreshToken array for that user in collection, coz its attempted by wrong user
		if (!foundUser) {
			jwt.verify(
				req.cookies.refreshToken, // case 1. User A's RT is removed from DB and RT maybe either valid/In-Valid
				process.env.REFRESH_TOKEN_SECRET, // In-Valid : response.Forbidden, Valid : A.refreshToken = [], empty the array
				async (err, decoded) => {
					if (err) return res.sendStatus(StatusCodes.FORBIDDEN)
					console.log('attempted refresh token reuse!')
					const hackedUser = await User.findOne({
						_id: decoded._id,
					}).exec()
					hackedUser.refreshToken = []
					const result = await hackedUser.save()
					console.log(result)
				}
			)
			return res.sendStatus(StatusCodes.FORBIDDEN)
		}
		const newRefreshTokenArray = foundUser.refreshToken.filter(
			(rt) => rt !== req.cookies.refreshToken
		)

		// 3. Have RT in cookie, and that RT present in the user collection!
		//    Verify and decode the user._id RT, if RT invalid(expired) return 403,
		//      else clear the user.refreshToken array for that user in collection
		jwt.verify(
			req.cookies.refreshToken, // case 2. User A's RT is in DB and RT eithre valid OR In-Valid
			process.env.REFRESH_TOKEN_SECRET, // In-Valid : Remove that RT from User A's refreshToken Array and force the user to login again,
			async (err, decoded) => {
				// Valid : check if the current user is User A only,
				if (err) {
					//     If so, create new RT, store in DB and send response 200, else response : Forbidden
					foundUser.refreshToken = [...newRefreshTokenArray]
					const result = await foundUser.save()
				}
				console.log('NO ERR  HERE')
				if (err || foundUser.email !== decoded.email)
					return res.sendStatus(StatusCodes.FORBIDDEN)
				const [accessTokenJWT, refreshTokenJWT] =
                    await attachCookiesToResponse(res, foundUser) // Refresh token was still valid
				foundUser.refreshToken = [
					...newRefreshTokenArray,
					refreshTokenJWT,
				]
				const result = await foundUser.save()
				res.status(StatusCodes.OK).json({ result, tokenExist : true })
			}
		)
	},
	async logout(req, res, next) {
		const refreshToken = req.cookies?.refreshToken
		if (!refreshToken) return res.sendStatus(StatusCodes.NO_CONTENT) //No content
		res.clearCookie('accessToken', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
		})
		res.clearCookie('refreshToken', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
		})

		try {
			// Is refreshToken in db?
			const foundUser = await User.findOne({ refreshToken }).exec()
			if (!foundUser) {
				return res.sendStatus(StatusCodes.NO_CONTENT)
			}

			// Delete refreshToken in db
			foundUser.refreshToken = foundUser.refreshToken.filter(
				(rt) => rt !== req.cookies.refreshToken
			)
			const user = await foundUser.save()
			res.status(StatusCodes.OK).json({ user })
		} catch (err) {
			const error = new Error('Cannot find the User')
			res.status(StatusCodes.NOT_FOUND)
			next(error)
		}
	},
	async register(req, res, next) {
    console.log(req.body) 
		const { loginName, password, userFullName,phone, email  } = req.body
		try {
			const duplicate = await User.findOne({ loginName }).lean().exec()
			if (duplicate) {
				res.status(StatusCodes.UNAUTHORIZED)	//401// change the code
				throw new Error('Duplicate user')
			}
			const userObject = {
				loginName,
				password,
				userFullName,
				phone,
				email
			}
			const user = await User.create(userObject)
			if (user) { 
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }

		} catch (err) {

			next(err)
		}

	}
}

module.exports = userController
