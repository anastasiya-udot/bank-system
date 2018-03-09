const express = require('express');
let router = express.Router();

module.exports = function(app) {

    router.get('/:type', (req, res, next) => {
        global.serviceLocator.get('accounts').getAll(+req.params.type, (err, accounts) => {
            if (err) {
                res.status(err.status || 500).send({ message: err.message });
                return;
            }

            res.send(accounts);
        });
    });

    router.put('/:type', (req, res, nex) => {
        global.serviceLocator.get('accounts').updateAccounts(+req.params.type, (err, accounts) => {
            if (err) {
                res.status(err.status || 500).send({ message: err.message });
                return;
            }

            res.send(accounts);
        });
    });

    app.use('/account', router);
};