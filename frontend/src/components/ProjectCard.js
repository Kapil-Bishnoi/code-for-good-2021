import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Divider } from "@material-ui/core";
import { useHistory } from "react-router-dom";

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

export const ProjectCard = ({ proj }) => {
	const classes = useStyles();
	const history = useHistory();
	const role = localStorage.getItem("role");
	const [openSnackbar, setOpen] = React.useState(false);
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	const handleProjCardClick = () => {
		history.push({
			pathname: `/projects/${proj.projectId}`,
			state: proj,
		});
	};

	return (
		<Card raised className={classes.root} key={proj.projectId}>
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
				{role === "student" && (
					<>
						<Button
							size="small"
							variant="contained"
							color="primary"
							onClick={() => {
								navigator.clipboard.writeText(proj.projectId);
								setOpen(true);
							}}
						>
							<FileCopyOutlinedIcon /> Copy Project Id
						</Button>
						<Snackbar
							open={openSnackbar}
							autoHideDuration={1000}
							onClose={handleClose}
						>
							<Alert onClose={handleClose} severity="success">
								Project ID coppied!
							</Alert>
						</Snackbar>
					</>
				)}
				{role == "mentor" && (
					<Button fullWidth size="large" variant="contained" color="primary" >
						View
					</Button>
				)}
				{role == "evaluator" && (
					<Button size="small" variant="contained" color="primary" >
						{(proj.isEvaluated) ? "View": "Evaluate"}
					</Button>
				)}
				{role === "student" && (
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
		</Card>
	);
};
