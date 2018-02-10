const userScema = require('./schemas/userSchema');

module.exports = mongoose.model('User', userSchema);