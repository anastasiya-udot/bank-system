let AccountingEntryService = require('./accountingEntryService');
const schemas = require('../../common/schemas');

class DepositService extends AccountingEntryService {
    constructor() {
        super(...arguments);
        this.Program = global.models.DepositProgram;
        this.programSchema = schemas.DEPOSIT_PROGRAM_SCHEMA;
        this.Agreement = global.models.DepositAgreement
    }
}

DepositService.serviceName = 'deposits';

module.exports = DepositService;