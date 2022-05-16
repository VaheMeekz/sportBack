const User = require("../models").User

const setOnline = async (id, socketId) => {
    try {
        const user = await User.findOne({where: {id}})
        user.status = true
        user.socketId = socketId
        await user.save()
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const setOffline = async (id) => {
    try {
        const user = await User.findOne({where: {socketId: id}})
        user.status = false
        user.socketId = null
        await user.save()
    } catch (e) {
        console.log('something went wrong', e)
    }
}

module.exports = {
    setOnline,
    setOffline
}