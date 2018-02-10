const mongoose = require('../../libs/mongoose');
const Schema = mongoose.Schema;

const citySchema = require('./cityShema');
const maritalStatusSchema = require('./maritalStatusSchema');
const nationalitySchema = require('./nationalitySchema');
const disabilitySchema = require('./disabilitySchema');

module.exports = new Schema({
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
    actualResidenceCity: citySchema,
    actualResidenceAddress: {
        type: String,
        unique: false,
        required: true
    },
    homePhoneNumber: String,
    mobilePhoneNumber: String,
    maritalStatus: {
        type: maritalStatus,
        unique: false,
        required: true
    },
    workingPlace: String,
    position: String,
    nationality: {
        type: nationalitySchema,
        required: true,
        unique: false
    },
    disability: {
        type: disabilitySchema,
        required: true,
        unique: false
    },
    pensioner: {
        type: Boolean,
        required: true,
        unique: false
    },
    warBound: {
        type: Boolean,
        reuired: true,
        unique: false
    }
});