import React, { useEffect, useState } from "react";
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
import { fire } from "../firebase";
import axios from "axios";

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

export const HeaderAuth = () => {
	const classes = useStyles();
	const [optionSwitch, toggleOptionSwitch] = React.useState(null);
	const logoURL =
		"https://challenge.balajanaagraha.org/_nuxt/static/bja-html-ui/assets/img/LogoHorizontal.png";
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const history = useHistory();
	const role = localStorage.getItem("role");
	console.log(role);

	const handleMenu = (event) => {
		toggleOptionSwitch(event.currentTarget);
	};

	const handleButtonClick = (pathURL) => {
		history.push(pathURL);
		toggleOptionSwitch(null);
	};

	const firebaseLogout = () => {
		fire.auth().signOut();
		localStorage.removeItem("userId");
	};

	const [user, setUser] = useState(null);
	console.log(user);

	useEffect(() => {
		const userId = localStorage.getItem("userId");
		const userRole = localStorage.getItem("role");
		axios
			.get(`https://cfg2021.herokuapp.com/${userRole}s/${userId}`)
			.then((res) => {
				// console.log(res);
				const data = res.data.data;
				if (data !== null && data.length !== 0) {
					setUser(data[0]);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

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
								{role === "student" && (
									<MenuItem onClick={() => handleButtonClick("/createproject")}>
										Create/Join Project
									</MenuItem>
								)}
								{role !== "student" && (
									<MenuItem
										onClick={() => handleButtonClick("/selectprojects")}
									>
										Select Projects
									</MenuItem>
								)}
								<MenuItem onClick={() => handleButtonClick("/projects")}>
									Projects
								</MenuItem>
								<MenuItem onClick={() => handleButtonClick("/profile")}>
									Profile
								</MenuItem>
								<MenuItem onClick={() => firebaseLogout()}>Logout</MenuItem>
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
							{role === "student" && (
								<Button
									variant="contained"
									onClick={() => handleButtonClick("/createproject")}
									className={classes.headerItem}
								>
									Create/Join Project
								</Button>
							)}
							{role !== "student" && (
								<Button
									variant="contained"
									onClick={() => handleButtonClick("/selectprojects")}
									className={classes.headerItem}
								>
									Select Projects
								</Button>
							)}
							<Button
								variant="contained"
								onClick={() => handleButtonClick("/projects")}
								className={classes.headerItem}
							>
								Projects
							</Button>
							<Button
								variant="contained"
								onClick={() => handleButtonClick("/profile")}
								className={classes.headerItem}
							>
								Profile
							</Button>
							<Button
								variant="contained"
								onClick={() => firebaseLogout()}
								className={classes.headerItem}
							>
								Logout
							</Button>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};
