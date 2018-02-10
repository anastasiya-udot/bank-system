const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('./libs/mongoose')

require('./middlewares/base')(app);

global.models = require('./models')(mongoose);
global.serviceLocator = require('./services/serviceLocator');

require('./routes')(app, router);

app.use('/public', express.static(__dirname + '../public'));

app.use((req, res, next) => {
	const err = new Error('Not Found');

	err.status = 404;
	next(err);
});

app.use((err, req, res) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;