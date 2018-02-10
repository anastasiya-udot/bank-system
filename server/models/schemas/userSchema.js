let dictionarySchema = require('./dictionarySchema');

module.exports = function(mongoose) {
    let Dictionary = dictionarySchema(mongoose);

    return new mongoose.Schema({
        name: {
            type: String,
            unique: false,
            required: true
        },
        surname: {
            type: String,
            unique: false,
            required: true
        },
        patronymic: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        birthdate: {
            type: Date,
            unique: false,
            required: true
        },
        serialType: {
            type: String,
            unique: false,
            required: true
        },
        serialNumber: {
            type: String,
            unique: false,
            required: true
        },
        idNumber: {
            type: String,
            unique: false,
            required: true
        },
        birthplace: {
            type: String,
            unique: false,
            required: true
        },
        actualResidenceCity: Dictionary,
        actualResidenceAddress: {
            type: String,
            unique: false,
            required: true
        },
        homePhoneNumber: String,
        mobilePhoneNumber: String,
        maritalStatus: {
            type: Dictionary,
            unique: false,
            required: true
        },
        workingPlace: String,
        position: String,
        nationality: {
            type: Dictionary,
            required: true,
            unique: false
        },
        disability: {
            type: Dictionary,
            required: true,
            unique: false
        },
        pensioner: {
            type: Boolean,
            required: true,
            unique: false
        },
        monthlyIncome: {
            type: Number,
            required: false,
            unique: false
        },
        warBound: {
            type: Boolean,
            reuired: true,
            unique: false
        }
    });
};