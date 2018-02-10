const path = require('path');
const express = require('express');
let router = express.Router();

module.exports = function(app) {
    router.get('/', function(req, res, next) {
		  res.sendFile('index.html', { root: path.join(__dirname, '../../views') });
    });
    
    app.use('/', router);
};