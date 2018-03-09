const express = require('express');
let router = express.Router();
const constants = require('../../../common/constants');
const async = require('async');
const _ = require('lodash');

module.exports = function(app) {

    router.get('/', (req, res, next) => {
        let agreementsService = global.serviceLocator.get('agreements');

        async.series([
            next => agreementsService.getAllAgreements(constants.ACCOUNT_ENTRY_TYPES.CREDIT, next),
            next => agreementsService.getAllAgreements(constants.ACCOUNT_ENTRY_TYPES.DEPOSIT, next)
        ], (err, results) => {
            if (err) {
                res.status(err.status || 500).send({ message: err.message });
                return;
            }

           res.send(_.concat(results[0], results[1]));
        });
    });

    router.get('/credits', (req, res, next) => {
        let type = constants.ACCOUNT_ENTRY_TYPES.CREDIT;

        global.serviceLocator.get('agreements').getAllAgreements(type, (err, agreements) => {
            if (err) {
                res.status(err.status || 500).send({ message: err.message });
                return;
            }

            res.send(agreements);
        });
    });

    router.get('/deposits', (req, res, next) => {
        let type = constants.ACCOUNT_ENTRY_TYPES.DEPOSIT;

        global.serviceLocator.get('agreements').getAllAgreements(type, (err, agreements) => {
            if (err) {
                res.status(err.status || 500).send({ message: err.message });
                return;
            }

            res.send(agreements);
        });
    });

    router.post('/deposits', (req, res, next) => {
        let type = constants.ACCOUNT_ENTRY_TYPES.DEPOSIT;

        global.serviceLocator.get('agreements').create(type, req.body, (err, agreement) => {
            if (err) {
                res.status(err.status || 500).send({ message: err.message });
                return;
            }

            res.send(agreement);
        });
    });

    router.post('/credits', (req, res, next) => {
        let type = constants.ACCOUNT_ENTRY_TYPES.CREDIT;

        global.serviceLocator.get('agreements').create(type, req.body, (err, agreement) => {
            if (err) {
                res.status(err.status || 500).send({ message: err.message });
                return;
            }

            res.send(agreement);
        });
    });

    app.use('/agreement', router);
};