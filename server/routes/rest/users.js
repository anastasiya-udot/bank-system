const express = require('express');
let router = express.Router();

module.exports = function(app) {
    router.get('/', (req, res, next) => {
        global.serviceLocator.get('user').getAll((err, users) => {
            if (err) {
                return next(err);
            }

            users = [
               { id: 1,
                name: 'lalalalalla'
               }
            ];

            res.send(users);
        });
    });

    app.use('/users', router);
};