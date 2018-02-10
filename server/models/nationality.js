const nationalitySchema = require('./schemas/nationalitySchema');

module.exports = mongoose.model('Nationality', nationalitySchema);