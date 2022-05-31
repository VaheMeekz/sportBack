const nodemailer = require("nodemailer");
const {verificationText: text} = require("../utils/data/data");
const Invite = require('../models').TeamInvites
const Team = require("../models").Team
const Sport = require("../models").Sports
const UserTeam = require("../models").UserTeam
const User = require("../models").User
const create = async (req, res) => {
    try {
        const {team_id, receiver_id, message, sender_id} = req.body
        console.log(team_id, receiver_id, message, sender_id);

        const newInvite = await Invite.create({
            team_id,
            sender_id,
            receiver_id,
            status: "new",
            message
        })
        return res.json(newInvite)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const myInvites = async (req, res) => {
    try {
        const {id} = req.query
        const myInvites = await Invite.findAll({
            where: {receiver_id: id,status: "new"},
            include: [{
                model: Team,
                include: [Sport]
            }]
        })
        return res.json(myInvites)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const mySendedInvites = async (req, res) => {
    try {
        const {id} = req.query
        const mySendedInvites = await Invite.findAll({
            where: {sender_id: id,status: "new"},
            include: [{
                model: Team,
                include: [Sport]
            },{
                model:User
            }]
        })
        return res.json(mySendedInvites)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const reject = async (req, res) => {
    try {
        const {id} = req.body
         const invite =   await Invite.findOne({where: {id}})
        invite.status = "reject"
        await invite.save()
        return res.json({message: "Invite rejected!"})
    } catch (e) {
        console.log('something went weong', e)
    }
}

const accept = async (req, res) => {
    try {
        const {id, teamId} = req.body
        const newUserTeam = await UserTeam.create({
            user_id: id,
            team_id: teamId
        })
        // await Invite.destroy({
        //     where: {
        //         team_id: teamId,
        //         receiver_id: id,
        //     }
        // })
        return res.json(newUserTeam)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const inviteWithEmail = async (req,res) => {
    try {
        const {email,message} = req.body
        let transporter = await nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "vaheemkrtchyan@gmail.com",
                pass: "yaChasNeLondone",
            },
        })
        await transporter.sendMail({
                from: "vaheemkrtchyan@gmail.com",
                to: email,
                subject: "Verification",
                text: message
            },
            function (error, info) {
                if (error) {
                    console.log("something went wrong", error);
                } else {
                    console.log("Email sent: " + info.response);
                    return res.json({answer: true})
                }
            });

    }catch (e) {
        console.log('something went wrong',e)
    }
}

const singleTeamInviteHistory =async (req,res) => {
    try{
        const {id} = req.query
        const teamInvite = await Invite.findAll({
            where:{
                team_id:id
            },
            include: [{
                model: Team,
                include: [Sport]
            },{
                model:User
            }]
        })
        const accepted =  await Invite.findAll({
            where:{
                team_id:id,
                status: "accept",
            },
            include: [{
                model: Team,
                include: [Sport]
            },{
                model:User
            }]
        })
        const rejected =  await Invite.findAll({
            where:{
                team_id:id,
                status: "reject",
            },
            include: [{
                model: Team,
                include: [Sport]
            },{
                model:User
            }]
        })
        const pending =  await Invite.findAll({
            where:{
                team_id:id,
                status: "new",
            },
            include: [{
                model: Team,
                include: [Sport]
            },{
                model:User
            }]
        })
        return res.json({all:teamInvite.length,accepted:accepted.length,rejected:rejected.length,pending:pending.length})
    }catch (e) {
        console.log("something went wrong", e)
    }
}

module.exports = {
    create,
    myInvites,
    mySendedInvites,
    reject,
    accept,
    inviteWithEmail,
    singleTeamInviteHistory
}