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
	allMembers: {
		display: "flex",
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
		},
	},
}));

export const Project5I = () => {
	const classes = useStyles();
	const location = useLocation();
	const role = localStorage.getItem("role");
	const [projectInfo, setProjectInfo] = useState(location.state);
	const [team, setTeam] = useState([]);
	const [mentorsTeam, setMentorsTeam] = useState([]);
	const [evalTeam, setEvalTeam] = useState([]);

	useEffect(() => {
		axios
			.get(
				`https://cfg2021.herokuapp.com/projects/team/${projectInfo?.projectId}`
			)
			.then((res) => {
				console.log(res);
				const dataObj = res.data.data;
				if (dataObj?.team) {
					setTeam(dataObj?.team);
				}
				if (dataObj?.mentors) {
					setMentorsTeam(dataObj?.mentors);
				}
				if (dataObj?.evaluators) {
					setEvalTeam(dataObj?.evaluators);
				}
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
						{projectInfo?.projectName}
					</Typography>
				</Grid>
				<Grid item xs={6} style={{ textAlign: "end" }}>
					<Typography component="h2" variant="h5">
						<span style={{ color: "grey" }}>Project Domain: </span>
						{projectInfo?.projectDomain}
					</Typography>
				</Grid>
			</Grid>
			<Container className={classes.allMembers}>
				<Grid
					item
					// xs={role === "student" ? 6 : 4}
					className={classes.teamTitle}
				>
					<Typography
						style={{ textDecorationLine: "underline" }}
						component="h2"
						variant="h5"
					>
						Team Members:
					</Typography>
					<Container className={classes.teamMembers}>
						{team?.map((member) => {
							return (
								<TeamCard
									key={member.studentId}
									className={classes.member}
									member={member}
								/>
							);
						})}
					</Container>
				</Grid>
				<Grid
					// xs={role === "student" ? 6 : 4}
					item
					className={classes.teamTitle}
				>
					<Typography
						style={{ textDecorationLine: "underline" }}
						component="h2"
						variant="h5"
					>
						Mentors:
					</Typography>
					<Container className={classes.teamMembers}>
						{mentorsTeam?.map((member) => {
							return (
								<TeamCard
									key={member.mentorId}
									className={classes.member}
									member={member}
								/>
							);
						})}
					</Container>
				</Grid>
				{role !== "student" && (
					<Grid item className={classes.teamTitle}>
						<Typography
							style={{ textDecorationLine: "underline" }}
							component="h2"
							variant="h5"
						>
							Evaluators:
						</Typography>
						<Container className={classes.teamMembers}>
							{evalTeam?.map((member) => {
								return (
									<TeamCard
										key={member.evaluatorId}
										className={classes.member}
										member={member}
									/>
								);
							})}
						</Container>
					</Grid>
				)}
			</Container>
			<Divider style={{ marginTop: "20px" }} />
			<Grid item xs={12} className={classes.title2}>
				<Typography component="h1" variant="h4">
					Five I Stages
				</Typography>
			</Grid>
			<FiveI
				projId={projectInfo?.projectId}
				isSubmited={projectInfo?.isSubmited}
			/>
		</Container>
	);
};
