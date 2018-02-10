const statuses = require('statuses');

class ServerError extends Error {
	constructor(message, httpCode) {
		if (Number.isInteger(message)) {
			httpCode = message;
			message = statuses[httpCode];
		}

		super(message);
		this.httpCode = httpCode ? httpCode : 500;
	}

	get code() {
		return this.httpCode;
	}

	apiError() {
		return {
			code: this.httpCode,
			message: this.message,
			data: this.data
		};
	}

	debugApiError() {
		return {
			code: this.httpCode,
			message: this.message,
			stack: this.stack,
			error: this.error,
			data: this.data
		};
	}


}

module.exports = ServerError;