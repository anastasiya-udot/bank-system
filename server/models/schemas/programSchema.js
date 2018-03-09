const constants = require('../../../common/constants');
const _ = require('lodash');

module.exports = function(mongoose, schema) {
    let mongooseSchema = _.mapValues(schema, (value, key) => {
        let type;

        switch (value.type) {
            case constants.PROGRAM_SCHEMA_TYPES.STRING: type = String; break;
            case constants.PROGRAM_SCHEMA_TYPES.BOOLEAN: type = Boolean; break;
            case constants.PROGRAM_SCHEMA_TYPES.NUMBER: type = Number; break;
            default: type = [String];
        }

        return {
            type: type,
            required: value.required,
            unique: value.unique
        };
    });

    return new mongoose.Schema(mongooseSchema);
};