const Users = require('../models').User
const Sport = require('../models').Sports
const UserSports = require('../models').UserSport
const UserTeam = require("../models").UserTeam
const {networkInterfaces} = require('os');
const Team = require("../models").Team
const fetch = require('cross-fetch');
const sms = require('sms-service');
const smsService = new sms.SMSService

const create = async (req, res) => {
    try {
        const {vahe} = req.body
        console.log(vahe);
        await smsService.sendSMS('+37494747264', 'hello from sms-service!');
        return res.json({message: "true"})
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const login = async (req, res) => {
    try {

    } catch (e) {
        console.log('something went wrong', e)
    }
}

const logout = async (req, res) => {
    try {
        const {id} = req.body
        const user = await Users.findOne({where: {id}})
        user.token = null
        await user.save()
        return res.json({answer: true})
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const deactivateAccount = async (req, res) => {
    try {
        const {id} = req.body

        const user = await Users.findOne({where: {id}})
        await user.destroy()
        return res.json({message: "Your Account Deactivated"})
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const getAll = async (req, res) => {
    try {
        const allUsers = await Users.findAll({
            include: [{
                model: UserSports,
                include: [Sport]
            }]
        })
        return res.json(allUsers)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const getSingle = async (req, res) => {
    try {
        const {id} = req.query
        const user = await Users.findOne({
            where: {id},
            include: [{
                model: UserSports,
                include: [Sport]
            }]
        })
        return res.json(user)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const getUserTeams = async (req, res) => {
    try {
        const {id} = req.query
        const userTeams = await UserTeam.findAll({
            where: {user_id: id},
            include: [{model: Team, include: [Sport]}]
        })
        return res.json(userTeams)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const info = async (req, res) => {
    const nets = networkInterfaces();
    const results = Object.create(null);
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }
    const accessKey = "14a9748a-4f08-443e-a1bb-dfb9d37019b4"
    const url = 'https://apiip.net/api/check?ip=' + results.wlp3s0 + '&accessKey=' + accessKey;
    await fetch(`http://api.weatherstack.com/forecast`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "access_key": "c337bbd65ff31680f59d158ffdee837a",
            "query": "37.186.123.106",
            "hourly": "1"
        },
    })
        .then(function (res) {
            return res.json(res)
        })
        .catch(function (res) {
            console.log(res, "+++++++++++++++++++++++++++++++");

        });

    // return res.json(results.wlp3s0)
}

module.exports = {
    create,
    login,
    getAll,
    info,
    logout,
    getSingle,
    getUserTeams,
    deactivateAccount
}