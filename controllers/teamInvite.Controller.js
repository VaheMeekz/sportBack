const Invite = require('../models').TeamInvites
const Team = require("../models").Team
const Sport = require("../models").Sports
const UserTeam = require("../models").UserTeam

const create = async (req,res) => {
    try{
        const {team_id,receiver_id,message,sender_id} = req.body
        const newInvite = await Invite.create({
            team_id,
            sender_id,
            receiver_id,
            status:"new",
            message
        })
        return res.json(newInvite)
    }catch (e) {
        console.log('something went wrong',e)
    }
}

const myInvites = async (req,res) =>{
    try{
        const {id} = req.query
        const myInvites = await Invite.findAll({
            where:{receiver_id:id},
            include: [{
                model:Team,
                include:[Sport]
            }]
        })
        return res.json(myInvites)
    }catch (e) {
        console.log('something went wrong',e)
    }
}

const mySendedInvites = async (req,res) => {
    try {
        const {id} = req.query
        const mySendedInvites = await Invite.findAll({
            where:{sender_id:id}
        })
        return res.json(mySendedInvites)
    }catch (e) {
        console.log('something went wrong',e)
    }
}

const reject = async (req,res) => {
    try{
        const {id} = req.body
        await Invite.destroy({where:{id}})
        return res.json({message:"Invite rejected!"})
    }catch (e) {
        console.log('something went weong',e)
    }
}

const accept = async (req,res) => {
    try{
        const {id,teamId} = req.body
        const newUserTeam = await UserTeam.create({
            user_id: id,
            team_id: teamId
        })
        await Invite.destroy({where:{
                team_id:teamId,
                receiver_id:id,
            }})
        return res.json(newUserTeam)
    }catch (e) {
        console.log('something went wrong',e)
    }
}


module.exports = {
    create,
    myInvites,
    mySendedInvites,
    reject,
    accept
}