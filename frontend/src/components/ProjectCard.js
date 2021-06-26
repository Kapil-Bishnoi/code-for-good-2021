import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
});

export default function MediaCard() {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						Project Name
					</Typography>
					<Typography
						gutterBottom
						style={{ color: "grey" }}
						variant="h6"
						component="h4"
					>
						Project Domain
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						Lizards are a widespread group of squamate reptiles, with over 6,000
						species, ranging across all continents except Antarctica
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="small" variant="contained" color="primary">
					<FileCopyOutlinedIcon /> Copy Project Id
				</Button>
				<Button size="small" color="primary">
					Open
				</Button>
			</CardActions>
		</Card>
	);
}
