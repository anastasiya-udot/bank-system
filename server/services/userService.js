let BaseService = require('./baseService');

class UserService extends BaseService {

    constructor() {
        super(...arguments);
        this.model = global.models.User;
    }
}

UserService.serviceName = 'user';


module.exports = UserService;