const constants = require('./constants');
const validation = require('./validation');
const formatters = require('./formatters');

module.exports = {
    USER_SCHEMA: {
        name: {
            type: constants.USER_SCHEMA_TYPES.STRING,
            unique: false,
            required: true,
            show: true,
            validation: validation.name
        },
        surname: {
            type: constants.USER_SCHEMA_TYPES.STRING,
            unique: false,
            required: true,
            show: true,
            sortable: true,
            validation: validation.name
        },
        patronymic: {
            type: constants.USER_SCHEMA_TYPES.STRING,
            required: true,
            show: true,
            unique: false,
            validation: validation.name
        },
        birthdate: {
            type: constants.USER_SCHEMA_TYPES.DATE,
            unique: false,
            default: (new Date(2016, 9,  16)).valueOf(),
            required: true,
            show: true,
            formatter: formatters.date
        },
        serialType: {
            type: constants.USER_SCHEMA_TYPES.STRING,
            unique: false,
            required: true,
            show: false,
            validation: validation.serialType
        },
        serialNumber: {
            type: constants.USER_SCHEMA_TYPES.STRING,
            unique: true,
            required: true,
            show: true,
            validation: validation.serialNumber
        },
        idNumber: {
            type: constants.USER_SCHEMA_TYPES.STRING,
            unique: true,
            required: true,
            show: true,
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
            show: false,
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
            dictionaryType: constants.COLLECTIONS.CITIES.MONGOOSE_COLLECTION
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
            show: false,
            validation: validation.email
        },
        maritalStatus: {
            type: constants.USER_SCHEMA_TYPES.DICTIONARY,
            unique: false,
            required: true,
            show: false,
            default: constants.COLLECTIONS.MARITAL_STATUSES.ITEMS[0],
            dictionaryType: constants.COLLECTIONS.MARITAL_STATUSES.MONGOOSE_COLLECTION
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
            show: false,
            unique: false,
            default: constants.COLLECTIONS.NATIONALITIES.ITEMS[18],
            dictionaryType: constants.COLLECTIONS.NATIONALITIES.MONGOOSE_COLLECTION
        },
        disability: {
            type: constants.USER_SCHEMA_TYPES.DICTIONARY,
            required: true,
            show: false,
            unique: false,
            default: constants.COLLECTIONS.DISABILITY_TYPES.ITEMS[0],
            dictionaryType: constants.COLLECTIONS.DISABILITY_TYPES.MONGOOSE_COLLECTION
        },
        pensioner: {
            type: constants.USER_SCHEMA_TYPES.BOOLEAN,
            required: true,
            show: false,
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
    },
    DEPOSIT_PROGRAM_SCHEMA: {
        name: {
            type: constants.PROGRAM_SCHEMA_TYPES.STRING,
            required: true,
            show: false,
            unique: false
        },
        duration: {
            type: constants.PROGRAM_SCHEMA_TYPES.NUMBER,
            required: true,
            show: false,
            unique: false, 
            formatter: formatters.days
        },
        revocable: {
            type: constants.PROGRAM_SCHEMA_TYPES.BOOLEAN,
            required: true,
            show: false,
            unique: false,
            formatter: formatters.revocable
        },
        currencies: {
            type: [constants.PROGRAM_SCHEMA_TYPES.STRING],
            required: true,
            show: false,
            unique: false,
            formatter: formatters.currency
        },
        interestRate: {
            type: constants.PROGRAM_SCHEMA_TYPES.NUMBER,
            required: true,
            show: false,
            unique: false, 
            formatter: formatters.percent
        }
    },
    CREDIT_PROGRAM_SCHEMA: {
        name: {
            type: constants.PROGRAM_SCHEMA_TYPES.STRING,
            required: true,
            show: false,
            unique: false
        },
        duration: {
            type: constants.PROGRAM_SCHEMA_TYPES.NUMBER,
            required: true,
            show: false,
            unique: false, 
            formatter: formatters.days
        },
        annuityPayment: {
            type: constants.PROGRAM_SCHEMA_TYPES.BOOLEAN,
            required: true,
            show: false,
            unique: false,
            formatter: formatters.annuityPayment
        },
        currencies: {
            type: [constants.PROGRAM_SCHEMA_TYPES.STRING],
            required: true,
            show: false,
            unique: false,
            formatter: formatters.currency
        },
        interestRate: {
            type: constants.PROGRAM_SCHEMA_TYPES.NUMBER,
            required: true,
            show: false,
            unique: false, 
            formatter: formatters.percent
        }
    },
    AGREEMENTS_SCHEMA: {
        accountEntryId: {
            type: constants.AGREEMENT_SCHEMA_TYPES.STRING,
            required: true,
            unique: false
        },
        userId: {
            type: constants.AGREEMENT_SCHEMA_TYPES.STRING,
            required: true,
            unique: false
        },
        number: {
            type: constants.AGREEMENT_SCHEMA_TYPES.STRING,
            required: true,
            unique: false
        },
        currency: {
            type: constants.AGREEMENT_SCHEMA_TYPES.STRING,
            required: true,
            unique: false
        },
        programStartDate: {
            type: constants.AGREEMENT_SCHEMA_TYPES.DATE,
            required: true,
            unique: false
        },
        programEndDate: {
            type: constants.AGREEMENT_SCHEMA_TYPES.DATE,
            required: true,
            unique: false
        },
        sum: {
            type: constants.AGREEMENT_SCHEMA_TYPES.NUMBER,
            required: true,
            unique: false
        }
    },
    ACCOUNT_SCHEMA: {
        agreementId: {
            type: String,
            required: false,
            unique: false
        },
        number: {
            type: String,
            required: true,
            unique: true
        },
        code: {
            type: Number,
            required: true,
            unique: false
        },
        name: {
            type: String,
            required: true,
            unique: false
        },
        amount: {
            type: Number,
            required: true,
            unique: false
        },
        currency: {
            type: String,
            required: true,
            unique: false,
        },
        endDate: {
            type: Number,
            required: false,
            unique: false
        }
    }
}