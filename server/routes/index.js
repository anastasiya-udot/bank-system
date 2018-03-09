
const path = require('path');

module.exports = function(app) {
	let baseDir = path.join(__dirname, 'rest');

	require(path.join(baseDir, 'base.js'))(app);
	require(path.join(baseDir, 'users.js'))(app);
	require(path.join(baseDir, 'deposit.js'))(app);
	require(path.join(baseDir, 'credit.js'))(app);
	require(path.join(baseDir, 'agreement.js'))(app);
	require(path.join(baseDir, 'account.js'))(app);
}