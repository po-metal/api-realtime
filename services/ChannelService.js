const {Channel}  = require( '../models/ChannelModel')


const findChannel = function(id) {
    return new Promise((resolve, reject) => {
        Channel.findOne({_id: id}).populate('chats').exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

const findChannelByCode = function(code) {
    return new Promise((resolve, reject) => {
        Channel.findOne({code: code}).populate('chats').exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}


const createChannel = async function (name) {

    let code = randomstring(5)

    const doc = new Channel({
        name,
        code
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




function randomstring(length) {
    let result = '';
    let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


module.exports.findChannel = findChannel
module.exports.findChannelByCode = findChannelByCode
module.exports.createChannel = createChannel