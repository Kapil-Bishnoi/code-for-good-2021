const mongoose = require("mongoose");

const fiveIschema = mongoose.Schema({
	projectId: {
		type: String,
		required: true,
	},
	identify: {
		type: Object,
		required: true,
	},
	investigation: {
		type: Object,
		required: true,
	},
	ideation: {
		type: Object,
		required: true,
	},
	implementation: {
		type: Object,
		required: true,
	},
	inform: {
		type: Object,
		required: true,
	},
	demoURL: {
		type: String,
	},
});

const FiveI = mongoose.model("fiveis", fiveIschema);
module.exports = FiveI;
