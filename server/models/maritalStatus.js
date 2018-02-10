const maritalStatusSchema = require('./schemas/maritalStatusSchema');

module.exports = mongoose.model('MaritalStatus', maritalStatusSchema);