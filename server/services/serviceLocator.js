let UserService = require('./userService');
let DictionaryService = require('./dictionaryService');

class ServiceLocator {
    constructor() {
        this._services = {};

        this._services[UserService.serviceName] = new UserService();
        this._services[DictionaryService.serviceName] = new DictionaryService();
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