import React, { useEffect, useState } from "react";
import { fire } from "../firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
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
			<div style={{ display: "grid", placeContent: "center" }}>
				<h1>Loading...</h1>
			</div>
		);
	}
	return (
		<AuthContext.Provider value={{ firebaseUser }}>
			{children}
		</AuthContext.Provider>
	);
};
