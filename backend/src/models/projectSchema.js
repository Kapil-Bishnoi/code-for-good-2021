const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
	projectId: {
		type: String,
		required: true,
	},
	projectDomain: {
		type: String,
		required: true,
	},
	projectName: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	team: {
		type: Array,
	},
    currentStage: {
        type: Number,
    },
	isSubmited: {
		type: Boolean,
		required: true,
	},
	isEvaluated: {
		type: Boolean,
		required: true,
	},
	score: {
		type: Number,
		required: true,
	},
});

const Project = mongoose.model("projects", projectSchema);

module.exports = Project;
