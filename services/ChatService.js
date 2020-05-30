const {Chat}  = require( '../models/ChatModel')
const {findChannel} = require('./ChannelService')
const {findUser} = require('./UserService')

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


const createChat =  function (channelId, userId, message) {




    return new Promise(async (resolve, rejects) => {
        let channel = await  findChannel(channelId)
        let user = await  findUser(userId)

        const doc = new Chat({
            message,
            channel: channelId,
            user: userId
        })

        doc.id = doc._id;

        doc.save((error => {
            if (error) {
                rejects(error)
            }
            doc.channel = channel
            doc.user = user
            resolve(doc)
        }))
    })
}


module.exports.findChat = findChat
module.exports.createChat = createChat
module.exports.chatsByChannel = chatsByChannel
module.exports.fetchChats = fetchChats