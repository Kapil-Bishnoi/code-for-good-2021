import React from "react";
import ReactDOM from "react-dom";
import "./CSS/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {AuthProvider} from "./context/Auth";

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
