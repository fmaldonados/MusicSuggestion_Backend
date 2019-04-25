var express = require('express');
var AuthenticationController = require('../Controllers/authentication');
var api = express.Router();

api.get('/login',AuthenticationController.SpotifyAuth);
api.get('/getToken',AuthenticationController.getToken);


module.exports = api;