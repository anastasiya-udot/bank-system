let AccountingEntryService = require('./accountingEntryService');
const schemas = require('../../common/schemas');

class CreditService extends AccountingEntryService {
    constructor() {
        super(...arguments);
        this.Program = global.models.CreditProgram;
        this.programSchema = schemas.CREDIT_PROGRAM_SCHEMA;
        this.Agreement = global.models.CreditAgreement;
    }
}

CreditService.serviceName = 'credits';

module.exports = CreditService;