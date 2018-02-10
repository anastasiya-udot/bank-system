module.exports = function(app, router) {
    router.get('/', (req, res, next) => {
        global.serviceLocator.get('user').getAll((err, users) => {
            if (err) {
                return next(err);
            }

            res.send(users);
        });
    });

    app.use('/users', router);
};