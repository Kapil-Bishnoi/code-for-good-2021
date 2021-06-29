const express = require("express");
const sendResponse = require("../lib/response");
const Evaluator = require("../models/evaluatorUserSchema");
const Mentor = require("../models/mentorUserSchema");
const Student = require("../models/studentUserSchema");

const router = express.Router();

router.post("/update/:role/:id/:imageURL", (req, res) => {
	if (req.params.role === "student") {
		Student.updateOne(
			{ studentId: req.params.id },
			{ profileURL: res.params.imageURL }
		)
			.then((updateRes) => {
				sendResponse({
					response: res,
					data: { message: "profile successfully updated", data: updateRes },
					error: null,
				});
			})
			.catch((err) => {
				sendResponse({ response: res, data: null, error: err });
			});
	} else if (req.params.role === "mentor") {
		Mentor.updateOne(
			{ mentorId: req.params.id },
			{ profileURL: res.body.imageURL }
		)
			.then((updateRes) => {
				sendResponse({
					response: res,
					data: { message: "profile successfully updated", data: updateRes },
					error: null,
				});
			})
			.catch((err) => {
				sendResponse({ response: res, data: null, error: err });
			});
	} else {
		Evaluator.updateOne(
			{ evaluatorId: req.params.id },
			{ profileURL: res.body.imageURL }
		)
			.then((updateRes) => {
				sendResponse({
					response: res,
					data: { message: "profile successfully updated", data: updateRes },
					error: null,
				});
			})
			.catch((err) => {
				sendResponse({ response: res, data: null, error: err });
			});
	}
});

module.exports = router;
