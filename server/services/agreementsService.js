let ServerError = require('../utils/serverError');
let BaseService = require('./baseService');
const schemas = require('../../common/schemas');
const async = require('async');
const constants = require('../../common/constants');
let _ = require('lodash');
var crypto = require('crypto');

class AgreementService extends BaseService {

    deserialize(agreement) {
        const keys = _.keys(schemas.AGREEMENTS_SCHEMA);
        let item = {};

        _.each(keys, key => {
            let schemaItem = schemas.AGREEMENTS_SCHEMA[key];
            let value = agreement[key];

            if (schemaItem.type === constants.AGREEMENT_SCHEMA_TYPES.DATE) {
                value = agreement[key].valueOf();
            }

            item[key] = value;
        });

        item.id = agreement.id;

        return item;

    }

    serialize(type, data) {
        const keys = _.keys(schemas.AGREEMENTS_SCHEMA);
        let item = {};

        _.each(keys, key => {
            let schemaItem = schemas.AGREEMENTS_SCHEMA[key];
            let value = data[key];

            if (schemaItem.type === constants.AGREEMENT_SCHEMA_TYPES.DATE) {
                value = new Date(data[key]);
            }

            if (key === 'number') {
                value = data[key] || parseInt(crypto.randomBytes(5).toString('hex'), 16);
            }
            item[key] = value;
        });

        return item;
    }

    _updateModel(type) {
        if (type === constants.ACCOUNT_ENTRY_TYPES.CREDIT) {
            this.Model = global.models.CreditAgreement;
        } else {
            this.Model = global.models.DepositAgreement;
        }
    }

    create(type, data, next) {
        this._updateModel(type);

        async.waterfall([
            next => {
                let serializedData = this.serialize(type, data);
                let agreement = this.Model(serializedData);

                agreement.save(err => {
                    if (err) {
                        return next(err);
                    }

                    global.serviceLocator.get('accounts').createAccounts(agreement, type);

                    next(null, this.deserialize(agreement));
                });
            }
        ], next);
    }

    getAllAgreements(type, next) {
        this._updateModel(type);
        this.getAll(next);
    }
}

AgreementService.serviceName = 'agreements';

module.exports = AgreementService;