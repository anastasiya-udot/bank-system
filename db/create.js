const mongoose = require('../server/libs/mongoose');
const async = require('async');

async.series([
   // drop,
    open
], () => {
    console.log(arguments);
    mongoose.disconnect();
});

function open(callback){
    mongoose.connection.on('open', callback);
}
function drop(callback){
    let db = mongoose.connection.base;

    db.dropDatabase(callback);
}