import React from "react";
import "./CSS/App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import {SignUp} from "./components/SignUp";
import {Login} from "./components/Login";

function App() {
	return (
		<div className="App">
			<Header />
			<Switch>
				<Route exact path="/home" component={() => <Home />} />
				<Route exact path="/signup" component={() => <SignUp />} />
				<Route exact path="/login" component={() => <Login />} />
				<Redirect to="/home" />
			</Switch>
		</div>
	);
}

export default App;
