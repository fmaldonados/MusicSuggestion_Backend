var express = require('express');
var bodyParser = require('body-parser');
var app = express = express();
var cors = require('cors');

//routes

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

module.exports = app;






