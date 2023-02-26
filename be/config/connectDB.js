const mongoose = require('mongoose')

const connectDB = () => {
	try {
		// process.env.MONGODB_URL || process.env.MONGODB_LOCAL_URL,
		mongoose.connect(
			/*eslint no-process-env: 0 */
			process.env.MONGODB_CLOUD_URL || process.env.MONGODB_LOCAL_URL,
			{
				useUnifiedTopology: true,
				useNewUrlParser: true,
			}
		)

		// mongoose.connection.on("disconnected", () => {
		//   console.log("Disconnected on Disconnected");
		// });
		// mongoose.connection.on("error", () => {
		//   console.log("Error on Connection");
		//   process.exit(1);
		// });
		// process.on("SIGINT", async () => {
		//   await mongoose.connection.close();
		//   process.exit(0);
		// });
		console.log('DB connected')
	} catch (err) {
		console.error(err)
	}
}

module.exports = connectDB
