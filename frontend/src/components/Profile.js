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
import { Projects } from "./Projects";
import { Input, IconButton, Button } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import { storage } from "../firebase";

const useStyles = makeStyles((theme) => ({
	userInfo: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: theme.spacing(4),
	},
	profilePage: {
		marginTop: theme.spacing(2),
		display: "flex",
	},
	profileImage: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	profileAvatar: {
		height: theme.spacing(20),
		width: theme.spacing(20),
	},
	basicInfo: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "center",
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
	avatarInput: {
		display: "none",
	},
	uploadBtn: {
		height: theme.spacing(20),
		width: theme.spacing(20),
		backgroundColor: "#c9c7e0",
	},
}));

export const Profile = () => {
	const classes = useStyles();
	const id = localStorage.getItem("userId");
	const userRole = localStorage.getItem("role");
	const [userData, setUserData] = useState(null);

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

	const [imageURL, setImageURL] = useState("");
	const handleImageSubmit = (e) => {
		if (e.target.files[0]) {
			const imageFile = e.target.files[0];
			console.log(imageFile);
			const uploadTask = storage.ref(`profileImages/${id}`).put(imageFile);
			uploadTask.on(
				"state_changed",
				(snapshot) => {},
				(error) => {
					console.log(error);
				},
				() => {
					storage
						.ref("profileImages")
						.child(id)
						.getDownloadURL()
						.then((url) => {
							console.log(url);
							setImageURL(url);
							const urlObj = {
								imageURL: url,
							};
							axios
								.request(
									`https://cfg2021.herokuapp.com/profile/update/${userRole}/${id}`,
									{
										method: "POST",
										data: JSON.stringify(urlObj),
										headers: {
											"Content-Type": "application/json",
											"Access-Control-Allow-Origin": "*",
										},
									}
								)
								.then((res) => {
									console.log(res);
								})
								.catch((err) => {
									console.log(err);
								});
						})
						.catch((err) => {
							console.log(err);
						});
				}
			);
		}
	};

	return (
		<Container component="main" maxWidth="lg">
			<CssBaseline />
			<Grid container item className={classes.profilePage}>
				<Grid container item className={classes.userInfo}>
					<Grid item xs={12} sm={3} className={classes.profileImage}>
						<Input
							accept="image/*"
							className={classes.avatarInput}
							id="icon-button-file"
							type="file"
							onChange={handleImageSubmit}
						/>
						<label htmlFor="icon-button-file">
							<IconButton
								color="primary"
								aria-label="upload picture"
								component="span"
								className={classes.uploadBtn}
							>
								{!userData?.profileURL && !imageURL && (
									<span>
										<PhotoCamera /> Upload
									</span>
								)}

								{(userData?.profileURL || imageURL) && (
									<Avatar
										//src={userData?.profileURL}
										src={imageURL || userData?.profileURL}
										alt={userData?.fullName}
										className={classes.profileAvatar}
									/>
								)}
							</IconButton>
						</label>
						{(userData?.profileURL || imageURL) && (
							<>
								<Input
									accept="image/*"
									className={classes.avatarInput}
									id="icon-button-file"
									type="file"
									onChange={handleImageSubmit}
								/>
								<label htmlFor="icon-button-file">
									<Button
										style={{ marginTop: "8px" }}
										variant="outlined"
										color="primary"
										component="span"
									>
										Upload
									</Button>
								</label>
							</>
						)}
					</Grid>
					<Grid container className={classes.basicInfo} item xs={12} sm={9}>
						<Typography component="h1" variant="h4">
							{userData?.fullName}
						</Typography>
						<Typography className={classes.role} component="h4" variant="h6">
							{userData?.role}
						</Typography>
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
				<Projects />
			</Grid>
		</Container>
	);
};
