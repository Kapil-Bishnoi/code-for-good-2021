import React from "react";
import "./CSS/App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { SignupEvaluator } from "./components/SignupEvaluator";
import { SignupMentor } from "./components/SignupMentor";
import { SignupStudent } from "./components/SignupStudent";
import { Login } from "./components/Login";

function App() {
	return (
		<div className="App">
			<Header />
			<Switch>
				<Route exact path="/home" component={() => <Home />} />
				<Route
					exact
					path="/signup/student"
					component={() => <SignupStudent />}
				/>
				<Route exact path="/signup/mentor" component={() => <SignupMentor />} />
				<Route
					exact
					path="/signup/evaluator"
					component={() => <SignupEvaluator />}
				/>
				<Route exact path="/login" component={() => <Login />} />
				<Redirect to="/home" />
			</Switch>
		</div>
	);
}

export default App;
