const mongoose = require("mongoose");

const studentUserSchema = mongoose.Schema({        // creating schema for the the student user
    studentId: { 
        type: String,
        required: true 
    },
    role: {
        type: String,
        required: true
    },
    projects: {
        type: Array,
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
        type: String
    },
    grade: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    stateAddress: {
        type: String,
        required: true
    },
    districtAddress: {
        type: String,
        required: true
    },
    schoolName: {
        type: String,
        required: true
    },
    profileURL: {
        type: String
    }
})

const Student = mongoose.model("student_users", studentUserSchema);   // collection: student_users

module.exports = Student;