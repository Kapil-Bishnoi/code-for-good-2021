import axios from "axios";
import React, { useEffect, useState } from "react";
import {
	makeStyles,
	Grid,
	Container,
	Button,
	CssBaseline,
	TextField,
	Typography,
	IconButton,
	Avatar,
	Input,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { PhotoCamera } from "@material-ui/icons";
import MovieIcon from "@material-ui/icons/Movie";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
	},

	stageItem: {
		marginTop: theme.spacing(1),
		display: "flex",
		flexDirection: "column",
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
	},
	qItem: {
		padding: theme.spacing(2),
		display: "flex",
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	title: {
		display: "flex",
	},
	projectSubmitBtn: {
		display: "flex",
		marginTop: theme.spacing(4),
		justifyContent: "center",
		alignItems: "center",
		marginBottom: theme.spacing(12),
	},
}));

export const FiveI = ({ projId }) => {
	const classes = useStyles();
	const role = localStorage.getItem("role");
	const history = useHistory();
	const access = role && role === "student" ? true : false;
	const [fiveI, setFiveI] = useState({
		identify: null,
		investigation: null,
		ideation: null,
		implementation: null,
		inform: null,
	});
	const [i1, setI1] = useState(fiveI.identify);
	const [i2, setI2] = useState(fiveI.investigation);
	const [i3, setI3] = useState(fiveI.ideation);
	const [i4, setI4] = useState(fiveI.implementation);
	const [i5, setI5] = useState(fiveI.inform);

	console.log(i1);

	// const { identify, investigation, ideation, implementation, inform } = {
	// 	...fiveI,
	// };

	useEffect(() => {
		axios
			.get(`https://cfg2021.herokuapp.com/fivei/${projId}`)
			.then((res) => {
				console.log(res);
				const dataObj = res.data.data;
				setFiveI(dataObj[0]);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		setI1(fiveI.identify);
		setI2(fiveI.investigation);
		setI3(fiveI.ideation);
		setI4(fiveI.implementation);
		setI5(fiveI.inform);
	}, [fiveI]);

	const handleProjectSubmit = () => {
		axios
			.request(`https://cfg2021.herokuapp.com/projects/submit/${projId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			})
			.then((res) => {
				console.log(res);
				history.push("/projects");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Container component="main" className={classes.root}>
			<CssBaseline />
			<div className={classes.stageItem}>
				<StageItem label="1) Identify" stage={i1} cnt={1} access={access} />
			</div>
			<div className={classes.stageItem}>
				<StageItem
					label="2) investigation"
					stage={i2}
					cnt={2}
					access={access}
				/>
			</div>
			<div className={classes.stageItem}>
				<StageItem label="3) Ideation" stage={i3} cnt={3} access={access} />
			</div>
			<div className={classes.stageItem}>
				<StageItem
					label="4) Implementation"
					stage={i4}
					cnt={4}
					access={access}
				/>
			</div>
			<div className={classes.stageItem}>
				<StageItem label="5) Inform" stage={i5} cnt={5} access={access} />
			</div>
			<Grid
				container
				style={{
					display: "flex",
					justifyContent: "space-around",
					alignItems: "center",
				}}
			>
				<Typography component="h5" variant="h6">
					Paste Project Demo Link(Optional)
				</Typography>
				<TextField
					disabled={access ? false : true}
					type="url"
					fullWidth
					placeholder="Project Demo URL"
					variant="outlined"
					label="Project Demo URL"
				/>
			</Grid>
			{access && (
				<Grid className={classes.projectSubmitBtn}>
					<Button
						onClick={handleProjectSubmit}
						variant="contained"
						color="primary"
					>
						Submit Project
					</Button>
				</Grid>
			)}
		</Container>
	);
};

function StageItem({ stage, label, cnt, access }) {
	const classes = useStyles();
	const [editable, toggle] = useState(false);
	return (
		<>
			<Grid item xs={12} className={classes.title}>
				<Typography component="h1" variant="h4">
					{label}
				</Typography>
				{access && (
					<IconButton
						style={{
							color: "#3c52b2",
						}}
						onClick={() => toggle(!editable)}
					>
						<EditIcon />
						edit
					</IconButton>
				)}
			</Grid>
			<Container className={classes.formContainer}>
				<form className={classes.form} noValidate>
					{stage?.questions.map((q) => {
						return (
							<Grid
								item
								xs={12}
								className={classes.qItem}
								key={`i${cnt}q${q.qId}`}
							>
								<TextField
									autoFocus
									autoComplete="off"
									name={`i${cnt}q${q.qId}`}
									variant="outlined"
									required
									fullWidth
									id={`i${cnt}q${q.qId}`}
									label={q.qText + ` [max marks: ${q.maxMarks}]`}
									multiline
									rows={5}
									disabled={editable && access ? false : true}
								/>
							</Grid>
						);
					})}
					{stage?.images.map((q) => {
						return (
							<Grid
								item
								xs={12}
								className={classes.qItem}
								key={`i${cnt}i${q.imageId}`}
								direction="column"
							>
								<Typography>
									{q.imageText + ` [max marks: ${q.maxMarks}]`}
								</Typography>
								{access && (
									<Input
										accept="image/*"
										style={{ display: "none" }}
										id="icon-button-file"
										type="file"
										// onChange={handleImageSubmit}
									/>
								)}
								<label htmlFor="icon-button-file">
									<IconButton
										color="primary"
										aria-label="upload picture"
										component="span"
										style={{
											height: "400px",
											width: "400px",
											backgroundColor: "#c9c7e0",
										}}
										disabled={access ? false : true}
									>
										{!q.imageURL && (
											<span>
												<PhotoCamera /> Upload Image
											</span>
										)}
										{q.imageURL && (
											<Avatar
												name={`i${cnt}i${q.imageId}`}
												id={`i${cnt}i${q.imageId}`}
												variant="square"
												src={q.imageURL}
											/>
										)}
									</IconButton>
								</label>
							</Grid>
						);
					})}
					{stage?.videos.map((q) => {
						return (
							<Grid
								item
								xs={12}
								className={classes.qItem}
								key={`i${cnt}v${q.videoId}`}
								direction="column"
							>
								<Typography>
									{q.videoText + ` [max marks: ${q.maxMarks}]`}
								</Typography>
								{access && (
									<Input
										accept="video/*"
										style={{ display: "none" }}
										id="icon-button-file"
										type="file"
										// onChange={handleImageSubmit}
									/>
								)}
								<label htmlFor="icon-button-file">
									<IconButton
										color="primary"
										aria-label="upload picture"
										component="span"
										style={{
											height: "400px",
											width: "400px",
											backgroundColor: "#c9c7e0",
										}}
										disabled={access ? false : true}
									>
										{!q.videoURL && (
											<span>
												<MovieIcon /> Upload Video
											</span>
										)}
										{q.videoURL && (
											<Avatar
												name={`i${cnt}v${q.videoId}`}
												id={`i${cnt}v${q.videoId}`}
												variant="square"
												src={q.videoURL}
											/>
										)}
									</IconButton>
								</label>
							</Grid>
						);
					})}
				</form>
			</Container>
		</>
	);
}
