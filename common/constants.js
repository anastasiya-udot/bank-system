const nationalities = require('../sources/nationalities');
const cities = require('../sources/cities');
const maritalStatuses = require('../sources/maritalStatuses');
const disabilityTypes = require('../sources/disabilityTypes');

let validation = require('./validation');
let formatters = require('./formatters');

let constants = {
    USER_SCHEMA_TYPES: {
        STRING: 'String',
        DATE: 'Date',
        DICTIONARY: 'Dictionary',
        BOOLEAN: 'Boolean',
        NUMBER: 'Number'
    }
};

constants.COLLECTIONS = {
    NATIONALITIES: {
        NAME: 'nationalities',
        ITEMS: nationalities,
        MODEL: 'Nationality'
    },
    
    CITIES: {
        NAME: 'cities',
        ITEMS: cities,
        MODEL: 'City'
    },
    
    MARITAL_STATUSES: {
        NAME: 'maritalStatuses',
        ITEMS: maritalStatuses,
        MODEL: 'MaritalStatus'
    },

    DISABILITY_TYPES: {
        NAME: 'disabilityTypes',
        ITEMS: disabilityTypes,
        MODEL: 'Disability'
        
    }
};

constants.USER_SCHEMA = {
    name: {
        type: constants.USER_SCHEMA_TYPES.STRING,
        unique: false,
        required: true,
        validation: validation.name
    },
    surname: {
        type: constants.USER_SCHEMA_TYPES.STRING,
        unique: false,
        required: true,
        sortable: true,
        validation: validation.name
    },
    patronymic: {
        type: constants.USER_SCHEMA_TYPES.STRING,
        required: true,
        unique: false,
        validation: validation.name
    },
    birthdate: {
        type: constants.USER_SCHEMA_TYPES.DATE,
        unique: false,
        default: (new Date(2016, 9,  16)).valueOf(),
        required: true,
        formatter: formatters.date
    },
    serialType: {
        type: constants.USER_SCHEMA_TYPES.STRING,
        unique: false,
        required: true,
        validation: validation.serialType
    },
    serialNumber: {
        type: constants.USER_SCHEMA_TYPES.STRING,
        unique: true,
        required: true,
        validation: validation.serialNumber
    },
    idNumber: {
        type: constants.USER_SCHEMA_TYPES.STRING,
        unique: true,
        required: true,
        validation: validation.idNumber
    },
    passportIssuedBy: {
        type: constants.USER_SCHEMA_TYPES.STRING,
        unique: false,
        required: true
    },
    dateOfIssue: {
        type: constants.USER_SCHEMA_TYPES.DATE,
        default: (new Date(2016, 9,  16)).valueOf(),
        unique: false,
        required: true,
        formatter: formatters.date
    },
    birthplace: {
        type: constants.USER_SCHEMA_TYPES.STRING,
        unique: false,
        required: true
    },
    actualResidenceCity: {
        type: constants.USER_SCHEMA_TYPES.DICTIONARY,
        required: false,
        unique: false,
        default: constants.COLLECTIONS.CITIES.ITEMS[0],
        dictionaryType: constants.COLLECTIONS.CITIES.NAME
    },
    actualResidenceAddress: {
        type: constants.USER_SCHEMA_TYPES.STRING,
        unique: false,
        required: true
    },
    homePhoneNumber: {
        type: constants.USER_SCHEMA_TYPES.STRING,
        unique: false,
        required: false,
        validation: validation.phone
    },
    mobilePhoneNumber: {
        type: constants.USER_SCHEMA_TYPES.STRING,
        unique: false,
        required: false,
        validation: validation.phone
    },
    email: {
        type: constants.USER_SCHEMA_TYPES.STRING,
        unique: true,
        required: true,
        validation: validation.email
    },
    maritalStatus: {
        type: constants.USER_SCHEMA_TYPES.DICTIONARY,
        unique: false,
        required: true,
        default: constants.COLLECTIONS.MARITAL_STATUSES.ITEMS[0],
        dictionaryType: constants.COLLECTIONS.MARITAL_STATUSES.NAME
    },
    workingPlace: {
        type: constants.USER_SCHEMA_TYPES.STRING,
        unique: false,
        required: false
    },
    position: {
        type: constants.USER_SCHEMA_TYPES.STRING,
        unique: false,
        required: false
    },
    nationality: {
        type: constants.USER_SCHEMA_TYPES.DICTIONARY,
        required: true,
        unique: false,
        default: constants.COLLECTIONS.NATIONALITIES.ITEMS[18],
        dictionaryType: constants.COLLECTIONS.NATIONALITIES.NAME
    },
    disability: {
        type: constants.USER_SCHEMA_TYPES.DICTIONARY,
        required: true,
        unique: false,
        default: constants.COLLECTIONS.DISABILITY_TYPES.ITEMS[0],
        dictionaryType: constants.COLLECTIONS.DISABILITY_TYPES.NAME
    },
    pensioner: {
        type: constants.USER_SCHEMA_TYPES.BOOLEAN,
        required: true,
        unique: false,
        default: false
    },
    monthlyIncome: {
        type: constants.USER_SCHEMA_TYPES.NUMBER,
        required: false,
        unique: false,
        default: 10,
        min: 0,
        validation: validation.number
    },
    warBound: {
        type: constants.USER_SCHEMA_TYPES.BOOLEAN,
        reuired: true,
        unique: false,
        default: false
    }
};

module.exports = constants;