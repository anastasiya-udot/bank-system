
const path = require('path');

module.exports = function(app, router) {
	require(path.join(__dirname, 'rest', 'base.js'))(app, router);
	require(path.join(__dirname, 'rest', 'users.js'))(app, router);
}