const express = require("express");
const sendResponse = require("../lib/response");
const Evaluator = require("../models/evaluatorUserSchema");
const getProjectsFromStudentId = require("../lib/studentProjects");

const router = express.Router();

router.get("/", (req, res) => {
	Evaluator.find({})
		.then((data) => {
			console.log(data);
			sendResponse({ response: res, data: data, error: null });
		})
		.catch((error) => {
			console.log(error);
			sendResponse({
				response: res,
				data: null,
				error: `${error} error in finding evaluator in evaluator db`,
			});
		});
});

// fetch evaluator with unique id
router.get("/:evaluator_id", (req, res) => {
	Evaluator.find({ evaluatorId: req.params.evaluator_id })
		.then((data) => {
			console.log(data);
			sendResponse({ response: res, data: data, error: null });
		})
		.catch((error) => {
			console.log(error);
			sendResponse({
				response: res,
				data: null,
				error: `${error} error in finding evaluator with this id`,
			});
		});
});

// fetch assigned projs to evaluators
router.get("/assignedprojs/:evaluator_id", (req, res) => {
	Evaluator.find(
		{ evaluatorId: req.params.evaluator_id },
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
			} else {
				throw "Evaluator doesn't exist with this id.";
			}
		})
		.catch((error) => {
			console.log(error);
			sendResponse({
				response: res,
				data: null,
				error: `${error} error in finding Evaluator with this id`,
			});
		});
});

// post evaluator to db
router.post("/", (req, res) => {
	const newEvaluator = new Evaluator({
		evaluatorId: req.body.evaluatorId,
		role: req.body.role,
		fullName: req.body.fullName,
		emailId: req.body.emailId,
		contactNumber: req.body.contactNumber,
		designation: req.body.designation,
		assignedProjects: [],
		profileURL: "",
	});

	Evaluator.find({ emailId: newEvaluator.emailId })
		.then((data) => {
			if (!data || !data.length) {
				// save the evaluator in db
				newEvaluator
					.save()
					.then((saveRes) => {
						sendResponse({ response: res, data: newEvaluator, error: null });
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

// select a project for evaluation
router.post("/selectproject/:evaluator_id/:project_id", (req, res) => {
	const newProj = {
		projectId: req.params.project_id,
	};
	Evaluator.updateOne(
		{ evaluatorId: req.params.evaluator_id },
		{ $addToSet: { assignedProjects: newProj } }
	)
		.then((evalUpdate) => {
			sendResponse({
				response: res,
				data: evalUpdate,
				error: null,
			});
		})
		.catch((err) => {
			sendResponse({ response: res, data: null, error: err });
		});
});

// leave the project from evaluating
router.post("/leaveproject/:evaluator_id/:project_id", (req, res) => {
	const deletedProj = {
		projectId: req.params.project_id,
	};
	Evaluator.updateOne(
		{ evaluatorId: req.params.evaluator_id },
		{ $pull: { assignedProjects: deletedProj } }
	)
		.then((evalUpdate) => {
			sendResponse({
				response: res,
				data: evalUpdate,
				error: null,
			});
		})
		.catch((err) => {
			sendResponse({ response: res, data: null, error: err });
		});
});

module.exports = router;
