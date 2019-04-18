var express = require('express');
var bodyParser = require('body-parser');
var app = express = express();
var cors = require('cors');

//import routes
var authentication = require('./Routes/authentication');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//routes
app.use('/api', authentication);



module.exports = app;






