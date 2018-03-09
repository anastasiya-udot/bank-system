const constants = require('../../../common/constants');
const schemas = require('../../../common/schemas');
const _ = require('lodash');

module.exports = function(mongoose) {
    const ObjectId = mongoose.Types.ObjectId;
    let schema = _.mapValues(schemas.AGREEMENTS_SCHEMA, (value, key) => {
        let type;

        switch (value.type) {
            case constants.PROGRAM_SCHEMA_TYPES.STRING: type = String; break;
            case constants.PROGRAM_SCHEMA_TYPES.NUMBER: type = Number; break;
            case constants.PROGRAM_SCHEMA_TYPES.DATE: type = Date; break;
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