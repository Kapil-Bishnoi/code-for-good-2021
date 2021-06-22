const express = require("express");
const sendResponse = require("../lib/response");
const Student = require("../models/studentUserSchema");

const router = express.Router();  // "/students" path

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

module.exports = router;
