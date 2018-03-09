const express = require('express');
let router = express.Router();

module.exports = function(app) {
    router.get('/programs', (req, res, next) => {
        global.serviceLocator.get('credits').getAllPrograms((err, programs) => {
            if (err) {
                res.status(err.status || 500).send({ message: err.message });
                return;
            }

            res.send(programs);
        });
    });

    app.use('/credit', router);
};