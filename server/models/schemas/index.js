let dictionarySchema = require('./dictionarySchema');
let userSchema = require('./userSchema');
const schemas = require('../../../common/schemas');
let programSchema = require('./programSchema');
let agreementSchema = require('./agreementSchema');
let accountSchema = require('./accountSchema');

module.exports = function(mongoose) {
    return {
        Dictionary: dictionarySchema(mongoose),
        User: userSchema(mongoose),
        DepositProgram: programSchema(mongoose, schemas.DEPOSIT_PROGRAM_SCHEMA),
        CreditProgram: programSchema(mongoose, schemas.CREDIT_PROGRAM_SCHEMA),
        Agreement: agreementSchema(mongoose),
        Account: accountSchema(mongoose)
    };
};