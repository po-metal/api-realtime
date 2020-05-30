const {findChannel, createChannel} = require('./services/ChannelService')
const {usersByChannel, joinChannel,} = require('./services/UserService')
const {chatsByChannel, createChat} = require('./services/ChatService')
const {pubsub} = require('./PubSub')
const { withFilter } = require('graphql-subscriptions');

module.exports.resolvers = {
    Query: {
        channel: (_, {id}) => {
            return findChannel(id)
        },
        usersByChannel: (_, {channelId}) => {
            return usersByChannel(channelId)
        },
        chatsByChannel: (_) => {
            return chatsByChannel()
        },
    },
    Mutation: {
        createChannel: (_, {name}) => {
            return createChannel(name)
        },
        joinChannel: (_, {userName, code}) => {
            return joinChannel(userName, code)
        },
        sendChat: (_, {channelId, userId, message}) => {

            return new Promise( (resolve, reject) => {
                createChat(channelId, userId, message).then(chat => {
                    
                    if(chat){
                        chat.channelId = channelId
                        pubsub.publish('chatAdded', chat);
                    }

                    resolve(chat)
                }).catch(err => reject(err))
            })
            
        }
    },
    Subscription: {
        chatAdded: {
            resolve: (payload) => {
                return payload; //Manipulate at you wish
            },
            subscribe: withFilter(
            () => pubsub.asyncIterator('chatAdded'),
            (payload, variables) => {
                return payload.channelId === variables.channelId;
             }),
            //subscribe: () => pubsub.asyncIterator('chatAdded')
        }
    },
};