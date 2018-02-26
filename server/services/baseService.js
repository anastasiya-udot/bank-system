let ServerError = require('../utils/serverError');
const async = require('async')

class BaseService {

    getAll(next) {
        this.Model.find((err, items) => {
            if (err) {
                next(new ServerError(`${this._serviceName}: ${err.message})`, 500));
                return;
            }

            if (this.deserialize) {
                items = items.map(item => this.deserialize(item));
            }

            next(null, items);
        });
    }

    getById(id, next) {
        this.Model.findById(id, (err, item) => {
            if (err) {
                return next(err);
            }

            if (!item) {
                return next(new ServerError(`No item with id ${id}`, 400));
            }

            next(null, item);
        });
    }

    updateItem(item, data, next) {
        if (this.serialize) {
            data = this.serialize(data);
        }
        this.Model.update({ _id: item._id }, data, err => {
            if (err) {
                return next(err);
            }

            next();
        })
    }

    _remove(item, next) {
        this.Model.remove({ _id: item._id }, err => {
            if (err) {
                return next(err);
            }
            next();
        })
    }

    delete(id, next) {
        async.waterfall([
            next => this.getById(id, next),
            (user, next) => this._remove(user, next)
        ], next);
    }

    getBy(attrs, next) {
        this.Model.find(attrs, (err, items) => {
            if (err) {
                next(new ServerError(`${this._serviceName}: ${err.message})`, 500));
                return;
            }

            next(null, items);
        })
    }


}

module.exports = BaseService;