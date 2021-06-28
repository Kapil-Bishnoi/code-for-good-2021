import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Divider } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AddBoxIcon from "@material-ui/icons/AddBox";
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
	cardContent: {
		height: "75%",
		overflow: "hidden",
	},
	description: {
		overflow: "hidden",
	},
	domain: {
		overflow: "hidden",
	},
}));

export const SelectProjCard = ({ proj }) => {
	const classes = useStyles();
	const history = useHistory();
	const userRole = localStorage.getItem("role");
	const [openSnackbar, setOpen] = React.useState(false);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	const handleProjSelection = () => {
		const role = localStorage.getItem("role");
		const userId = localStorage.getItem("userId");
		if (role === "mentor") {
			axios
				.request(
					`https://cfg2021.herokuapp.com/mentors/selectproject/${userId}/${proj.projectId}`,
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
					setOpen(true);
				})
				.catch((err) => {
					console.log(err);
				});
		} else if (role === "evaluator") {
			axios
				.request(
					`https://cfg2021.herokuapp.com/evaluators/selectproject/${userId}/${proj.projectId}`,
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
					setOpen(true);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<Card raised className={classes.root}>
			<CardActionArea className={classes.cardContent}>
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
				{userRole === "mentor" ? (
					<Button
						size="small"
						variant="contained"
						color="primary"
						onClick={() => handleProjSelection()}
					>
						<AddBoxIcon /> Select For Mentoring
					</Button>
				) : (
					<Button
						size="small"
						variant="contained"
						color="primary"
						onClick={() => handleProjSelection()}
					>
						<AddBoxIcon /> Select For Evaluation
					</Button>
				)}
				<Snackbar
					open={openSnackbar}
					autoHideDuration={3000}
					onClose={handleClose}
				>
					<Alert onClose={handleClose} severity="success">
						{`${proj.projectName} is successfully added under your supervision`}
					</Alert>
				</Snackbar>
				<Typography style={{ color: "#3c52b2" }} component="p" variant="body2">
					Team Size: {proj.team.length}
				</Typography>
			</CardActions>
		</Card>
	);
};
