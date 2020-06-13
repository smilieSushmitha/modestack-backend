var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
// [SH] Require Passport
var passport = require('passport');


require('./config/passport')

// Import Creds
const mongo = require("./credentials/mongo");

// Create an Express App
const app = express();

// Imports for Routes
var routesApi = require('./api/routes/index');
// Handle MongoDB Connection
mongoose
    .connect(mongo.localConnString, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// Use body-parser to parse incoming reuests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
//app.use(cookieParser());
// Use Cors to avoid annoying CORS Errors
app.use(cors());

// Set up API Routes
app.use(passport.initialize());
app.use('/api', routesApi);

// [SH] Catch unauthorised errors
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({
            "message": err.name + ": " + err.message
        });
    }
});

module.exports = app;