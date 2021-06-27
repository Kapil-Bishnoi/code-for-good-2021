const Project = require('../models/projectSchema');

// get all users from list of userIDs
const getProjectsFromStudentId = (projectIds) => {
    return new Promise((resolve) => {
        const projects = [];
        for(let i=0;i<projectIds.length;i++){
            projects.push(projectIds[i].projectId);
        }
        console.log(projects);
        Project.find({
            projectId: {
                $in: projects
            },
        })
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            resolve(err);
        });
    })
}

module.exports = getProjectsFromStudentId;