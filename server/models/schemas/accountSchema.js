const schema = require('../../../common/schemas').ACCOUNT_SCHEMA;

module.exports = function(mongoose) {
    return new mongoose.Schema(schema);
};