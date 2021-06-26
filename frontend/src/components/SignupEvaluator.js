import React from "react";
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Link,
	Grid,
	Typography,
	Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import {fire} from '../firebase';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export const SignupEvaluator = () => {
	const classes = useStyles();
	const history = useHistory();
	const initialUserInput = {
		fullName: "",
		emailId: "",
		password: "",
		confirmPassword: "",
		contactNumber: "",
		designation: "",
	};

	const [userInput, setUserInput] = React.useState(initialUserInput);
	const [errorMessages, setErrorMessages] = React.useState({
		...initialUserInput,
		passwordMatch: "",
	});

	const handleInputChange = (e) => {
		setUserInput({
			...userInput,
			[e.target.name]: e.target.value,
		});
	};


	const postEvaluatorUser = (evaluatorUser) => {
		axios
			.request("https://cfg2021.herokuapp.com/evaluators", {
				method: "POST",
				data: JSON.stringify(evaluatorUser),
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			})
			.then((res) => {
				console.log(res);
				history.push('/home');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const firebaseEvaluatorSignup = () => {
		fire
			.auth()
			.createUserWithEmailAndPassword(
				userInput.emailId.trim(),
				userInput.password
			)
			.then((data) => {
				console.log(data);
				// get userId from firebase signing up
				const userId = data.user.uid;
				localStorage.setItem("userId", userId);

				const evaluatorUser = {
					evaluatorId: userId,
					role: "evaluator",
					fullName: userInput.fullName,
					emailId: userInput.emailId.trim(),
					contactNumber: userInput.contactNumber,
					designation: userInput.designation,
				};

				// post user in monogdb database
				postEvaluatorUser(evaluatorUser);
			})
			.catch((err) => {
				console.log(err);
				alert(err?.message);
			});
	};

	const handleEvaluatorSignup = (e) => {
		e.preventDefault();

		if (isValid() === true) {
			// if all the form inputs are valid
			console.log(userInput);
			localStorage.setItem('role', 'evaluator');
			// sign up using firebase auth
			firebaseEvaluatorSignup();

			// clearing form inputs
			setUserInput(initialUserInput);
		}
	};

	const isValid = () => {
		const errors = {};
		errors.fullName = userInput.fullName !== "" ? "" : "Required";
		errors.emailId = userInput.emailId !== "" ? "" : "Required";
		errors.password = userInput.password !== "" ? "" : "Required";
		errors.confirmPassword = userInput.confirmPassword !== "" ? "" : "Required";
		errors.designation = userInput.designation !== "" ? "" : "Required";
		errors.contactNumber = userInput.contactNumber !== "" ? "" : "Required";
		errors.passwordMatch =
			userInput.password === userInput.confirmPassword
				? ""
				: "Confirm password should match with password";
		setErrorMessages({ ...errors });
		return Object.values(errors).every((item) => item === "");
	};

	return (
		<Container component="main" maxWidth="md">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Evaluator Sign Up
				</Typography>
				<form
					className={classes.form}
					noValidate
					onSubmit={handleEvaluatorSignup}
				>
					<Grid container spacing={4}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fname"
								name="fullName"
								value={userInput.fullName}
								onChange={handleInputChange}
								error={errorMessages.fullName === "" ? false : true}
								helperText={errorMessages.fullName}
								variant="outlined"
								required
								fullWidth
								id="fullName"
								label="Full Name"
								autoFocus
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								error={errorMessages.emailId === "" ? false : true}
								helperText={errorMessages.emailId}
								id="emailId"
								label="Email Address"
								name="emailId"
								value={userInput.emailId}
								onChange={handleInputChange}
								autoComplete="email"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								value={userInput.password}
								onChange={handleInputChange}
								error={errorMessages.password === "" ? false : true}
								helperText={errorMessages.password}
								label="Password"
								type="password"
								id="password"
								autoComplete="off"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="confirmPassword"
								value={userInput.confirmPassword}
								onChange={handleInputChange}
								error={
									errorMessages.confirmPassword === "" &&
									errorMessages.passwordMatch === ""
										? false
										: true
								}
								helperText={
									errorMessages.password || errorMessages.passwordMatch
								}
								label="Confirm Password"
								type="password"
								id="confirmPassword"
								autoComplete="off"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								fullWidth
								required
								name="contactNumber"
								value={userInput.contactNumber}
								onChange={handleInputChange}
								error={errorMessages.contactNumber === "" ? false : true}
								helperText={errorMessages.contactNumber}
								label="Contact Number"
								type="number"
								id="contactNumber"
								autoComplete="cNumber"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="designation"
								value={userInput.designation}
								onChange={handleInputChange}
								error={errorMessages.designation === "" ? false : true}
								helperText={errorMessages.designation}
								label="Designation"
								type="text"
								id="designation"
								autoComplete="off"
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleEvaluatorSignup}
					>
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link
								onClick={() => history.push("/login")}
								href="#"
								variant="body2"
							>
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};
