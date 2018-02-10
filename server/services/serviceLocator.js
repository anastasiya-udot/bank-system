let UserService = require('./userService');

class ServiceLocator {
    constructor() {
        this._services = {};

        this._services[UserService.serviceName] = UserService;
    }

    get(name) {
        let service = his._services['name'];

        if (!service) {
            throw Error(`No service ${name} found`);
        }

        return service;
    }
}

module.exports = new ServiceLocator();