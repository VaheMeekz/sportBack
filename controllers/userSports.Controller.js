const UserSport = require('../models').UserSport
const Sport = require('../models').Sports

const getSingle = async (req, res) => {
    try {
        const {userId} = req.query
        const userSports = await UserSport.findAll({
            where: {userId},
            include: [Sport]
        })
        return res.json(userSports)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const add = async (req, res) => {
    try {
        const {userId, sportId} = req.body
        const newItem = await UserSport.create({
            userId, sportId
        })
        return res.json(newItem)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const deleteItem = async (req, res) => {
    try {
        const {userId, sportId} = req.body
        const item = await UserSport.destroy({
            where: {userId, sportId}
        })
        return res.json({message: "deleted"})
    } catch (e) {
        console.log('something went wrong', e)
    }
}

module.exports = {
    getSingle,
    add,
    deleteItem
}