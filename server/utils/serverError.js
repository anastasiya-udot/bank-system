const statuses = require('statuses');

class ServerError extends Error {
	constructor(message, httpCode, attr) {
		if (Number.isInteger(message)) {
			httpCode = message;
			message = statuses[httpCode];
		}

		super(...arguments);
		this.httpCode = httpCode ? httpCode : 500;
		this.attr = attr;
	}

}

module.exports = ServerError;