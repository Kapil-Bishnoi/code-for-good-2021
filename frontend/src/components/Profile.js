import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
	Container,
	Grid,
	CssBaseline,
	Typography,
	Avatar,
} from "@material-ui/core";
import { ProjectCard } from "./ProjectCard";

const useStyles = makeStyles((theme) => ({
	userInfo: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "flex-start",
	},
	profilePage: {
		marginTop: theme.spacing(2),
		display: "flex",
	},
	profileImage: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
	},
	profileAvatar: {
		height: theme.spacing(20),
		width: theme.spacing(20),
	},
	basicInfo: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginLeft: theme.spacing(4),
	},
	role: {
		color: "grey",
	},
	personalInfo: {
		textDecorationLine: "underline",
		marginBottom: theme.spacing(1),
	},
	infoItem: {
		padding: theme.spacing(1),
	},
	ongoing: {
		textDecorationLine: "underline",
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(1),
	},
	activeProjs: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
	},
	submitedProjs: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
	},
}));

export const Profile = () => {
	const classes = useStyles();
	const [userData, setUserData] = useState(null);
	const [userProjects, setUserProjects] = useState([]);
	const [activeProjects, setActiveProjects] = useState([]);
	const [submitedProjects, setSubmitedProjects] = useState([]);
	console.log(userData);
	console.log(userProjects);
	console.log(activeProjects);
	console.log(submitedProjects);

	useEffect(() => {
		const userId = localStorage.getItem("userId");
		const role = localStorage.getItem("role");

		// fetch current user
		axios
			.get(`https://cfg2021.herokuapp.com/${role}s/${userId}`)
			.then((res) => {
				// console.log(res);
				const data = res.data.data;
				if (data && data.length) {
					const userInfo = data[0];
					setUserData(userInfo);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		const userId = localStorage.getItem("userId");

		// fetch current user projects
		axios
			.get(`https://cfg2021.herokuapp.com/students/projects/${userId}`)
			.then((res) => {
				// console.log(res);
				const projectsList = res.data.data;
				setUserProjects(projectsList);
				setActiveProjects(projectsList?.filter((p) => p.isSubmited !== true));
				setSubmitedProjects(projectsList?.filter((p) => p.isSubmited === true));
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<Container component="main" maxWidth="lg">
			<CssBaseline />
			<Grid container item className={classes.profilePage}>
				<Grid container item className={classes.userInfo}>
					<Grid item xs={12} sm={2} className={classes.profileImage}>
						<Avatar
							src="https://scontent-del1-1.xx.fbcdn.net/v/t1.6435-9/138997864_842154576352818_1406178736804240892_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=FgDVRvQC6BMAX-VZ-Fk&_nc_ht=scontent-del1-1.xx&oh=6f9293b62b81210291fa79207fcb52fb&oe=60DCF6DB"
							alt="profile image"
							className={classes.profileAvatar}
						/>
					</Grid>
					<Grid container className={classes.basicInfo} item xs={12} sm={10}>
						<Grid item xs={12} className={classes.fullname}>
							<Typography component="h1" variant="h4">
								{userData?.fullName}
							</Typography>
							<Typography className={classes.role} component="h4" variant="h6">
								{userData?.role}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} className={classes.personalInfo}>
					<Typography component="h2" variant="h5">
						PERSONAL INFORMATION
					</Typography>
				</Grid>
				<Grid item xs={12} sm={4} className={classes.infoItem}>
					<Typography component="h4" variant="h6">
						Email Id:{" "}
						<span style={{ color: "#3c52b2" }}>{userData?.emailId}</span>
					</Typography>
				</Grid>
				{userData?.contactNumber && (
					<Grid item xs={12} sm={4} className={classes.infoItem}>
						<Typography component="h4" variant="h6">
							Contact Number:{" "}
							<span style={{ color: "#3c52b2" }}>
								{userData?.contactNumber}
							</span>
						</Typography>
					</Grid>
				)}
				{userData?.grade && (
					<Grid item xs={12} sm={4} className={classes.infoItem}>
						<Typography component="h4" variant="h6">
							Class:{" "}
							<span style={{ color: "#3c52b2" }}>{userData?.grade}th</span>
						</Typography>
					</Grid>
				)}
				{userData?.age && (
					<Grid item xs={12} sm={4} className={classes.infoItem}>
						<Typography component="h4" variant="h6">
							Age: <span style={{ color: "#3c52b2" }}>{userData?.age}</span>
						</Typography>
					</Grid>
				)}
				{userData?.stateAddress && (
					<Grid item xs={12} sm={4} className={classes.infoItem}>
						<Typography component="h4" variant="h6">
							State:{" "}
							<span style={{ color: "#3c52b2" }}>{userData?.stateAddress}</span>
						</Typography>
					</Grid>
				)}
				{userData?.districtAddress && (
					<Grid item xs={12} sm={4} className={classes.infoItem}>
						<Typography component="h4" variant="h6">
							District:{" "}
							<span style={{ color: "#3c52b2" }}>
								{userData?.districtAddress}
							</span>
						</Typography>
					</Grid>
				)}
				{userData?.schoolName && (
					<Grid item xs={12} sm={4} className={classes.infoItem}>
						<Typography component="h4" variant="h6">
							School:{" "}
							<span style={{ color: "#3c52b2" }}>{userData?.schoolName}</span>
						</Typography>
					</Grid>
				)}
				<Grid item xs={12} className={classes.ongoing}>
					<Typography component="h2" variant="h5">
						ACTIVE PROJECTS
					</Typography>
				</Grid>
				<Container className={classes.activeProjs}>
					{activeProjects.map((proj) => {
						return <ProjectCard key={proj.projectId} proj={proj} />;
					})}
				</Container>
				<Grid item xs={12} className={classes.ongoing}>
					<Typography component="h2" variant="h5">
						SUBMITED PROJECTS
					</Typography>
				</Grid>
				<Container className={classes.submitedProjs}>
					{submitedProjects.map((proj) => {
						return <ProjectCard key={proj.projectId} proj={proj} />;
					})}
				</Container>
			</Grid>
		</Container>
	);
};
