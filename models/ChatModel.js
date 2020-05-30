const mongoose = require('mongoose');


const ChatSchema = new mongoose.Schema({
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    message: { type: String }
});

ChatSchema.set('toJSON', { getters: true });

module.exports.Chat = mongoose.model('Chat', ChatSchema);