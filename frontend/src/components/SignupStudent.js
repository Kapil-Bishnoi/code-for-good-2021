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
import { fire } from "../firebase";
import axios from "axios";

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

export const SignupStudent = () => {
	const classes = useStyles();
	const history = useHistory();
	const initialUserInput = {
		fullName: "",
		emailId: "",
		password: "",
		confirmPassword: "",
		contactNumber: "",
		grade: "",
		age: "",
		stateAddress: "",
		districtAddress: "",
		schoolName: "",
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

	const postStudentUser = (studentUser) => {
		axios
			.request("https://cfg2021.herokuapp.com/students", {
				method: "POST",
				data: JSON.stringify(studentUser),
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

	const firebaseStudentSignup = () => {
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

				const studentUser = {
					studentId: userId,
					role: "student",
					fullName: userInput.fullName,
					emailId: userInput.emailId.trim(),
					contactNumber: userInput.contactNumber,
					grade: userInput.grade,
					age: userInput.age,
					stateAddress: userInput.stateAddress,
					districtAddress: userInput.districtAddress,
					schoolName: userInput.schoolName,
				};

				// post user in monogdb database
				postStudentUser(studentUser);
			})
			.catch((err) => {
				console.log(err);
				alert(err?.message);
			});
	};

	const handleStudentSignup = (e) => {
		e.preventDefault();

		if (isValid() === true) {
			// if all the form inputs are valid
			console.log(userInput);

			localStorage.setItem('role', 'student');

			// sign up using firebase auth
			firebaseStudentSignup();

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
		errors.grade = userInput.grade !== "" ? "" : "Required";
		errors.age = userInput.age !== "" ? "" : "Required";
		errors.districtAddress = userInput.districtAddress !== "" ? "" : "Required";
		errors.stateAddress = userInput.stateAddress !== "" ? "" : "Required";
		errors.schoolName = userInput.schoolName !== "" ? "" : "Required";
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
					Student Sign Up
				</Typography>
				<form
					className={classes.form}
					noValidate
					onSubmit={handleStudentSignup}
				>
					<Grid container spacing={4}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fname"
								name="fullName"
								value={userInput.fullName}
								onChange={handleInputChange}
								variant="outlined"
								required
								fullWidth
								error={errorMessages.fullName === "" ? false : true}
								helperText={errorMessages.fullName}
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
								error={errorMessages.password === "" ? false : true}
								helperText={errorMessages.password}
								name="password"
								value={userInput.password}
								onChange={handleInputChange}
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
								error={
									errorMessages.confirmPassword === "" &&
									errorMessages.passwordMatch === ""
										? false
										: true
								}
								helperText={
									errorMessages.password || errorMessages.passwordMatch
								}
								name="confirmPassword"
								value={userInput.confirmPassword}
								onChange={handleInputChange}
								label="Confirm Password"
								type="password"
								id="confirmPassword"
								autoComplete="off"
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								variant="outlined"
								fullWidth
								name="contactNumber"
								value={userInput.contactNumber}
								onChange={handleInputChange}
								label="Contact Number"
								type="number"
								id="contactNumber"
								autoComplete="cNumber"
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								variant="outlined"
								required
								fullWidth
								error={errorMessages.grade === "" ? false : true}
								helperText={errorMessages.grade}
								name="grade"
								value={userInput.grade}
								onChange={handleInputChange}
								label="Grade / Class"
								type="number"
								id="grade"
								autoComplete="off"
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								variant="outlined"
								required
								fullWidth
								error={errorMessages.age === "" ? false : true}
								helperText={errorMessages.age}
								name="age"
								value={userInput.age}
								onChange={handleInputChange}
								label="Age"
								type="number"
								id="age"
								autoComplete="off"
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								variant="outlined"
								required
								fullWidth
								error={errorMessages.stateAddress === "" ? false : true}
								helperText={errorMessages.stateAddress}
								name="stateAddress"
								value={userInput.stateAddress}
								onChange={handleInputChange}
								label="Address: State"
								type="text"
								id="stateAddress"
								autoComplete="off"
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								variant="outlined"
								required
								fullWidth
								error={errorMessages.districtAddress === "" ? false : true}
								helperText={errorMessages.districtAddress}
								name="districtAddress"
								value={userInput.districtAddress}
								onChange={handleInputChange}
								label="Address: District"
								type="text"
								id="districtAddress"
								autoComplete="off"
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								variant="outlined"
								required
								fullWidth
								error={errorMessages.schoolName === "" ? false : true}
								helperText={errorMessages.schoolName}
								name="schoolName"
								value={userInput.schoolName}
								onChange={handleInputChange}
								label="School Name"
								type="text"
								id="schoolName"
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
						onClick={handleStudentSignup}
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
