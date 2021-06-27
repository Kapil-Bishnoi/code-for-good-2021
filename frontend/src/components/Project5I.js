import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
	makeStyles,
	Container,
	Grid,
	Typography,
	Divider,
} from "@material-ui/core";
import axios from "axios";
import { TeamCard } from "./TeamCard";
import { FiveI } from "./FiveI";

const useStyles = makeStyles((theme) => ({
	fiveIPage: {
		display: "flex",
		flexDirection: "column",
		marginTop: theme.spacing(2),
	},
	name: {
		display: "flex",
	},
	teamTitle: {
		marginTop: theme.spacing(2),
	},
	teamMembers: {
		display: "flex",
		flexWrap: "wrap",
		marginTop: theme.spacing(2),
	},
	title2: {
		display: "flex",
		justifyContent: "center",
		marginTop: theme.spacing(2),
		color: "#3c52b2",
	},
}));

export const Project5I = () => {
	const classes = useStyles();
	const location = useLocation();

	const [projectInfo, setProjectInfo] = useState(location.state);
	const [team, setTeam] = useState([]);
	console.log(projectInfo);
	console.log(team);

	useEffect(() => {
		axios
			.get(
				`https://cfg2021.herokuapp.com/projects/team/${projectInfo.projectId}`
			)
			.then((res) => {
				console.log(res);
				const teamList = res.data.data;
				setTeam(teamList);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<Container className={classes.fiveIPage}>
			<Grid xs={12} className={classes.name}>
				<Grid item xs={6}>
					<Typography component="h2" variant="h5">
						<span style={{ color: "grey" }}>Project Name: </span>
						{projectInfo.projectName}
					</Typography>
				</Grid>
				<Grid item xs={6} style={{ textAlign: "end" }}>
					<Typography component="h2" variant="h5">
						<span style={{ color: "grey" }}>Project Domain: </span>
						{projectInfo.projectDomain}
					</Typography>
				</Grid>
			</Grid>
			<Grid item xs={6} className={classes.teamTitle}>
				<Typography
					style={{ textDecorationLine: "underline" }}
					component="h2"
					variant="h5"
				>
					Team Members:
				</Typography>
			</Grid>
			<Container className={classes.teamMembers}>
				{team.map((member) => {
					return <TeamCard key={member.studentId} className={classes.member} member={member} />;
				})}
			</Container>
			<Divider style={{ marginTop: "20px" }} />
			<Grid item xs={12} className={classes.title2}>
				<Typography component="h1" variant="h4">
					Five I Stages
				</Typography>
			</Grid>
			<FiveI projId={projectInfo.projectId} />
		</Container>
	);
};
