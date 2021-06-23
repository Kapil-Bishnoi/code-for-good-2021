const express = require("express");
const sendResponse = require("../lib/response");
const Project = require("../models/projectSchema");
const { v4: uid } = require("uuid");
const Student = require("../models/studentUserSchema");

const router = express.Router();

// fetch all the projects
router.get("/", (req, res) => {
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
				throw Error("no project exist with the given id!");
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
				throw Error("no project exist with the given domain!");
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
				throw Error("no project exist with the given name!");
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
			// also need to add this project under that student
			const newProjectForStudent = {
				projectId: newProject.projectId,
			};

			Student.updateOne(
				{ studentId: req.params.student_id },
				{ $addToSet: { projects: newProjectForStudent } }
			)
				.then((updateRes) => {
					sendResponse({
						response: { saveRes, updateRes },
						data: newProject,
						error: null,
					});
				})
				.catch((err) => {
					throw Error(err);
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
				throw Error(
					"there no existing project for this id...probably typed wrong project id for joining!"
				);
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
									response: { res, addRes, updateRes },
									data: data,
									error: null,
								});
							})
							.catch((err) => {
								throw Error(err);
							});
					})
					.catch((err) => {
						throw Error(err);
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
				throw Error("no project exists with this id!");
			} else {
				if (data.isSubmited === true) {
					// proejct is already submitted, It can only be submitted once!
					throw Error(
						"proejct is already submitted, It can only be submitted once!"
					);
				} else {
					Project.updateOne(
						{ projectId: req.params.project_id },
						{ isSubmited: true }
					)
						.then((updateRes) => {
							sendResponse({
								response: updateRes,
								data: "project successfully submited!",
								error: null,
							});
						})
						.catch((error) => {
							throw Error(
								"error in updating the submission flag of project!",
								error
							);
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
				throw Error("no project exists with this id!");
			} else {
				if (data.isSubmited === false) {
					// proejct is already submitted, It can only be submitted once!
					throw Error(
						"proejct is not submitted yet, It can only be evaluated after submission!"
					);
				} else if (data.isEvaluated === true) {
					// proejct is already evaluated, It can only be evaluated once!
					throw Error(
						"proejct is already evaluated, It can only be evaluated once!"
					);
				} else {
					Project.updateOne(
						{ projectId: req.params.project_id },
						{ isEvaluated: true, score: req.params.marks }
					)
						.then((updateRes) => {
							sendResponse({
								response: updateRes,
								data: "project successfully evaluated!",
								error: null,
							});
						})
						.catch((error) => {
							throw Error(
								"error in updating the evaluation flag of project!",
								error
							);
						});
				}
			}
		})
		.catch((error) => {
			sendResponse({ response: res, data: null, error: error });
		});
});

