const express = require("express");
const sendResponse = require("../lib/response");
const Project = require("../models/projectSchema");
const { v4: uid } = require("uuid");
const Student = require("../models/studentUserSchema");
const FiveI = require("../models/5Ischema");
const questions = require('../shared/questions');
const getTeamFromIds = require("../lib/getTeamfromIds");

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

// fetch all the active projs means those are not submited yet
router.get("/active", (req, res) => {
	Project.find({ isSubmited: false })
		.then((data) => {
			sendResponse({ response: res, data: data, error: null });
		})
		.catch((error) => {
			sendResponse({ response: res, data: null, error: error });
		});
});

// fetch all the projs those needs to be evaluated
router.get("/forevaluation", (req, res) => {
	Project.find({ isSubmited: true, isEvaluated: false })
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

// fetch team members of a project
router.get("/team/:project_id", (req, res) => {
	Project.find(
		{ projectId: req.params.project_id },
		{ _id: 0, team: 1, mentors: 1, evaluators: 1 }
	)
		.then((data) => {
			if (data) {
				// console.log(data);
				const dataObj = data[0];
				const teamIds = dataObj ? dataObj.team : [];
				const mentorIds = dataObj ? dataObj.mentors : [];
				const evalIds = dataObj ? dataObj.evaluators : [];
				getTeamFromIds({ teamIds: teamIds, type: "students" })
					.then((team) => {
						getTeamFromIds({ teamIds: mentorIds, type: "mentors" })
							.then((mentors) => {
								getTeamFromIds({ teamIds: evalIds, type: "evaluators" })
									.then((evaluators) => {
										sendResponse({
											response: res,
											data: {
												team: team,
												mentors: mentors,
												evaluators: evaluators,
											},
											error: null,
										});
									})
									.catch((err) => {
										sendResponse({
											response: res,
											data: { team: team, mentors: mentors, evaluators: [] },
											error: err,
										});
									});
							})
							.catch((err) => {
								// console.log(err);
								sendResponse({
									response: res,
									data: { team: team, mentors: [], evaluators: [] },
									error: err,
								});
							});
					})
					.catch((err) => {
						sendResponse({
							response: res,
							data: null,
							error: { message: err.message },
						});
					});
			}
		})
		.catch((err) => {
			console.log(err);
		});
});

// creating new project for a student
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
		mentors: [],
		evaluators: [],
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
						questions: questions,
						demoURL: "",
					});
					new5I
						.save()
						.then((saveRes) => {
							//also send project data in response
							sendResponse({
								response: res,
								data: { new5I, newProject },
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
			} else if (data[0].isSubmited === true) {
				throw "Cannot join the submited project!";
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

// leaving a project by student
router.post("/leave/:student_id/:project_id", (req, res) => {
	Project.find({ projectId: req.params.project_id })
		.then((data) => {
			if (!data || !data.length) {
				// there no existing project for this id...probably typed wrong project id for joining
				throw "there no existing project for this id...probably typed wrong project id for joining!";
			} else if (data[0].isSubmited === true) {
				throw "Cannot leave the submited project!";
			} else {
				// remove this student from team for this project
				const newTeamMate = {
					studentId: req.params.student_id,
				};
				Project.updateOne(
					{ projectId: req.params.project_id },
					{ $pull: { team: newTeamMate } }
				)
					.then((updateRes) => {
						// now we need to remove this project under that stundent too
						const leaveProj = {
							projectId: req.params.project_id,
						};

						Student.updateOne(
							{ studentId: req.params.student_id },
							{ $pull: { projects: leaveProj } }
						)
							.then((addRes) => {
								sendResponse({
									response: res,
									data: "successfully removed",
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
