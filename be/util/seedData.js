const bcrypt = require('bcryptjs')

const data = {
	users: [
		{
			displayName: 'Basir Ahmed',
			userName: 'Basir',
			email: 'admin@example.com',
			password: bcrypt.hashSync('1234', 8),
			address: {
				address1: 'Cheung Sha Wan Street',
				address2: 'Kowloon',
				city: 'Lai Chi Kok',
				postalCode: '852',
				country: 'Hong Kong',
				lat: 22.33,
				lng: 114.13,
			},
		},
	],
}
module.exports = data
