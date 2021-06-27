import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Avatar, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
const useStyles = makeStyles((theme) => ({
	root: {
		width: 300,
		display: "flex",
		flexDirection: "column",
		"&:hover": {
			cursor: "pointer",
		},
        margin: theme.spacing(2),
	},
	profileImage: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: theme.spacing(1),
	},
	profileAvatar: {
		height: theme.spacing(14),
		width: theme.spacing(14),
	},
	name: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		textDecoration: "bold",
		marginBottom: theme.spacing(1),
		overflow: "hidden",
	},
	email: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		color: "grey",
		marginBottom: theme.spacing(1),
		overflow: "hidden",
	},
	school: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		color: "grey",
		marginBottom: theme.spacing(2),
		overflow: "hidden",
	},
}));

export const TeamCard = ({ member }) => {
	const classes = useStyles();

	return (
		<Card raised className={classes.root} >
			<Grid className={classes.profileImage} item xs={12}>
				<Avatar
					className={classes.profileAvatar}
					alt="profile"
					src="https://scontent-del1-1.xx.fbcdn.net/v/t1.6435-9/138997864_842154576352818_1406178736804240892_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=FgDVRvQC6BMAX-VZ-Fk&_nc_ht=scontent-del1-1.xx&oh=6f9293b62b81210291fa79207fcb52fb&oe=60DCF6DB"
				/>
			</Grid>
			<Grid item xs={12} className={classes.name}>
				<Typography component="h4" variant="h5">
					{member.fullName}
				</Typography>
			</Grid>
			<Grid item xs={12} className={classes.email}>
				<Typography component="h5" variant="h6">
					{member.emailId}
				</Typography>
			</Grid>
			<Grid item xs={12} className={classes.school}>
				<Typography component="p" variant="body2">
					<span>School: </span>
					{member.schoolName}
				</Typography>
			</Grid>
		</Card>
	);
};
