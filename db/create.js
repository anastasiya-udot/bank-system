const mongoose = require('../server/libs/mongoose');
const async = require('async');
const Models = require('../server/models')(mongoose);
const nationalities = require('../sources/nationalities');
const cities = require('../sources/cities');
const disabilityTypes = require('../sources/disabilityTypes');
const maritalStatuses = require('../sources/maritalStatuses');
const depositPrograms = require('../sources/depositPrograms');
const creditPrograms = require('../sources/creditPrograms');
const constants = require('../common/constants');

async.series([
    open,
    createDepositPrograms,
    createCreditPrograms,
    createBDF
], (err) => {
    if (err) {
        throw err;
    }
    console.log(arguments);
    mongoose.disconnect();
});

function open(callback){
    mongoose.connection.on('open', callback);
}

function createNationalities(callback) {
    async.each(nationalities , function(name, callback){
        let nationality = new Models.Nationality({
            name: name
        });

        nationality.save(callback);
    }, callback);
}

function createCities(callback) {
    async.each(cities , function(name, callback){
        let city = new Models.City({
            name: name
        });

        city.save(callback);
    }, callback);
}

function createDisabilityTypes(callback) {
    async.each(disabilityTypes , function(name, callback){
        let disability = new Models.Disability({
            name: name
        });

        disability.save(callback);
    }, callback);
}

function createMaritalStatuses(callback) {
    async.each(maritalStatuses , function(name, callback){
        let status = new Models.MaritalStatus({
            name: name
        });

        status.save(callback);
    }, callback);
}

function createDepositPrograms(callback) {
    async.each(depositPrograms , function(program, callback){
        let depositProgram = new Models.DepositProgram(program);

        depositProgram.save(callback);
    }, callback);
}

function createCreditPrograms(callback) {
    async.each(creditPrograms, function(program, callback){
        let creditProgram = new Models.CreditProgram(program);

        creditProgram.save(callback);
    }, callback);
}

function createBDF(callback) {
    let bdfAccount = new Models.BdfAccount({
        number: `${constants.ACCOUNT_CODES.BDF}11111111111`,
        code: constants.ACCOUNT_CODES.BDF,
        name: 'Bank development fond',
        amount: 1000000000,
        currency: 'BYR'
    });

    bdfAccount.save(err => {
        console.log(err);
    });
}