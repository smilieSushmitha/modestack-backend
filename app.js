const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { jwt } = require('./helpers/jwt');
const { errorHandler } = require('./helpers/error-handler');

// Import Creds
const mongo = require("./credentials/mongo");

// Create an Express App
const app = express();

// Imports for Routes
const articleRoutes = require("./routes/article");
const userRoutes = require("./routes/user")
// Handle MongoDB Connection
mongoose
    .connect(mongo.localConnString, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

// Use body-parser to parse incoming reuests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Use Cors to avoid annoying CORS Errors
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// Set up API Routes
app.use("/api/v1/articles", articleRoutes);
app.use("/api/v1/user", userRoutes);

// global error handler
app.use(errorHandler);

module.exports = app;