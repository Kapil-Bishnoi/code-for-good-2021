import React, { useEffect, useState } from "react";
import { fire } from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		"& > * + *": {
			marginTop: theme.spacing(2),
		},
	},
}));

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const classes = useStyles();
	const [loading, setLoading] = useState(true);
	const [firebaseUser, setFirebaseUser] = useState(null);

	useEffect(() => {
		fire.auth().onAuthStateChanged((user) => {
			console.log(user);
			setFirebaseUser(user);
			setLoading(false);
		});
	}, []);

	if (loading === true) {
		return (
			<div className={classes.root}>
				<LinearProgress />
				<LinearProgress color="secondary" />
			</div>
		);
	}
	return (
		<AuthContext.Provider value={{ firebaseUser }}>
			{children}
		</AuthContext.Provider>
	);
};
