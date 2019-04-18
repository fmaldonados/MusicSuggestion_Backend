var express = require('express');
var AuthenticationController = require('../Controllers/authentication');
var api = express.Router();

api.get('/login',AuthenticationController.SpotifyAuth);

module.exports = api;