import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {
	Divider,
	Dialog,
	DialogActions,
	DialogTitle,
	Slide,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: 345,
		height: 345,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		margin: theme.spacing(2),
	},
	card_header: {
		display: "flex",
		padding: theme.spacing(1),
		marginLeft: "auto",
	},
	cardContent: {
		height: "85%",
		overflow: "hidden",
	},
	description: {
		overflow: "hidden",
	},
	domain: {
		overflow: "hidden",
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export const ProjectCard = ({ proj, isActive }) => {
	const classes = useStyles();
	const history = useHistory();
	const role = localStorage.getItem("role");
	const [openSnackbar, setOpen] = React.useState(false);
	const [snackMsg, setMsg] = React.useState("");
	const [openAlert, setAlert] = React.useState(false);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	const handleProjCardClick = () => {
		if (role === "student" && !proj.isSubmited) {
			history.push({
				pathname: `/projects/${proj.projectId}`,
				state: proj,
			});
		}
	};

	const confirmLeave = () => {
		setAlert(false);
		const userId = localStorage.getItem("userId");
		if (role === "student" && !proj.isSubmited) {
			axios
				.request(
					`https://cfg2021.herokuapp.com/projects/leave/${userId}/${proj.projectId}`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin": "*",
						},
					}
				)
				.then((res) => {
					console.log(res);
					setMsg("Successfully Removed!");
					setOpen(true);
				})
				.catch((err) => {
					console.log(err);
				});
		} else if (role !== "student") {
			axios
				.request(
					`https://cfg2021.herokuapp.com/${role}s/leaveproject/${userId}/${proj.projectId}`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin": "*",
						},
					}
				)
				.then((res) => {
					console.log(res);
					setMsg("Successfully Removed!");
					setOpen(true);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<Card raised className={classes.root} key={proj.projectId}>
			{isActive && (
				<Grid className={classes.card_header}>
					<Button
						onClick={() => setAlert(true)}
						size="small"
						variant="contained"
					>
						Leave Project
					</Button>
				</Grid>
			)}
			<CardActionArea
				className={classes.cardContent}
				onClick={handleProjCardClick}
			>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{proj.projectName}
					</Typography>
					<Typography
						gutterBottom
						style={{ color: "grey" }}
						variant="h6"
						component="h4"
						className={classes.domain}
					>
						{proj.projectDomain}
					</Typography>
					<Typography
						className={classes.description}
						variant="body2"
						color="textSecondary"
						component="p"
					>
						{proj.description}
					</Typography>
				</CardContent>
			</CardActionArea>
			<Divider variant="middle" />
			<CardActions className={classes.cardFooter}>
				{role === "student" && !proj.isSubmited && (
					<Button
						size="small"
						variant="contained"
						color="primary"
						onClick={() => {
							navigator.clipboard.writeText(proj.projectId);
							setMsg("Project ID coppied!");
							setOpen(true);
						}}
					>
						<FileCopyOutlinedIcon /> Copy Project Id
					</Button>
				)}
				{role === "student" && proj.isSubmited && (
					<Button fullWidth size="medium" variant="contained" color="primary">
						View
					</Button>
				)}
				{role === "mentor" && (
					<Button fullWidth size="large" variant="contained" color="primary">
						View
					</Button>
				)}
				{role === "evaluator" && (
					<Button size="small" variant="contained" color="primary">
						{proj.isEvaluated ? "View" : "Evaluate"}
					</Button>
				)}
				{role === "student" && !proj.isSubmited && (
					<Button size="small" color="primary" onClick={handleProjCardClick}>
						Open
					</Button>
				)}
				{proj.isSubmited && proj.isEvaluated && (
					<Typography component="h4" variant="h6">
						Score: <span style={{ color: "#3c52b2" }}>{proj.score}</span>
					</Typography>
				)}
				{proj.isSubmited && !proj.isEvaluated && (
					<Typography style={{ color: "tomato" }} component="p" variant="body2">
						Evaluation Pending
					</Typography>
				)}
			</CardActions>
			<Dialog
				open={openAlert}
				TransitionComponent={Transition}
				keepMounted
				onClose={() => setAlert(false)}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">
					{`Please Confirm to Leave this project: ${proj.projectName}`}
				</DialogTitle>
				<DialogActions>
					<Button onClick={() => setAlert(false)} color="primary">
						Cancel
					</Button>
					<Button onClick={() => confirmLeave()} color="primary">
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={1000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity="success">
					{snackMsg}
				</Alert>
			</Snackbar>
		</Card>
	);
};
