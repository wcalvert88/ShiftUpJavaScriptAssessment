const express = require('express');
const app= express();
const mysql = require('mysql');
const path = require('path');
const boydParser = require('body-parser');
const index = require('./routes/index');

// Choose port to use
var port = process.env.port || 3000;

// Sets the common folder for everything to do with views
app.set('views', path.join(__dirname, 'views'));

// view engine set up for ejs
app.set('view engine', 'ejs');

// Use middleware that can analyze the json files
app.use(bodyParser.json());


// Sets the path for all static files like CSS/JS files
app.use(express.static(path.join(__dirname, 'public')));

// Set main route for the app
app.use('/', index);

module.exports = app;