const express = require("express");
const sendResponse = require("../lib/response");
const FiveI = require("../models/5Ischema");
const {
	i1Stage,
	i2Stage,
	i3Stage,
	i4Stage,
	i5Stage,
} = require("../shared/questions");

const router = express.Router();

// fetch all fiveIs
router.get("/", (req, res) => {
	FiveI.find({})
		.then((data) => {
			sendResponse({ response: res, data: data, error: null });
		})
		.catch((error) => {
			sendResponse({ response: res, data: null, error: error });
		});
});

// fetch 5I of a project
router.get("/:project_id", (req, res) => {
	FiveI.find({ projectId: req.params.project_id })
		.then((data) => {
			if (!data || !data.length) {
				throw "project doesnt exist with this project id";
			} else {
				sendResponse({ response: res, data: data, error: null });
			}
		})
		.catch((err) => {
			sendResponse({ response: res, data: null, error: err });
		});
});

// creating 5Is for a project
router.post("/create/:project_id", (req, res) => {
	const new5I = new FiveI({
		projectId: req.params.project_id,
		identify: i1Stage,
		investigation: i2Stage,
		ideation: i3Stage,
		implementation: i4Stage,
		inform: i5Stage,
		demoURL: "",
	});

	new5I
		.save()
		.then((saveRes) => {
			sendResponse({ response: res, data: new5I, error: null });
		})
		.catch((error) => {
			sendResponse({ response: res, data: null, error: error });
		});
});

module.exports = router;
