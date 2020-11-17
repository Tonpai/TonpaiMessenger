const mongoose = require('../db.js');


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    createDateTime: {
        type: Date,
        default: Date.now,
    },
});

const User = new mongoose.model('User', userSchema);

module.exports = User;