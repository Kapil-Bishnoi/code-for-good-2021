import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	togglebtn: {
		borderBottomWidth: 2,
		borderBottomColor: "primary",
		borderBottomStyle: "solid",
		"&:hover": {
			backgroundColor: "#3c52b2",
			color: "#ffffff",
		},
	},
	togglebuttons: {
		marginBottom: "25px",
	},
}));

export const CreateProject = () => {
	const classes = useStyles();
	const [isJoinProject, setIsJoinProject] = React.useState(false);
	const initialUserInput = {
		projectName: "",
		projectDomain: "",
		description: "",
		projectId: "",
	};

	const [userInput, setUserInput] = React.useState(initialUserInput);
	const [errorMessages, setErrorMessages] = React.useState({
		projectName: "",
		projectDomain: "",
		projectId: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isValid()) {
			console.log(userInput);
			const newProject = {
				projectName: userInput.projectName,
				projectDomain: userInput.projectDomain,
				description: userInput.description,
			};
			const studentId = localStorage.getItem("userId");
			axios
				.request(`https://cfg2021.herokuapp.com/projects/create/${studentId}`, {
					method: "POST",
					data: JSON.stringify(newProject),
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
		}
	};

	const handleChange = (e) => {
		setUserInput({
			...userInput,
			[e.target.name]: e.target.value,
		});
	};

	const isValid = () => {
		if (!isJoinProject) {
			const errors = {};
			errors.projectDomain = userInput.projectDomain !== "" ? "" : "Required";
			errors.projectName = userInput.projectName !== "" ? "" : "Required";
			setErrorMessages({ ...errorMessages, ...errors });
			return Object.values(errors).every((item) => item === "");
		} else {
			const errors = {};
			errors.projectId = userInput.projectId !== "" ? "" : "Required";
			setErrorMessages({ ...errorMessages, ...errors });
			return Object.values(errors).every((item) => item === "");
		}
	};

	return (
		<Container component="main" maxWidth="sm">
			<CssBaseline />
			<div className={classes.paper}>
				<Grid container className={classes.togglebuttons}>
					<Grid item xs={6}>
						<Button
							fullWidth
							variant="text"
							color="primary"
							className={classes.togglebtn}
							onClick={() => setIsJoinProject(false)}
						>
							Create New Project
						</Button>
					</Grid>
					<Grid item xs={6}>
						<Button
							fullWidth
							variant="text"
							color="primary"
							className={classes.togglebtn}
							onClick={() => setIsJoinProject(true)}
						>
							Join Existing Project
						</Button>
					</Grid>
				</Grid>
				<Typography component="h1" variant="h5">
					{isJoinProject ? "Join Existing Project" : "Create New Project"}
				</Typography>
				{isJoinProject ? (
					<form className={classes.form} onSubmit={handleSubmit} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							value={userInput.projectId}
							onChange={handleChange}
							error={errorMessages.projectId ? true : false}
							helperText={errorMessages.projectId}
							fullWidth
							id="projectId"
							label="Project Id"
							name="projectId"
							autoComplete="off"
							autoFocus
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={handleSubmit}
						>
							Join
						</Button>
						<Grid container>
							<Grid item>
								<Link
									onClick={() => setIsJoinProject(false)}
									href="#"
									variant="body2"
								>
									{"Create a new project?"}
								</Link>
							</Grid>
						</Grid>
					</form>
				) : (
					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							value={userInput.projectName}
							onChange={handleChange}
							error={errorMessages.projectName ? true : false}
							helperText={errorMessages.projectName}
							fullWidth
							id="projectName"
							label="Project Name"
							name="projectName"
							autoComplete="off"
							autoFocus
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							value={userInput.projectDomain}
							onChange={handleChange}
							error={errorMessages.projectDomain ? true : false}
							helperText={errorMessages.projectDomain}
							fullWidth
							name="projectDomain"
							label="Project Domain"
							id="projectDomain"
							autoComplete="off"
						/>
						<TextField
							variant="outlined"
							margin="normal"
							fullWidth
							value={userInput.description}
							onChange={handleChange}
							name="description"
							label="Description"
							id="description"
							autoComplete="off"
							multiline
							rows="4"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={handleSubmit}
						>
							Create
						</Button>
						<Grid container>
							<Grid item>
								<Link
									onClick={() => setIsJoinProject(true)}
									href="#"
									variant="body2"
								>
									{"Join an existing project?"}
								</Link>
							</Grid>
						</Grid>
					</form>
				)}
			</div>
		</Container>
	);
};
