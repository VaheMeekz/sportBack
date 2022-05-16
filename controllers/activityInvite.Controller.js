const {router} = require("express/lib/application");
const Activity = require('../models').Activity
const ActivityPeople = require('../models').ActivityPeople
const User = require("../models").User
const ActivityInvites = require("../models").ActivityInvite
const Sport = require("../models").Sports
const create = async (req, res) => {
    try {
        const {activity_id, sender_id, message, recivier_id} = req.body
        const recivers = recivier_id.split(",")
        recivers.forEach(async i => {
            await ActivityPeople.create({
                activity_id: activity_id,
                user_id: i,
                status:"new"
            })
        })
        recivers.forEach(async i=>{
            await ActivityInvites.create(
                {
                    sender_id,
                    activity_id,
                    message,
                    recivier_id: i,
                    status:"new"
                }
            )
        })
        return res.json({message: "invites are sended"})
    } catch (e) {

    }
}

const getMyInvites = async (req, res) => {
    try {
        const {id} = req.query
        const myActivitys = await ActivityInvites.findAll({
            where: {recivier_id: id},
            include: [{
                model: Activity,
                include: [Sport]}]
        })
        return res.json(myActivitys)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const getMySendedInvites = async (req, res) => {
    try {
        const {id} = req.query
        const myActivitys = await ActivityInvites.findAll({
            where: {sender_id: id}
        })

        return res.json(myActivitys)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const accept = async (req,res) => {
    try {
        const {sender_id,activity_id,recivier_id} = req.body
        const activity = await ActivityInvites.findOne({
            where:{sender_id,activity_id,recivier_id}
        })

        const activPeople = await ActivityPeople.findOne({
            where:{activity_id,user_id:recivier_id}
        })
        if(activity && activPeople){
            activity.status = "accept"
            activPeople.status = "accept"
            await activPeople.save()
            await activity.save()
            return res.json(activity)
        }
    }catch (e) {
        console.log('something went wrong',e)
    }
}

const reject = async (req,res) => {
    try {
        const {sender_id,activity_id,recivier_id} = req.body
        const activity = await ActivityInvites.findOne({
            where:{sender_id,activity_id,recivier_id}
        })
        const activPeople = await ActivityPeople.findOne({
            where:{activity_id,user_id:recivier_id}
        })
        if(activity && activPeople){
            activity.status = "reject"
            activPeople.status = "reject"
            await activity.save()
            await activPeople.save()
            return res.json(activity)
        }
    }catch (e) {
        console.log('something went wrong',e)
    }
}

const myInvitesHistory = async (req,res) => {
    try{
        const {id} = req.query
        const all =await ActivityInvites.findAll({
            where:{sender_id:id}
        })
        const accepted = await ActivityInvites.findAll({
            where:{sender_id:id,status:"accept"}
        })
        const rejected = await ActivityInvites.findAll({
            where:{sender_id:id,status:"reject"}
        })

        return res.json({all:all.length,accept:accepted.length,reject:rejected.length})
    }catch (e) {
        console.log('something went wrong',e)
    }
}

// router.get('/singleActivityHistory')
const singleHistory = async (req,res) => {
    try{
        const  {id,activity_id} = req.query
        const all =await ActivityInvites.findAll({
            where:{sender_id:id,activity_id}
        })
        const accepted = await ActivityInvites.findAll({
            where:{sender_id:id,status:"accept",activity_id}
        })
        const rejected = await ActivityInvites.findAll({
            where:{sender_id:id,status:"reject",activity_id}
        })
        return res.json({all:all.length,accept:accepted.length,reject:rejected.length})
    }catch (e) {
        console.log('something went wrong',e)
    }
}

module.exports = {
    create,
    getMyInvites,
    getMySendedInvites,
    accept,
    reject,
    myInvitesHistory,
    singleHistory
}