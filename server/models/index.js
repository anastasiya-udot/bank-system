let schemas = require('./schemas');

module.exports = function(mongoose) {
    const Schemas = schemas(mongoose);

    return {
        User: mongoose.model('User', Schemas.User),
        MaritalStatus: mongoose.model('MaritalStatus', Schemas.Dictionary),
        Nationality: mongoose.model('Nationality', Schemas.Dictionary),
        City: mongoose.model('City', Schemas.Dictionary),
        Disability: mongoose.model('Disability', Schemas.Dictionary)
    }; 
};