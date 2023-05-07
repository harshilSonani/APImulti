const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/api-jwt');

const db = mongoose.connection;

db.once('open', (err) => {
    if (err) {
        console.log('db not working');
        return false;
    }
    console.log('db is woking');
});

module.exports = db;