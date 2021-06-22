const mongoose = require("mongoose");

module.exports = () => {
	mongoose
		.connect(process.env.MONGODB_URI, {
			dbName: process.env.DB_NAME,
			user: process.env.DB_USER,
			pass: process.env.DB_PASSWORD,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		})
		.then(() => {
			console.log("Mongoose connected to cfg2021 database!");
		})
		.catch((err) => console.log(err.message));

	mongoose.connection.on("connected", () => {
		console.log("Mongoose connected to cfg2021 database!");
	});

	mongoose.connection.on("error", (err) => {
		console.log(err.message);
	});

	mongoose.connection.on("disconnected", () => {
		console.log("Mongoose connection is disconnected!");
	});

	process.on("SIGINT", () => {
		mongoose.connection.close(() => {
			console.log(
				"Mongoose connection is disconnected due to app termination!"
			);
			process.exit(0);
		});
	});
};
