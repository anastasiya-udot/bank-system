const nationalities = require('../sources/nationalities');
const cities = require('../sources/cities');
const maritalStatuses = require('../sources/maritalStatuses');
const disabilityTypes = require('../sources/disabilityTypes');
const currencies = require('../sources/currencies');

let constants = {
    USER_SCHEMA_TYPES: {
        STRING: 'String',
        DATE: 'Date',
        DICTIONARY: 'Dictionary',
        BOOLEAN: 'Boolean',
        NUMBER: 'Number'
    },
    PROGRAM_SCHEMA_TYPES: {
        STRING: 'String',
        NUMBER: 'Number',
        BOOLEAN: 'Boolean'
    },
    ACCOUNT_ENTRY_TYPES: {
        DEPOSIT: 0,
        CREDIT: 1
    },
    AGREEMENT_SCHEMA_TYPES: {
        STRING: 'String',
        NUMBER: 'Number',
        DATE: 'Date'
    },
    ACCOUNT_TYPES: {
        BDF: 0,
        USER: 1,
        INTEREST: 2
    },
    ACCOUNT_CODES: {
        USER: 3014,
        BDF: 7327,
        INTEREST: 2400
    }
};

constants.COLLECTIONS = {
    NATIONALITIES: {
        MONGOOSE_COLLECTION: 'nationalities',
        ITEMS: nationalities,
        MONGOOSE_MODEL: 'Nationality'
    },
    
    CITIES: {
        MONGOOSE_COLLECTION: 'cities',
        ITEMS: cities,
        MONGOOSE_MODEL: 'City'
    },
    
    MARITAL_STATUSES: {
        MONGOOSE_COLLECTION: 'maritalStatuses',
        ITEMS: maritalStatuses,
        MONGOOSE_MODEL: 'MaritalStatus'
    },

    DISABILITY_TYPES: {
        MONGOOSE_COLLECTION: 'disabilityTypes',
        ITEMS: disabilityTypes,
        MONGOOSE_MODEL: 'Disability'    
    }
};

module.exports = constants;