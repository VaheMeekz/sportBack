const Activity = require('../models').Activity
const ActivityPeople = require('../models').ActivityPeople
const User = require("../models").User
const ActivityInvites = require("../models").ActivityInvite
const create = async (req, res) => {
    try {
        const {creator_id, name, description, sport_id, date, time, peoplesCount, lat, lng} = req.body

        const newActivity = await Activity.create({
            creator_id, name, description, sport_id, date, time, peoplesCount, lat, lng
        })
        return res.json(newActivity)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const getAll = async (req, res) => {
    try {
        const allActivity = await Activity.findAll({
            include: [{
                model: ActivityPeople,
                where: {
                    status: "accept"
                },
                include: [User]
            },{
                model:User,
                as:"Creator"
            }]
        })
        return res.json(allActivity)
    } catch (e) {
        console.log('something went wrong', e)
    }
}


const getSingle = async (req, res) => {
    try {
        const {id} = req.query
        const activity = await Activity.findOne({
            where: {id},
            include: [{
                model: ActivityPeople,
                where: {
                    status: "accept"
                },
                include: [User]},{
                model:User,
                as:"Creator"
            }]
        })
        return res.json(activity)
    } catch (e) {
        console.log('something went wrong', e)
    }
}



module.exports = {
    create,
    getAll,
    getSingle,
}