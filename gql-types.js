const {gql} = require('apollo-server-express');


module.exports.typeDefs = gql`

type Channel{
    id: ID!
    name: String
    code: String
    chats: [Chat]
    users: [User]
}

type User{
    id: ID!
    name: String
    channel: Channel
}

type Chat{
    id: ID!
    message: String
    channel: Channel
    user: User
}


type Query{
    channel(id:ID!): Channel
    usersByChannel(channelId:ID!): [User]
    chatsByChannel(channelId:ID!): [Chat]
}

type Mutation{
    createChannel(name:String!): Channel!
    joinChannel(userName: String!, code:String!): Channel
    sendChat(channelId:ID!, userId: ID!, message: String): Chat
}

type Subscription {
  chatAdded(channelId: ID!): Chat
}

`
