const Message = require("../models").Messages

const seen = async (messageId) => {
    try{
        const message = await Message.findOne({where:{id:messageId}})
        message.seen = true
        await message.save()
    }catch (e) {
        console.log('something went wrong',e)
    }
}

module.exports = {
    seen
}