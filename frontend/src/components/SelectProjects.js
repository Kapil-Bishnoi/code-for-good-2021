import React, { useEffect, useState } from "react";
import { makeStyles, Container, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { SelectProjCard } from "./SelectProjCard";

const useStyles = makeStyles((theme) => ({
	projects_page: {
		display: "flex",
		flexDirection: "column",
	},
	activeProjs: {
		display: "flex",
		flexWrap: "wrap",
	},
	heading: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
}));

export const SelectProjects = () => {
	const classes = useStyles();
	const role = localStorage.getItem("role");
	const [activeProjects, setActiveProjs] = useState([]);
	console.log(activeProjects);

	useEffect(() => {
		if (role === "mentor") {
			axios
				.get(`https://cfg2021.herokuapp.com/projects/active`)
				.then((res) => {
					const projs = res.data.data;
					setActiveProjs(projs);
				})
				.catch((err) => {
					console.log(err);
				});
		}
		else{
			axios
				.get(`https://cfg2021.herokuapp.com/projects/forevaluation`)
				.then((res) => {
					const projs = res.data.data;
					setActiveProjs(projs);
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
					{(role === 'mentor') ? "Select Projects for Mentoring": "Select Projects for Evaluation"}
				</Typography>
			</Grid>
			<Container className={classes.activeProjs}>
				{activeProjects &&
					activeProjects.map((proj) => {
						return <SelectProjCard key={proj.projectId} proj={proj} />;
					})}
			</Container>
		</Container>
	);
};
