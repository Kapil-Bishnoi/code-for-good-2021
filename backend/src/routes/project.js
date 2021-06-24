const express = require("express");
const sendResponse = require("../lib/response");
const Project = require("../models/projectSchema");
const { v4: uid } = require("uuid");
const Student = require("../models/studentUserSchema");
const FiveI = require("../models/5Ischema");
const {
	i1Stage,
	i2Stage,
	i3Stage,
	i4Stage,
	i5Stage,
} = require("../shared/questions");

const router = express.Router();

// fetch all the projects
router.get("/", (req, res) => {
	console.log("/projects");
	Project.find({})
		.then((data) => {
			sendResponse({ response: res, data: data, error: null });
		})
		.catch((error) => {
			sendResponse({ response: res, data: null, error: error });
		});
});

// fetch project with projectId
router.get("/id/:project_id", (req, res) => {
	Project.find({ projectId: req.params.project_id })
		.then((data) => {
			if (!data || !data.length) {
				throw "no project exist with the given id!";
			} else {
				sendResponse({ response: res, data: data, error: null });
			}
		})
		.catch((error) => {
			sendResponse({ response: res, data: null, error: error });
		});
});

// fetch project with projectDomain
router.get("/domain/:project_domain", (req, res) => {
	Project.find({ projectDomain: req.params.project_domain })
		.then((data) => {
			if (!data || !data.length) {
				throw "no project exist with the given domain!";
			} else {
				sendResponse({ response: res, data: data, error: null });
			}
		})
		.catch((error) => {
			sendResponse({ response: res, data: null, error: error });
		});
});

// fetch project with projectName
router.get("/name/:project_name", (req, res) => {
	Project.find({ projectName: req.params.project_name })
		.then((data) => {
			if (!data || !data.length) {
				throw "no project exist with the given name!";
			} else {
				sendResponse({ response: res, data: data, error: null });
			}
		})
		.catch((error) => {
			sendResponse({ response: res, data: null, error: error });
		});
});

// creating project for a student
router.post("/create/:student_id", (req, res) => {
	const newProject = new Project({
		projectId: uid(),
		projectDomain: req.body.projectDomain,
		projectName: req.body.projectName,
		description: req.body.description,
		team: [
			{
				studentId: req.params.student_id,
			},
		],
		currentStage: 1,
		isSubmited: false,
		isEvaluated: false,
		score: 0,
	});

	newProject
		.save()
		.then((saveRes) => {
			console.log("project created");

			// also need to add this project under that student
			const newProjectForStudent = {
				projectId: newProject.projectId,
			};

			Student.updateOne(
				{ studentId: req.params.student_id },
				{ $addToSet: { projects: newProjectForStudent } }
			)
				.then((updateRes) => {
					console.log("project is added under student");
					// now create fiveI for this project
					const new5I = new FiveI({
						projectId: newProject.projectId,
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
							console.log("created 5 Is");
							sendResponse({
								response: res,
								data: new5I,
								error: null,
							});
						})
						.catch((error) => {
							console.log(error);
							sendResponse({ response: res, data: null, error: error });
						});
				})
				.catch((err) => {
					sendResponse({ response: res, data: null, error: err });
				});
		})
		.catch((error) => {
			sendResponse({ response: res, data: null, error: error });
		});
});

// joining a project that already exists
router.post("/join/:student_id/:project_id", (req, res) => {
	Project.find({ projectId: req.params.project_id })
		.then((data) => {
			if (!data || !data.length) {
				// there no existing project for this id...probably typed wrong project id for joining
				throw "there no existing project for this id...probably typed wrong project id for joining!";
			} else {
				// add this student in team for this project
				const newTeamMate = {
					studentId: req.params.student_id,
				};
				Project.updateOne(
					{ projectId: req.params.project_id },
					{ $addToSet: { team: newTeamMate } }
				)
					.then((updateRes) => {
						// now we need to assign this project under that stundent too
						const newProjectForStudent = {
							projectId: req.params.project_id,
						};

						Student.updateOne(
							{ studentId: req.params.student_id },
							{ $addToSet: { projects: newProjectForStudent } }
						)
							.then((addRes) => {
								sendResponse({
									response: res,
									data: "successfully joined",
									error: null,
								});
							})
							.catch((err) => {
								sendResponse({
									response: res,
									data: null,
									error: err,
								});
							});
					})
					.catch((err) => {
						sendResponse({ response: res, data: null, error: err });
					});
			}
		})
		.catch((error) => {
			sendResponse({ response: res, data: null, error: error });
		});
});

// submiting a project
router.post("/submit/:project_id", (req, res) => {
	Project.find({ projectId: req.params.project_id })
		.then((data) => {
			if (!data || !data.length) {
				// no project exists
				throw "no project exists with this id!";
			} else {
				if (data[0].isSubmited === true) {
					// proejct is already submitted, It can only be submitted once!
					throw "proejct is already submitted, It can only be submitted once!";
				} else {
					Project.updateOne(
						{ projectId: req.params.project_id },
						{ isSubmited: true }
					)
						.then((updateRes) => {
							sendResponse({
								response: res,
								data: { message: "project successfully submited!", data: data },
								error: null,
							});
						})
						.catch((error) => {
							sendResponse({ response: res, data: null, error: error });
						});
				}
			}
		})
		.catch((error) => {
			sendResponse({ response: res, data: null, error: error });
		});
});

// evaluating a project
router.post("/evaluate/:project_id/:marks", (req, res) => {
	Project.find({ projectId: req.params.project_id })
		.then((data) => {
			if (!data || !data.length) {
				// no project exists
				throw "no project exists with this id!";
			} else {
				if (data[0].isSubmited === false) {
					// proejct is already submitted, It can only be submitted once!
					throw "proejct is not submitted yet, It can only be evaluated after submission!";
				} else if (data[0].isEvaluated === true) {
					// proejct is already evaluated, It can only be evaluated once!
					throw "proejct is already evaluated, It can only be evaluated once!";
				} else {
					Project.updateOne(
						{ projectId: req.params.project_id },
						{ isEvaluated: true, score: req.params.marks }
					)
						.then((updateRes) => {
							sendResponse({
								response: res,
								data: "project successfully evaluated!",
								error: null,
							});
						})
						.catch((error) => {
							sendResponse({ response: res, data: null, error: error });
						});
				}
			}
		})
		.catch((error) => {
			sendResponse({ response: res, data: null, error: error });
		});
});

module.exports = router;
