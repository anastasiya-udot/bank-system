const mongoose = require('../../libs/mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});