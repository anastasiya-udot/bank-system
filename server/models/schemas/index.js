let dictionarySchema = require('./dictionarySchema');
let userSchema = require('./userSchema');

module.exports = function(mongoose) {
    return {
        Dictionary: dictionarySchema(mongoose),
        User: userSchema(mongoose)
    };
};