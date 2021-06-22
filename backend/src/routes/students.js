const express = require("express");
const sendResponse = require("../lib/response");
const Student = require("../models/studentUserSchema");

const router = express.Router(); // "/students" path

// fetch all the students from db
router.get("/", (req, res) => {
	Student.find({})
		.then((data) => {
			console.log(data);
			sendResponse({ response: res, data: data, error: null });
		})
		.catch((error) => {
			console.log(error);
			sendResponse({
				response: res,
				data: null,
				error: `${error} error in finding students in student db`,
			});
		});
});

// fetch student with unique id
router.get("/:student_id", (req, res) => {
	Student.find({ studentId: req.params.student_id })
		.then((data) => {
			console.log(data);
			sendResponse({ response: res, data: data, error: null });
		})
		.catch((error) => {
			console.log(error);
			sendResponse({
				response: res,
				data: null,
				error: `${error} error in finding student with this id`,
			});
		});
});

// post student to db
router.post("/", (req, res) => {
	const newStudent = new Student({
		studentId: req.body.studentId,
		fullName: req.body.fullName,
		emailId: req.body.emailId,
		contactNumber: req.body.contactNumber,
		grade: req.body.grade,
		age: req.body.age,
		stateAddress: req.body.stateAddress,
		districtAddress: req.body.districtAddress,
		schoolName: req.body.schoolName,
	});

	Student.find({ emailId: newStudent.emailId })
		.then((data) => {
			if (!data || !data.length) {
				// save the student in db
				console.log("saving");
				newStudent
					.save()
					.then((saveRes) => {
						console.log("saved");
						sendResponse({ response: saveRes, data: newStudent, error: null });
					})
					.catch((error) => {
						sendResponse({ response: res, data: null, error: error });
					});
			} else {
				throw Error("user email already exist.Try log in using that email!");
			}
		})
		.catch((error) => {
			sendResponse({ response: res, data: null, error: error });
		});
});

module.exports = router;
