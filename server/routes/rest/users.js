const express = require('express');
let router = express.Router();

module.exports = function(app) {
    router.get('/', (req, res, next) => {
        global.serviceLocator.get('user').getAll((err, users) => {
            if (err) {
                res.status(err.status || 500).send({ message: err.message });
                return;
            }

            res.send(users);
        });
    });

    router.put('/:id', (req, res, next) => {
        global.serviceLocator.get('user').update(req.params.id, req.body, (err, user) => {
            if (err) {
                res.status(err.status || 500).send({ message: err.message, attr: err.attr });
                return;
            }
    
            res.send(user);
        })
    });

    router.post('/', (req, res, next) => {
        global.serviceLocator.get('user').create(req.body, (err, user) => {
            if (err) {
                res.status(err.status || 500).send({ message: err.message, attr: err.attr });
                return;
            }
    
            res.send(user);
        })
    });

    router.delete('/:id', (req, res, next) => {
        global.serviceLocator.get('user').delete(req.params.id, err => {
            if (err) {
                res.status(err.status || 500).send({ message: err.message });
            } else {
                res.status(200).send();
            }
        });
    });

    app.use('/users', router);
};