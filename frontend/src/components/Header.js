import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	left: {
		flexGrow: 1,
	},
	logo: {
		height: "50px",
		cursor: "pointer",
	},
	headerOptions: {
		display: "flex",
		justifyContent: "space-evenly",
	},
	headerItem: {
		margin: "10px",
	},
}));

export const Header = () => {
	const classes = useStyles();
	const [optionSwitch, toggleOptionSwitch] = React.useState(null);
	const [signupSwitch, toggleSignupSwitch] = React.useState(null);
	const logoURL =
		"https://challenge.balajanaagraha.org/_nuxt/static/bja-html-ui/assets/img/LogoHorizontal.png";
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
	const history = useHistory();

	const handleMenu = (event) => {
		toggleOptionSwitch(event.currentTarget);
	};

	const handleSignup = (event) => {
		toggleSignupSwitch(event.currentTarget);
	};

	const handleButtonClick = (pathURL) => {
		history.push(pathURL);
		toggleSignupSwitch(null);
		toggleOptionSwitch(null);
	};

	// const handleRegisterNewExcep = () => {
	// history.push('/ex/reg');
	// }

	// onClick = {handleRegisterNewExcep}

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<div className={classes.left}>
						<img className={classes.logo} src={logoURL} alt="logo" />
					</div>
					{isMobile ? (
						<div>
							<IconButton
								edge="start"
								className={classes.menuButton}
								color="inherit"
								aria-label="menu"
								onClick={handleMenu}
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={optionSwitch}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(optionSwitch)}
								onClose={() => toggleOptionSwitch(null)}
							>
								<MenuItem onClick={() => handleButtonClick("/home")}>
									Home
								</MenuItem>
								<MenuItem onClick={handleSignup}>Sign Up</MenuItem>
								<Menu
									id="menu-signup"
									anchorEl={signupSwitch}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(signupSwitch)}
									onClose={() => toggleSignupSwitch(null)}
								>
									<MenuItem
										onClick={() => handleButtonClick("/signup/student")}
									>
										SignUp as Student
									</MenuItem>
									<MenuItem onClick={() => handleButtonClick("/signup/mentor")}>
										SignUp as Mentor
									</MenuItem>
									<MenuItem
										onClick={() => handleButtonClick("/signup/evaluator")}
									>
										SignUp as Evaluator
									</MenuItem>
								</Menu>
								<MenuItem onClick={() => handleButtonClick("/login")}>
									Login
								</MenuItem>
							</Menu>
						</div>
					) : (
						<div className={classes.headerOptions}>
							<Button
								variant="contained"
								onClick={() => handleButtonClick("/home")}
								className={classes.headerItem}
							>
								HOME
							</Button>
							<Button
								variant="contained"
								onClick={handleSignup}
								className={classes.headerItem}
							>
								SIGN UP
							</Button>
							<Menu
								id="menu-signup"
								anchorEl={signupSwitch}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(signupSwitch)}
								onClose={() => toggleSignupSwitch(null)}
							>
								<MenuItem onClick={() => handleButtonClick("/signup/student")}>
									SignUp as Student
								</MenuItem>
								<MenuItem onClick={() => handleButtonClick("/signup/mentor")}>
									SignUp as Mentor
								</MenuItem>
								<MenuItem
									onClick={() => handleButtonClick("/signup/evaluator")}
								>
									SignUp as Evaluator
								</MenuItem>
							</Menu>
							<Button
								variant="contained"
								onClick={() => handleButtonClick("/login")}
								className={classes.headerItem}
							>
								LOGIN
							</Button>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};
