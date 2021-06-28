const express = require("express");
const sendResponse = require("../lib/response");
const Mentor = require("../models/mentorUserSchema");
const Project = require("../models/projectSchema");
const getProjectsFromStudentId = require("../lib/studentProjects");

const router = express.Router();

// fetch all the mentors from db
router.get("/", (req, res) => {
	Mentor.find({})
		.then((data) => {
			console.log(data);
			sendResponse({ response: res, data: data, error: null });
		})
		.catch((error) => {
			console.log(error);
			sendResponse({
				response: res,
				data: null,
				error: `${error} error in finding mentors in mentor db`,
			});
		});
});

// fetch mentor with unique id
router.get("/:mentor_id", (req, res) => {
	Mentor.find({ mentorId: req.params.mentor_id })
		.then((data) => {
			console.log(data);
			sendResponse({ response: res, data: data, error: null });
		})
		.catch((error) => {
			console.log(error);
			sendResponse({
				response: res,
				data: null,
				error: `${error} error in finding mentor with this id`,
			});
		});
});

// fetch assigned projs to mentor
router.get("/assignedprojs/:mentor_id", (req, res) => {
	Mentor.find(
		{ mentorId: req.params.mentor_id },
		{ _id: 0, assignedProjects: 1 }
	)
		.then((data) => {
			console.log(data);
			if (data && data.length) {
				const projectIds = data[0].assignedProjects;
				getProjectsFromStudentId(projectIds)
					.then((data) => {
						sendResponse({ response: res, data: data, error: null });
					})
					.catch((err) => {
						sendResponse({ response: res, data: null, error: err });
					});
			}
			else{
				throw "Mentor doesn't exist with this id.";
			}
		})
		.catch((error) => {
			console.log(error);
			sendResponse({
				response: res,
				data: null,
				error: `${error} error in finding mentor with this id`,
			});
		});
});

// post mentor to db
router.post("/", (req, res) => {
	const newMentor = new Mentor({
		mentorId: req.body.mentorId,
		role: req.body.role,
		fullName: req.body.fullName,
		emailId: req.body.emailId,
		contactNumber: req.body.contactNumber,
		stateAddress: req.body.stateAddress,
		districtAddress: req.body.districtAddress,
		designation: req.body.designation,
		assignedProjects: [],
		profileURL: "",
	});

	Mentor.find({ emailId: newMentor.emailId })
		.then((data) => {
			if (!data || !data.length) {
				// save the mentor in db
				newMentor
					.save()
					.then((saveRes) => {
						sendResponse({ response: res, data: newMentor, error: null });
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

// select a project for mentoring
router.post("/selectproject/:mentor_id/:project_id", (req, res) => {
	const newProj = {
		projectId: req.params.project_id,
	};
	Mentor.updateOne(
		{ mentorId: req.params.mentor_id },
		{ $addToSet: { assignedProjects: newProj } }
	)
		.then((mentorUpdate) => {
			const newMentor = {
				mentorId: req.params.mentor_id,
			};
			Project.updateOne(
				{ projectId: req.params.project_id },
				{ $addToSet: { mentors: newMentor } }
			)
				.then((projectUpdate) => {
					sendResponse({
						response: res,
						data: { mentorUpdate, projectUpdate },
						error: null,
					});
				})
				.catch((err) => {
					sendResponse({ response: res, data: null, error: err });
				});
		})
		.catch((err) => {
			sendResponse({ response: res, data: null, error: err });
		});
});

// leave the project from mentoring
router.post("/leaveproject/:mentor_id/:project_id", (req, res) => {
	const deletedProj = {
		projectId: req.params.project_id,
	};
	Mentor.updateOne(
		{ mentorId: req.params.mentor_id },
		{ $pull: { assignedProjects: deletedProj } }
	)
		.then((mentorUpdate) => {
			const leaveMentor = {
				mentorId: req.params.mentor_id,
			};
			Project.updateOne(
				{ projectId: req.params.project_id },
				{ $pull: { mentors: leaveMentor } }
			)
				.then((projectUpdate) => {
					sendResponse({
						response: res,
						data: { mentorUpdate, projectUpdate },
						error: null,
					});
				})
				.catch((err) => {
					sendResponse({ response: res, data: null, error: err });
				});
		})
		.catch((err) => {
			sendResponse({ response: res, data: null, error: err });
		});
});

module.exports = router;
