let mongoose = require('mongoose');
let config = require('../../common/config');

mongoose.Promise = global.Promise;
mongoose.connect(config.MONGOOSE.URL);

module.exports = mongoose;