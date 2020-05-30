const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: { type: String },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel'
    },
});

UserSchema.set('toJSON', { getters: true });

module.exports.User = mongoose.model('User', UserSchema);