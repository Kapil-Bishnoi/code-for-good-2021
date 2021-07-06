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
	saveBtn: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-around",
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
}));

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
			.request(`http://localhost:7600/fivei/savechanges/${projId}`, {
				method: "POST",
				data: JSON.stringify(updatedProject),
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
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

	return (
		<Container component="main" className={classes.root}>
			<CssBaseline />
			{access && (
				<Grid className={classes.saveBtn}>
					<Button color="primary" variant="contained" onClick={saveCurrentChanges}>
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
					paddingBottom:"30px"
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
					value={demoURL}
					onChange={(e) => setDemoURL(e.target.value)}
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

function StageItem({ stage, label, questions, access, handleChange }) {
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
									disabled={editable && access ? false : true}
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
										// onChange={handleImageSubmit}
									/>
								)}
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
										{q.url && <Avatar variant="square" src={q.url} />}
									</IconButton>
								</label>
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
										// onChange={handleImageSubmit}
									/>
								)}
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
										{q.url && <Avatar variant="square" src={q.url} />}
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
