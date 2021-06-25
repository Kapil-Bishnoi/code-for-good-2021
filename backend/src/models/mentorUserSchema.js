const mongoose = require("mongoose");

const mentorUserSchema = mongoose.Schema({
	// creating schema for the the mentor user
	mentorId: {
		type: String,
		required: true,
	},
	role: {
        type: String,
        required: true
    },
	fullName: {
		type: String,
		required: true,
	},
	emailId: {
		type: String,
		required: true,
	},
	contactNumber: {
		type: String,
		required: true,
	},
	stateAddress: {
		type: String,
		required: true,
	},
	districtAddress: {
		type: String,
		required: true,
	},
	designation: {
		type: String,
	},
	assignedProjects: {
		type: Array,
	},
});

const Mentor = mongoose.model("mentor_users", mentorUserSchema); // collection: mentor_users

module.exports = Mentor;
