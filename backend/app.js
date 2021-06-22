const express = require("express");

const app = express();

// configure the mongodb database credentials
require("dotenv").config();

// connect to mongoDB database
require("./initDB")();

app.get('/', (req,res) => {
    res.send("starting with backend for proejct!");
})

const PORT = process.env.PORT || 7600;
app.listen(PORT, () => {
	console.log("server is running on port", PORT);
});
