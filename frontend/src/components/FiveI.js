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
	Dialog,
	DialogActions,
	DialogTitle,
	Slide,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { PhotoCamera } from "@material-ui/icons";
import MovieIcon from "@material-ui/icons/Movie";
import { useHistory } from "react-router-dom";
import { storage } from "../firebase";
import ReactPlayer from "react-player";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
		justifyContent: "space-around",
		alignItems: "center",
		marginBottom: theme.spacing(12),
	},
	saveBtn: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-around",
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export const FiveI = ({ projId, isSubmited }) => {
	const classes = useStyles();
	const role = localStorage.getItem("role");
	const history = useHistory();
	const access = role && !isSubmited && role === "student" ? true : false;

	const [prevQues, setPrevQes] = useState([]);
	const [questions, setQues] = useState([]);
	const [prevDemoURL, setPrevDemoURL] = useState(null);
	const [demoURL, setDemoURL] = useState(null);

	const handleChange = (e) => {
		const newData = [];
		questions.map((q) => {
			if (q.id == e.target.name) {
				const newQ = {
					...q,
					ans: e.target.value,
				};
				newData.push(newQ);
			} else {
				newData.push(q);
			}
		});
		setQues(newData);
	};

	const setURLs = (id, url) => {
		const newData = [];
		questions.map((q) => {
			if (q.id == id) {
				const newQ = {
					...q,
					url: url,
				};
				newData.push(newQ);
			} else {
				newData.push(q);
			}
		});
		setQues(newData);
	};

	const cancelCurrentChanges = () => {
		setQues(prevQues);
		setDemoURL(prevDemoURL);
	};

	const saveCurrentChanges = () => {
		const updatedProject = {
			questions: questions,
			demoURL: demoURL,
		};

		axios
			.request(`https://cfg2021.herokuapp.com/fivei/savechanges/${projId}`, {
				method: "POST",
				data: JSON.stringify(updatedProject),
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			})
			.then((res) => {
				console.log(res);
				setOpen(true);
			})
			.catch((err) => {
				console.log(err);
			});
		setPrevQes(updatedProject.questions);
		setPrevDemoURL(updatedProject.demoURL);
	};

	useEffect(() => {
		axios
			.get(`https://cfg2021.herokuapp.com/fivei/${projId}`)
			.then((res) => {
				// console.log(res);
				const quesData = res.data.data?.[0]?.questions || [];
				const demoURLData = res.data.data?.[0]?.demoURL;
				setQues(quesData);
				setDemoURL(demoURLData);
				setPrevQes(quesData);
				setPrevDemoURL(demoURLData);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleProjectSubmit = () => {
		setAlert(false);
		saveCurrentChanges();
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

	const handleImageUpload = (e) => {
		if (e.target.files[0]) {
			const imageFile = e.target.files[0];
			console.log(imageFile);
			const imageId = e.target.name;
			const uploadTask = storage
				.ref(`fiveiMedia/${projId}/${imageId}`)
				.put(imageFile);
			uploadTask.on(
				"state_changed",
				(snapshot) => {},
				(error) => {
					console.log(error);
				},
				() => {
					storage
						.ref(`fiveiMedia/${projId}`)
						.child(imageId)
						.getDownloadURL()
						.then((url) => {
							console.log(url);
							setURLs(imageId, url);
						})
						.catch((err) => {
							console.log(err);
						});
				}
			);
		}
	};

	const arr = [
		{
			val: 1,
			label: "1) Identify",
		},
		{
			val: 2,
			label: "2) investigation",
		},
		{
			val: 3,
			label: "3) Ideation",
		},
		{
			val: 4,
			label: "4) Implementation",
		},
		{
			val: 5,
			label: "5) Inform",
		},
	];

	const [openSnackbar, setOpen] = useState(false);
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};
	const [openAlert, setAlert] = useState(false);

	return (
		<Container component="main" className={classes.root}>
			<CssBaseline />
			{access && (
				<Grid className={classes.saveBtn}>
					<Button
						color="primary"
						variant="contained"
						onClick={saveCurrentChanges}
					>
						Save Current Changes
					</Button>
					<Button variant="contained" onClick={cancelCurrentChanges}>
						Cancel Current Changes
					</Button>
				</Grid>
			)}
			{arr.map((item) => {
				const ques = questions && questions.filter((q) => q.stage === item.val);
				return (
					<div key={item.label} className={classes.stageItem}>
						<StageItem
							questions={ques}
							label={item.label}
							stage={item.val}
							access={access}
							handleChange={handleChange}
							handleImageUpload={handleImageUpload}
						/>
					</div>
				);
			})}
			<Grid
				container
				style={{
					display: "flex",
					justifyContent: "space-around",
					alignItems: "center",
					paddingBottom: "30px",
				}}
			>
				<Typography component="h5" variant="h6">
					Paste Project Demo Link(Optional)
				</Typography>
				<TextField
					inputProps={{ readOnly: access ? false : true }}
					multiline
					rows={2}
					type="url"
					color="black"
					fullWidth
					placeholder="Project Demo URL"
					variant="outlined"
					label="Project Demo URL"
					value={demoURL}
					onChange={(e) => setDemoURL(e.target.value)}
				/>
			</Grid>
			{access && (
				<Grid className={classes.projectSubmitBtn}>
					<Button
						onClick={saveCurrentChanges}
						variant="contained"
						color="primary"
					>
						Save Changes
					</Button>
					<Button
						onClick={() => setAlert(true)}
						variant="contained"
						color="primary"
					>
						Save & Submit Project
					</Button>
				</Grid>
			)}
			<Snackbar
				open={openSnackbar}
				autoHideDuration={2000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity="success">
					Changes Successfully Saved!
				</Alert>
			</Snackbar>
			<Dialog
				open={openAlert}
				TransitionComponent={Transition}
				keepMounted
				onClose={() => setAlert(false)}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">
					{`You can only submit project once. Please Confirm to submit this project!`}
				</DialogTitle>
				<DialogActions>
					<Button onClick={() => setAlert(false)} color="primary">
						Cancel
					</Button>
					<Button onClick={handleProjectSubmit} color="primary">
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
};

function StageItem({
	stage,
	label,
	questions,
	access,
	handleChange,
	handleImageUpload,
}) {
	const classes = useStyles();
	const [editable, toggle] = useState(false);

	const ques = questions && questions.filter((q) => q.type === "text");
	const images = questions && questions.filter((q) => q.type === "image");
	const videos = questions && questions.filter((q) => q.type === "video");

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
					{ques?.map((q) => {
						return (
							<Grid item xs={12} className={classes.qItem} key={q.id}>
								<TextField
									name={q.id}
									id={q.id}
									value={q.ans}
									onChange={(e) => handleChange(e)}
									label={q.text}
									variant="outlined"
									autoComplete="off"
									required
									fullWidth
									multiline
									rows={5}
									inputProps={{ readOnly: editable && access ? false : true }}
								/>
							</Grid>
						);
					})}
					{images?.map((q) => {
						return (
							<Grid
								item
								xs={12}
								className={classes.qItem}
								key={q.id}
								direction="column"
							>
								<Typography>{q.text}</Typography>
								{access && (
									<Input
										accept="image/*"
										style={{ display: "none" }}
										name={q.id}
										id={q.id}
										type="file"
										onChange={handleImageUpload}
									/>
								)}
								{!q.url && (
									<label htmlFor={q.id}>
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
											{!q.url && (
												<span>
													<PhotoCamera /> Upload Image
												</span>
											)}
										</IconButton>
									</label>
								)}
								{q.url && (
									<Avatar
										variant="square"
										src={q.url}
										style={{ height: "400px", width: "400px" }}
									/>
								)}
								{access && q.url && (
									<>
										<Input
											accept="image/*"
											style={{ display: "none" }}
											name={q.id}
											id={q.id}
											type="file"
											onChange={handleImageUpload}
										/>
										<label htmlFor={q.id}>
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
						);
					})}
					{videos?.map((q) => {
						return (
							<Grid
								item
								xs={12}
								className={classes.qItem}
								key={q.id}
								direction="column"
							>
								<Typography>{q.text}</Typography>
								{access && (
									<Input
										accept="video/*"
										style={{ display: "none" }}
										name={q.id}
										id={q.id}
										type="file"
										onChange={handleImageUpload}
									/>
								)}
								{!q.url && (
									<label htmlFor={q.id}>
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
											{!q.url && (
												<span>
													<MovieIcon /> Upload Video
												</span>
											)}
										</IconButton>
									</label>
								)}
								{q.url && (
									<ReactPlayer
										height="400px"
										width="500px"
										url={q.url}
										controls={true}
										pip={true}
									/>
								)}
								{access && q.url && (
									<>
										<Input
											accept="video/*"
											style={{ display: "none" }}
											name={q.id}
											id={q.id}
											type="file"
											onChange={handleImageUpload}
										/>
										<label htmlFor={q.id}>
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
						);
					})}
				</form>
			</Container>
		</>
	);
}
