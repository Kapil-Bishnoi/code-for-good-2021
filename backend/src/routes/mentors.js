const express = require("express");
const sendResponse = require("../lib/response");
const Mentor = require("../models/mentorUserSchema");

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

module.exports = router;
