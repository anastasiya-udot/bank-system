const mongoose = require('../server/libs/mongoose');
const async = require('async');
const Models = require('../server/models')(mongoose);
const nationalities = require('../sources/nationalities');
const cities = require('../sources/cities');
const disabilityTypes = require('../sources/disabilityTypes');
const maritalStatuses = require('../sources/maritalStatuses');

async.series([
    open,
   //createNationalities,
   //createDisabilityTypes,
   //createMaritalStatuses,
   //createCities
], () => {
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