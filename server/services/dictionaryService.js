let BaseService = require('./baseService');

const constants = require('../../common/constants');
const collections = constants.COLLECTIONS;
const _ = require('lodash');

class DictionaryService extends BaseService {

    constructor() {
        super(...arguments);

        this.models = {};

        _.each(collections, collection => {
            this.models[collection.MONGOOSE_COLLECTION] = global.models[collection.MONGOOSE_MODEL];
        });
    }

    getByType(type, attrs, next) {
        this.Model = this.models[type];

        super.getBy.call(this, attrs, next);
    }
}

DictionaryService.serviceName = 'dictionaries';

module.exports = DictionaryService;