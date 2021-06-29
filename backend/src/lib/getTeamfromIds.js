const Evaluator = require("../models/evaluatorUserSchema");
const Student = require("../models/studentUserSchema");
const Mentor = require('../models/mentorUserSchema');

// get all users from list of userIDs
const getTeamFromIds = ({teamIds, type}) => {
	return new Promise((resolve) => {
		const teamMembers = [];
		for (let i = 0; i < teamIds.length; i++) {
			teamMembers.push(teamIds[i].studentId);
		}
		console.log(teamMembers);
		if(type === 'students'){
			Student.find(
				{
					studentId: {
						$in: teamMembers,
					},
				},
				{
					_id: 0,
					fullName: 1,
					emailId: 1,
					profileURL: 1,
					studentId: 1,
					schoolName: 1,
				}
			)
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					resolve(err);
				});
		}
		else if(type === "mentors"){
			Mentor.find(
				{
					mentorId: {
						$in: teamMembers,
					},
				},
				{
					_id: 0,
					fullName: 1,
					emailId: 1,
					profileURL: 1,
					mentorId: 1,
					contactNumber: 1,
				}
			)
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					resolve(err);
				});
		}
		else {
			Evaluator.find(
				{
					evaluatorId: {
						$in: teamMembers,
					},
				},
				{
					_id: 0,
					fullName: 1,
					emailId: 1,
					profileURL: 1,
					evaluatorId: 1,
					contactNumber: 1,
				}
			)
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					resolve(err);
				});
		}
	});
};

module.exports = getTeamFromIds;
