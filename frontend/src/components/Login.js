import React from "react";
import {
	FormControlLabel,
	Checkbox,
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Link,
	Paper,
	Grid,
	Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { fire } from "../firebase";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
	},
	image: {
		backgroundImage:
			"url(https://challenge.balajanaagraha.org/_nuxt/static/bja-html-ui/assets/img/about2.jpg)",
		backgroundRepeat: "no-repeat",
		backgroundColor:
			theme.palette.type === "light"
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: "cover",
		backgroundPosition: "center",
	},
	paper: {
		margin: theme.spacing(8, 4),
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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	selectRole: {
		display: "flex",
		justifyContent: "space-evenly",
		marginTop: "20px",
	},
}));

export const Login = () => {
	const classes = useStyles();
	const history = useHistory();

	const initialUserInput = {
		emailId: "",
		password: "",
		role: "student",
	};

	const [userInput, setUserInput] = React.useState(initialUserInput);
	const [errorMessages, setErrorMessages] = React.useState(initialUserInput);

	const [userRole, setUserRole] = React.useState({
		student: true,
		mentor: false,
		evaluator: false,
	});

	const firebaseLogin = () => {
		fire
			.auth()
			.signInWithEmailAndPassword(
				userInput.emailId.trim(),
				userInput.password
			)
			.then((data) => {
				console.log(data);

				// get userId from firebase signing up
				const userId = data.user.uid;
				localStorage.setItem("userId", userId);
				localStorage.setItem('role', userInput.role);
				history.push('/home');
			})
			.catch((err) => {
				console.log(err);
				alert(err?.message);
			});
	};

	const handleLogin = (e) => {
		e.preventDefault();
		if (isValid() === true) {
			// if all the form inputs are valid
			console.log(userInput);

			// sign up using firebase auth
			firebaseLogin();

			// clearing form inputs
			setUserInput(initialUserInput);
		}
	};

	const handleInputChange = (e) => {
		setUserInput({
			...userInput,
			[e.target.name]: e.target.value,
		});
	};

	const isValid = () => {
		const errors = {};
		errors.emailId = userInput.emailId !== "" ? "" : "Required";
		errors.password = userInput.password !== "" ? "" : "Required";
		setErrorMessages({ ...errors });
		return Object.values(errors).every((item) => item === "");
	};

	return (
		<Grid container className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Login
					</Typography>
					<form className={classes.form} noValidate onSubmit={handleLogin}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							error={errorMessages.emailId === "" ? false : true}
							helperText={errorMessages.emailId}
							fullWidth
							id="emailId"
							label="Email Address"
							name="emailId"
							autoComplete="email"
							value={userInput.emailId}
							onChange={handleInputChange}
							autoFocus
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							error={errorMessages.password === "" ? false : true}
							helperText={errorMessages.password}
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							value={userInput.password}
							onChange={handleInputChange}
							autoComplete="current-password"
						/>
						<div className={classes.selectRole}>
							<FormControlLabel
								control={
									<Checkbox
										name="student"
										onClick={() => {
											setUserRole({
												student: true,
												mentor: false,
												evaluator: false,
											});
											setUserInput({
												...userInput,
												role: "student",
											});
										}}
										checked={userRole.student}
										color="primary"
									/>
								}
								label="Student"
							/>
							<FormControlLabel
								control={
									<Checkbox
										name="mentor"
										onClick={() => {
											setUserRole({
												student: false,
												mentor: true,
												evaluator: false,
											});
											setUserInput({
												...userInput,
												role: "mentor",
											});
										}}
										checked={userRole.mentor}
										color="primary"
									/>
								}
								label="Mentor"
							/>
							<FormControlLabel
								control={
									<Checkbox
										name="evaluator"
										onClick={() => {
											setUserRole({
												student: false,
												mentor: false,
												evaluator: true,
											});
											setUserInput({
												...userInput,
												role: "evaluator",
											});
										}}
										checked={userRole.evaluator}
										color="primary"
									/>
								}
								label="Evaluator"
							/>
						</div>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={handleLogin}
						>
							Log In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Grid>
		</Grid>
	);
};
