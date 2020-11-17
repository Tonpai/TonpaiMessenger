const mongoose = require('../db.js');


const chatroomSchema = new mongoose.Schema({
    roomName: String,
    createDateTime: {
        type: Date,
        default: Date.now,
    },
    adminID: Number, // Key
});

const Chatroom = new mongoose.model('Chatroom', chatroomSchema);

module.exports = Chatroom;
