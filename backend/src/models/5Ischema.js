const mongoose = require("mongoose");

const fiveIschema = mongoose.Schema({
	projectId: {
		type: String,
		required: true,
	},
	questions: {
		type: Array,
		required: true,
	},
	demoURL: {
		type: String,
	},
});

const FiveI = mongoose.model("fiveis", fiveIschema);
module.exports = FiveI;
