const mongoose = require('../db.js');


const bubbleChat = new mongoose.Schema({
    textMsg: String, // text message
    bubbleChatOwnerID: Number, // user's key
    chatroomID: Number, // chatroom's key
});

const BubbleChat = new mongoose.model('BubbleChat', bubbleChat);

module.exports = BubbleChat;