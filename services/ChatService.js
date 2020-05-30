const {Chat}  = require( '../models/ChatModel')

const fetchChats = function () {
    return new Promise((resolve, reject) => {
        Chat.find({}).exec((err, res) => (
            err ?  reject(err) : resolve(res)
        ));
    })
}

const chatsByChannel = function (channelId) {
    return new Promise((resolve, reject) => {
        Chat.find({channel:channelId}).exec((err, res) => (
            err ?  reject(err) : resolve(res)
        ));
    })
}

const findChat = function(id) {
    return new Promise((resolve, reject) => {
        Chat.findOne({_id: id}).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}


const createChat = async function (channelId, userId, message) {


    const doc = new Chat({
        message,
        channel: channelId,
        user: userId
    })

    doc.id = doc._id;

    return new Promise((resolve, rejects) => {
        doc.save((error => {
            if (error) {
                rejects(error)
            }
            resolve(doc)
        }))
    })
}


module.exports.findChat = findChat
module.exports.createChat = createChat
module.exports.chatsByChannel = chatsByChannel
module.exports.fetchChats = fetchChats