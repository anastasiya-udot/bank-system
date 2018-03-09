let ServerError = require('../utils/serverError');
let BaseService = require('./baseService');
const async = require('async');
let _ = require('lodash');

class AccountingEntryService extends BaseService {
    getAllPrograms(next) {
        this.Program.find((err, items) => {
            if (err) {
                next(new ServerError(`${err.message})`, 500));
                return;
            }

            items = items.map(item => this.deserializeProgram(item));

            next(null, items);
        });
    }
    
    getProgramById(id, next) {
        this.Program.findById(id, (err, item) => {
            if (err) {
                return next(err);
            }

            if (!item) {
                return next(new ServerError(`No program with id ${id}`, 400));
            }

            next(null, item);
        });
    }

    deserializeProgram(item) {
        let result = {};

        _.each(_.keys(this.programSchema), key => {
            let programItem = this.programSchema[key];
            let value = item[key];

            result[key] = value;
        });

        result.id = item.id;
        
        return result;
    }
}


module.exports = AccountingEntryService;