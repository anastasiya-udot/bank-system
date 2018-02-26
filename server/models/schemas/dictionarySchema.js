module.exports = function(mongoose) {
    return new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: false
        }
    });
};