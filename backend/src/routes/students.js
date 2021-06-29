const express = require("express");
const sendResponse = require("../lib/response");
const Student = require("../models/studentUserSchema");
const getProjectsFromStudentId = require("../lib/studentProjects");

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

// fetch all projects under a student
router.get("/projects/:student_id", (req, res) => {
	Student.find({ studentId: req.params.student_id }, { _id: 0, projects: 1 })
		.then((data) => {
			// console.log(data);
			if (data) {
				const dataObj = data[0];
				const projectIds = dataObj ? dataObj.projects : []; // array of objects with projectIds
				getProjectsFromStudentId(projectIds)
					.then((projects) => {
						sendResponse({ response: res, data: projects, error: null });
					})
					.catch((err) => {
						sendResponse({
							response: res,
							data: null,
							error: { message: err.message },
						});
					});
			}
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
		role: req.body.role,
		fullName: req.body.fullName,
		emailId: req.body.emailId,
		contactNumber: req.body.contactNumber,
		grade: req.body.grade,
		age: req.body.age,
		stateAddress: req.body.stateAddress,
		districtAddress: req.body.districtAddress,
		schoolName: req.body.schoolName,
		projects: [],
		profileURL: "",
	});

	Student.find({ emailId: newStudent.emailId })
		.then((data) => {
			if (!data || !data.length) {
				// save the student in db
				newStudent
					.save()
					.then((saveRes) => {
						sendResponse({ response: res, data: newStudent, error: null });
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
