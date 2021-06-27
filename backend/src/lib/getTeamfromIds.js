const Student = require("../models/studentUserSchema");

// get all users from list of userIDs
const getTeamFromIds = (teamIds) => {
	return new Promise((resolve) => {
		const teamMembers = [];
		for (let i = 0; i < teamIds.length; i++) {
			teamMembers.push(teamIds[i].studentId);
		}
		console.log(teamMembers);
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
	});
};

module.exports = getTeamFromIds;
