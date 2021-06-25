import React, { useContext } from "react";
import "./CSS/App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { SignupEvaluator } from "./components/SignupEvaluator";
import { SignupMentor } from "./components/SignupMentor";
import { SignupStudent } from "./components/SignupStudent";
import { Login } from "./components/Login";
import { AuthContext } from "./context/Auth";
import { HeaderAuth } from "./components/HeaderAuth";

function App() {
	const { firebaseUser } = useContext(AuthContext);

	if (!firebaseUser) {
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
					<Route
						exact
						path="/signup/mentor"
						component={() => <SignupMentor />}
					/>
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
	} else {
		return (
			<div className="App">
				<HeaderAuth />
				<Switch>
					<Route exact path="/home" component={() => <Home />} />
					<Route exact path="/createproject" component={() => <Home />} />
					<Route exact path="/projects" component={() => <Home />} />
					<Route exact path="/profile" component={() => <Home />} />
					<Redirect to="/home" />
				</Switch>
			</div>
		);
	}
}

export default App;
