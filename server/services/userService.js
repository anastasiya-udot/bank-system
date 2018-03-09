let BaseService = require('./baseService');
const constants = require('../../common/constants');
const schemas = require('../../common/schemas');
const _ = require('lodash');
const async = require('async');

let ServerError = require('../utils/serverError');

const userSchema = schemas.USER_SCHEMA;
const userSchemaTypes = constants.USER_SCHEMA_TYPES;

class UserService extends BaseService {

    constructor() {
        super(...arguments);
        this.Model = global.models.User;

        this._dictionaryItems = _.pickBy(userSchema, item => {
            return item.type === userSchemaTypes.DICTIONARY;
        });
    }

    serialize(data) {
        let serialized = _.omit(data, 'id');

        _.each(_.keys(userSchema), key => {
            let userItem = userSchema[key];
            let value = serialized[key];

            if (userItem.type === userSchemaTypes.DICTIONARY) {
                serialized[key] = {
                    name: serialized[key]
                }
            }

            if (userItem.type === userSchemaTypes.DATE) {
                serialized[key] = new Date(serialized[key]);
            }
        });

        return serialized;
    }
    
    deserialize(user) {
        let result = {};

        _.each(_.keys(userSchema), key => {
            let userItem = userSchema[key];
            let value = user[key];

            if (userItem.type === userSchemaTypes.DICTIONARY) {
                value = user[key].name;
            }

            if (userItem.type === userSchemaTypes.DATE) {
                value = user[key].valueOf();
            }

            result[key] = value;
        });

        result.id = user.id
        
        return result;
    }

    create(data, next) {
        async.waterfall([
            next => this.validateData(data, next),
            next => {
                let serializedData = this.serialize(data);
                let user = new this.Model(serializedData, next)

                user.save(err => {
                    if (err) {
                        return next(err);
                    }

                    next(null, this.deserialize(user));
                });
            },
        ], next);
    }

    update(id, data, next) {
        async.waterfall([
            next => this.validateData(data, next),
            next => this.getById(id, next),
            (user, next) => this.updateItem(user, data, next),
            next => this.getById(id, next)
        ], (err, user) => {
            if (err) {
                return next(err);
            }

            next(null, this.deserialize(user));
        });
    }

    validateData(data, next) {

        async.each(_.keys(userSchema), (key, next) => {
            let item = userSchema[key];
            let unique = {};

            if (item.required && data[key] === undefined) {
                return next(new ServerError(`${key} is required`, 400, key));
            }

            if (item.validate && !item.validate(data[key])) {
                return next(new ServerError(`${key} is invalid`, 400, key));
            }

            if (item.unique) {
                unique[key] = data[key];

                if (data.id) {
                    unique._id = {
                        $ne: data.id
                    }
                }

                this.getBy(unique, (err, users) => {
                    if (err) {
                        return next(err);
                    }

                    if (users && users.length) {
                        return next(new ServerError(`${key} is not unique`, 400, key));
                    }

                    next();
                });
                return;
            } 

            next();
            
        }, next);
    }
}

UserService.serviceName = 'user';

module.exports = UserService;