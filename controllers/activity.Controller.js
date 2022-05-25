const Activity = require('../models').Activity
const ActivityPeople = require('../models').ActivityPeople
const User = require("../models").User
const ActivityInvites = require("../models").ActivityInvite
const Sport = require("../models").Sports

const create = async (req, res) => {
    try {
        const {
            creator_id,
            name,
            description,
            sport_id,
            date,
            startTime,
            endTime,
            peoplesCount,

        } = req.body
        let timeout = Number(endTime) - Number(startTime)
        const newActivity = await Activity.create({
            creator_id, name, description, sport_id, date, time: timeout, peoplesCount, startTime, endTime
        })
        return res.json(newActivity)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const addOtherCredentials = async (req, res) => {
    try {
        const {id, lat, lng, visible} = req.body


        const activity = await Activity.findOne({where: {id}})
        if (activity) {
            activity.lat = lat
            activity.lng = lng
            activity.visible = visible
            await activity.save()

            return res.json(activity)
        }

    } catch (e) {
        console.log('something went wrong', e)
    }
}


const getAll = async (req, res) => {
    try {
        const allActivity = await Activity.findAll({
            include: [{
                model: ActivityPeople,
                // where: {
                //     status: "new"
                // },
                // status: {
                //     [Op.or]: ["new", "accept"]
                // },
                include: [User]
            }, {
                model: User,
                as: "Creator"
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
                    // status: "accept"
                },
                include: [User]
            }, {
                model: User,
                as: "Creator"
            }]
        })
        return res.json(activity)
    } catch (e) {
        console.log('something went wrong', e)
    }
}


const myActivityTime = async (req, res) => {
    try {
        const {id} = req.query
        const allActivity = await Activity.findAll({
            where: {creator_id: id},
            include: [{
                model: ActivityPeople,
                // where: {
                //     status: "accept"
                // },
                include: [User]
            }, {
                model: User,
                as: "Creator"
            },{
                model:Sport
            }]
        })
        return res.json(allActivity)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

module.exports = {
    create,
    getAll,
    getSingle,
    myActivityTime,
    addOtherCredentials
}