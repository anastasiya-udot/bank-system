const ServerError = require('../utils/serverError');

class BaseService {

    getAll(next) {
        this.model.find((err, items) => {
            if (err) {
                next(new ServerError(`${this._serviceName}: ${err.message})`, 500));
                return;
            }

            next(null, items);
        });
    }
}

module.exports = BaseService;