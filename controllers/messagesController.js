const Message = require("../models").Messages
const Conversation = require("../models").Conversation
const User = require("../models").User
const sequelize = require("sequelize")
const {Op} = require("sequelize");

const createMessage = async (req, res) => {
    try {
        const {sender_id, receiver_id, text} = req.body
        const old = await Conversation.findOne({where: {sender_id, receiver_id}})
        if (!old) {
            const newConversation = await Conversation.create({
                sender_id, receiver_id
            })
            const newMessage = await Message.create({
                sender_id,
                receiver_id,
                text,
                conversation_id: newConversation.id,
                like: null,
                seen: false
            })
            return res.json(newMessage)
        } else {
            const newMessage = await Message.create({
                sender_id,
                receiver_id,
                text,
                conversation_id: old.id,
                like: "",
                seen: false
            })
            return res.json(newMessage)
        }
    } catch (e) {
        console.log("something went wrong")
    }
}

const getMessages = async (req, res) => {
    try {
        const {conversation_id} = req.query
        const messages = await Message.findAll({where: {conversation_id}})
        return res.json(messages)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const unsetMessage = async (req, res) => {
    try {
        const {sender_id, message_id} = req.body
        const message = await Message.findOne({where: {id: message_id}})
        if (message.sender_id == sender_id) {
            await message.destroy()
            return res.json({message: "Message are deleted"})
        }
        return res.json({message: "You cant delete this message"})
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const receivers = async (req, res) => {
    try {
        const {id} = req.query
        const myConversations = await Conversation.findAll({
            where: {
                sender_id: id
            },
            include: [{
                model: User,
                as: "Receiver"
            }, {
                model: Message,
                order: [
                    ['seen', false]
                ]
                // include: [sequelize.fn('COUNT', sequelize.col('seen')), 'seen']
            }],

        })
        return res.json(myConversations)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const like = async (req, res) => {
    try {
        const {message_id, user_id, like} = req.body
        const message = await Message.findOne({where: {id: message_id}})
        if (message.receiver_id == user_id) {
            message.like = like
            await message.save()
            return res.json(message)
        }
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const unlike = async (req,res) => {
    try {
        const {message_id,user_id} = req.body
        const message = await Message.findOne({where: {id: message_id}})
        if (message.receiver_id == user_id) {
            message.like = null
            await message.save()
            return res.json(message)
        }
    }catch (e) {
        console.log('something went wrong',e)
    }
}

const pinnedMessage = async (req, res) => {
    try {
        const {sender_id, receiver_id, id} = req.body
        const conversation = await Conversation.findOne({where: {sender_id, receiver_id}})
        conversation.pinned_id = id
        await conversation.save()
        return res.json(conversation)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const deletePinnedMessage = async (req, res) => {
    try {
        const {sender_id, receiver_id} = req.body
        const conversation = await Conversation.findOne({where: {sender_id, receiver_id}})
        conversation.pinned_id = ""
        await conversation.save()
        return res.json(conversation)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const seen = async (req, res) => {
    try {
        const {id, message_id} = req.body

        const message = await Message.findOne({where: {id: message_id}})
        if (message.receiver_id == id) {
            message.seen = true
            await message.save()
            return res.json(message)
        } else {
            return res.json({message: "You arent receiver"})
        }
    } catch (e) {
        console.log('something went wrong', e)
    }
}

module.exports = {
    createMessage,
    getMessages,
    receivers,
    unsetMessage,
    like,
    pinnedMessage,
    deletePinnedMessage,
    seen,
    unlike
}