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
import { CreateProject } from "./components/CreateProject";
import { Profile } from "./components/Profile";
import { Projects } from "./components/Projects";
import { Project5I } from "./components/Project5I";
import { SelectProjects } from "./components/SelectProjects";

function App() {
	const { firebaseUser } = useContext(AuthContext);
	const role = localStorage.getItem("role");
	console.log(role);

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
					{role === "student" && (
						<Route
							exact
							path="/createproject"
							component={() => <CreateProject />}
						/>
					)}
					{role !== "student" && (
						<Route
							exact
							path="/selectprojects"
							component={() => <SelectProjects />}
						/>
					)}
					<Route
						exact
						path="/projects/:project_id"
						component={() => <Project5I />}
					/>
					<Route exact path="/projects" component={() => <Projects />} />
					<Route exact path="/profile" component={() => <Profile />} />
					{/* <Redirect to="/home" /> */}
				</Switch>
			</div>
		);
	}
}

export default App;
