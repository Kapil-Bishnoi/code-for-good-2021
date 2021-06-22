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

// post mentor to db
router.post("/", (req, res) => {
	const newMentor = new Mentor({
		mentorId: req.body.mentorId,
		fullName: req.body.fullName,
		emailId: req.body.emailId,
		contactNumber: req.body.contactNumber,
		stateAddress: req.body.stateAddress,
		districtAddress: req.body.districtAddress,
		designation: req.body.designation,
	});

	Mentor.find({ emailId: newMentor.emailId })
		.then((data) => {
			if (!data || !data.length) {
				// save the mentor in db
				newMentor
					.save()
					.then((saveRes) => {
						sendResponse({ response: saveRes, data: newMentor, error: null });
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
