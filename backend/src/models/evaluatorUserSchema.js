const mongoose = require("mongoose");

const evaluatorUserSchema = mongoose.Schema({        // creating schema for the the evaluator user
    evaluatorId: { 
        type: String,
        required: true 
    },
    fullName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    designation: {
        type: String
    }
})

const Evaluator = mongoose.model("evaluator_users", evaluatorUserSchema);   // collection: evaluator_users

module.exports = Evaluator;