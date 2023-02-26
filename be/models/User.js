const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs')

const UserSchema = new mongoose.Schema(
  {
    loginName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userFullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: String,
    role: {
      type: String,
      enum: [ "Admin", "Service Engineer", "Engineer"],
      required: true,
      default:"Engineer"
    },
    address: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    refreshToken: [String],
  },
  { timestamps: true }
);

UserSchema.pre('save', async function () {
	let user = this
	if (!user.isModified('password')) return
	user.password = await bcryptjs.hash(
		user.password,
		await bcryptjs.genSalt(10)
	)
	return
})

UserSchema.pre('insertMany', async function (next, docs) {
	if (Array.isArray(docs) && docs.length) {
		const hashedUsers = docs.map(async (user) => {
			return await new Promise((resolve, reject) => {
				bcryptjs
					.genSalt(10)
					.then((salt) => {
						let password = user.password.toString()
						bcryptjs
							.hash(password, salt)
							.then((hash) => {
								user.password = hash
								resolve(user)
							})
							.catch((e) => {
								reject(e)
							})
					})
					.catch((e) => {
						reject(e)
					})
			})
		})
		docs = await Promise.all(hashedUsers)
		next()
	} else {
		return next(new Error('User list should not be empty')) // lookup early return pattern
	}
})

UserSchema.methods.comparePassword = async function (canditatePassword) {
	const isMatch = bcryptjs.compare(canditatePassword, this.password)
	return isMatch
}

UserSchema.index({ loginName: "text" });

module.exports = mongoose.model("Users", UserSchema);
