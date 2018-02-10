
const path = require('path');

module.exports = function(app) {
	let baseDir = path.join(__dirname, 'rest');

	require(path.join(baseDir, 'base.js'))(app);
	require(path.join(baseDir, 'users.js'))(app);
}