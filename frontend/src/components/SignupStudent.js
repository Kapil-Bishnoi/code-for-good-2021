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
		grade: false,
		age: false,
		stateAddress: "",
		districtAddress: "",
		schoolName: "",
	};

	const [userInput, setUserInput] = React.useState(initialUserInput);

	const handleInputChange = (e) => {
		setUserInput({
			...userInput,
			[e.target.name]: e.target.value,
		});
	};

	const handleStudentSignup = (e) => {
		e.preventDefault();
		console.log(userInput);
		setUserInput(initialUserInput);
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
