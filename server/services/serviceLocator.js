let UserService = require('./userService');
let DictionaryService = require('./dictionaryService');
let DepositService = require('./depositService');
let CreditService = require('./creditService');
let AgreementService = require('./agreementsService');
let AccountService = require('./accountService');

class ServiceLocator {
    constructor() {
        this._services = {};

        this._services[UserService.serviceName] = new UserService();
        this._services[DictionaryService.serviceName] = new DictionaryService();
        this._services[DepositService.serviceName] = new DepositService();
        this._services[CreditService.serviceName] = new CreditService();
        this._services[AgreementService.serviceName] = new AgreementService();
        this._services[AccountService.serviceName] = new AccountService();
    }

    get(name) {
        let service = this._services[name];

        if (!service) {
            throw Error(`No service ${name} found`, 500);
        }

        return service;
    }
}

module.exports = new ServiceLocator();