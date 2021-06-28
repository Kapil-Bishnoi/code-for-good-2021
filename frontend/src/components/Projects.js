import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography, Divider } from "@material-ui/core";
import axios from "axios";
import { ProjectCard } from "./ProjectCard";

const useStyles = makeStyles((theme) => ({
	projects_page: {
		display: "flex",
		flexDirection: "column",
	},
	activeProjs: {
		display: "flex",
		flexWrap: "wrap",
	},
	submitedProjs: {
		display: "flex",
		flexWrap: "wrap",
	},
	heading: {
		marginTop: theme.spacing(2),
	},
}));

export const Projects = () => {
	const classes = useStyles();
	const role = localStorage.getItem("role");
	const [userProjects, setUserProjects] = useState([]);
	const [activeProjects, setActiveProjects] = useState([]);
	const [submitedProjects, setSubmitedProjects] = useState([]);
	console.log(userProjects);
	console.log(activeProjects);
	console.log(submitedProjects);

	useEffect(() => {
		const userId = localStorage.getItem("userId");

		if (role === "student") {
			// fetch current user projects
			axios
				.get(`https://cfg2021.herokuapp.com/students/projects/${userId}`)
				.then((res) => {
					// console.log(res);
					const projectsList = res.data.data;
					setUserProjects(projectsList);
					setActiveProjects(projectsList?.filter((p) => p.isSubmited !== true));
					setSubmitedProjects(
						projectsList?.filter((p) => p.isSubmited === true)
					);
				})
				.catch((err) => {
					console.log(err);
				});
		}
		else if(role !== 'student'){
			// fetch current user projects
			axios
				.get(`https://cfg2021.herokuapp.com/${role}s/assignedprojs/${userId}`)
				.then((res) => {
					// console.log(res);
					const projectsList = res.data.data;
					setUserProjects(projectsList);
					if(role === 'mentor'){ // for mentor we need unsubmited projs as active
						setActiveProjects(projectsList?.filter((p) => p.isSubmited !== true));
						setSubmitedProjects(
							projectsList?.filter((p) => p.isSubmited === true)
						);
					}
					else { // for evaluator we need unevaluated as active
						setActiveProjects(projectsList?.filter((p) => p.isEvaluated !== true));
						setSubmitedProjects(
							projectsList?.filter((p) => p.isEvaluated === true)
						);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	return (
		<Container className={classes.projects_page}>
			<Grid item className={classes.heading}>
				<Typography component="h1" variant="h4">
					{(role === 'student')? "Your Active Projects": "Active Projects Under your Supervision"}
				</Typography>
			</Grid>
			<Container className={classes.activeProjs}>
				{activeProjects.map((proj) => {
					return <ProjectCard key={proj.projectId} proj={proj} />;
				})}
			</Container>
			<Divider variant="fullWidth" />
			<Grid item className={classes.heading}>
			<Typography component="h1" variant="h4">
					{(role === 'student')? "Your Submited Projects": "History"}
				</Typography>
			</Grid>
			<Container className={classes.submitedProjs}>
				{submitedProjects.map((proj) => {
					return <ProjectCard key={proj.projectId} proj={proj} />;
				})}
			</Container>
		</Container>
	);
};
