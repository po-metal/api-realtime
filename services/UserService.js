const {User}  = require( '../models/UserModel')
const {findChannelByCode} = require('./ChannelService')


const usersByChannel= function (channelId) {
    return new Promise((resolve, reject) => {
        User.find({channel: channelId}).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

const fetchUsers = function () {
    return new Promise((resolve, reject) => {
        User.find({}).exec((err, res) => (
            err ?  reject(err) : resolve(res)
        ));
    })
}


const findUser = function(id) {
    return new Promise((resolve, reject) => {
        User.findOne({_id: id}).populate('bingo').populate('card').exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

const joinChannel =  function (userName, code) {
    

    return new Promise(async (resolve, rejects) => {

        let channel = await findChannelByCode(code)
        
        if(!channel){
            resolve(null)
        }else{

            const doc = new User({
                name: userName,
                channel: channel._id
            })
    
            doc.id = doc._id;
    
            doc.save((error => {
                if (error) {
                    rejects(error)
                }

                resolve(channel)
            }))
        }

       
    })
}



module.exports.joinChannel= joinChannel
module.exports.usersByChannel = usersByChannel
module.exports.findUser = findUser
module.exports.fetchUsers = fetchUsers