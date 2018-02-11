let dictionarySchema = require('./dictionarySchema');
let constants = require('../../../common/constants');
const _ = require('lodash');

module.exports = function(mongoose) {
    let Dictionary = dictionarySchema(mongoose);
    let schema = _.mapValues(constants.USER_SCHEMA, (value, key) => {
        let type;

        switch (value.type) {
            case constants.USER_SCHEMA_TYPES.STRING: type = String; break;
            case constants.USER_SCHEMA_TYPES.BOOLEAN: type = Boolean; break;
            case constants.USER_SCHEMA_TYPES.NUMBER: type = Number; break;
            case constants.USER_SCHEMA_TYPES.DICTIONARY: type = Dictionary; break;
            case constants.USER_SCHEMA_TYPES.DATE: type = Date; break;
            default: type = String;
        }

        return {
            type: type,
            required: value.required,
            unique: value.unique
        };
    });

    return new mongoose.Schema(schema);
};