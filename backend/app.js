const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// import routes
const studentsRoute = require("./src/routes/students");
const mentorsRoute = require("./src/routes/mentors");
const evaluatorsRoute = require("./src/routes/evaluators");
const projectsRoute = require("./src/routes/project");
const fiveIRoute = require("./src/routes/5Istages");
const roleRoute = require("./src/routes/role");
const profileRoute = require("./src/routes/profileUpload");
const sendResponse = require("./src/lib/response");

const app = express();

// configure the mongodb database credentials
require("dotenv").config();

// connect to mongoDB database
require("./initDB")();

// middlewares
app.use(cors());
app.use(bodyParser.json());

// routes
app.use("/students", studentsRoute);
app.use("/evaluators", evaluatorsRoute);
app.use("/mentors", mentorsRoute);
app.use("/projects", projectsRoute);
app.use("/fivei", fiveIRoute);
app.use("/role", roleRoute);
app.use("/profile", profileRoute);

// base endpoint
app.get("/", (req, res) => {
	res.send("starting with backend for proejct!");
});

// listening to port
const PORT = process.env.PORT || 7600;
app.listen(PORT, () => {
	console.log("server is running on port", PORT);
});
