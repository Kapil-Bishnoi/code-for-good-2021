const express = require("express");
const sendResponse = require("../lib/response");
const Student = require("../models/studentUserSchema");
const Mentor = require("../models/mentorUserSchema");
const Evaluator = require("../models/evaluatorUserSchema");

const router = express.Router();

router.get("/:role_type/:email_id", (req, res) => {
	if (req.params.role_type === "student") {
		Student.find({ emailId: req.params.email_id })
			.then((data) => {
				if (!data || !data.length) {
					throw "You are not registered as Student";
				}
				sendResponse({ response: res, data: data, error: null });
			})
			.catch((err) => {
				sendResponse({ response: res, data: null, error: err });
			});
	} else if (req.params.role_type === "mentor") {
		Mentor.find({ emailId: req.params.email_id })
			.then((data) => {
				if (!data || !data.length) {
					throw "You are not registered as Student";
				}
				sendResponse({ response: res, data: data, error: null });
			})
			.catch((err) => {
				sendResponse({ response: res, data: null, error: err });
			});
	} else if (req.params.role_type === "evaluator") {
		Evaluator.find({ emailId: req.params.email_id })
			.then((data) => {
				if (!data || !data.length) {
					throw "You are not registered as Student";
				}
				sendResponse({ response: res, data: data, error: null });
			})
			.catch((err) => {
				sendResponse({ response: res, data: null, error: err });
			});
	}
});

module.exports = router;