let schemas = require('./schemas');

module.exports = function(mongoose) {
    const Schemas = schemas(mongoose);

    return {
        User: mongoose.model('User', Schemas.User),
        MaritalStatus: mongoose.model('MaritalStatus', Schemas.Dictionary),
        Nationality: mongoose.model('Nationality', Schemas.Dictionary),
        City: mongoose.model('City', Schemas.Dictionary),
        Disability: mongoose.model('Disability', Schemas.Dictionary),

        DepositProgram: mongoose.model('DepositProgram', Schemas.DepositProgram),
        CreditProgram: mongoose.model('CreditProgram', Schemas.CreditProgram),

        DepositAgreement: mongoose.model('DepositAgreement', Schemas.Agreement),
        CreditAgreement: mongoose.model('CreditAgreement', Schemas.Agreement),

        BdfAccount: mongoose.model('BdfAccount', Schemas.Account),
        UserAccount: mongoose.model('UserAccount', Schemas.Account),
        InterestAccount: mongoose.model('InterestAccount', Schemas.Account),
    }; 
};