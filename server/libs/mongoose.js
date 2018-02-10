let mongoose = require('mongoose');
let constants = require('../../common/constants');

mongoose.Promise = global.Promise;
mongoose.connect(constants.MONGOOSE.URL);

module.exports = mongoose;