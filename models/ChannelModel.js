const mongoose = require('mongoose');

const ChannelSchema = new mongoose.Schema({
    name: { type: String },
    code: { type: String },
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]

});

ChannelSchema.set('toJSON', { getters: true });

module.exports.Channel = mongoose.model('Channel', ChannelSchema);