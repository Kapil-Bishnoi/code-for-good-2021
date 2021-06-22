const express = require("express");
const sendResponse = require("../lib/response");
const Evaluator = require("../models/evaluatorUserSchema");

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

module.exports = router;
