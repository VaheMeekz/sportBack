const Team = require("../models").Team
const User = require("../models").User
const Sport = require('../models').Sports
const UserTeam = require("../models").UserTeam
const create = async (req, res) => {
    try {
        const {name, image, sport_id, creator_id} = req.body
        const creator = await User.findOne({where: {id: creator_id}})
        const newTeam = await Team.create({
            name, image, sport_id, creator_id: creator.id
        })
        const newUserTeam = await UserTeam.create({
            user_id: creator_id,
            team_id: newTeam.id
        })
        const userTeams = await Team.findAll({
            where: {creator_id: creator_id},
            include: [{model: UserTeam, include: [User]}, Sport]
        })
        return res.json(userTeams)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const editTeam = async (req, res) => {
    try {
        const {id, name, image} = req.body
        const team = await Team.findOne({where: {id}})
        team.name = name
        team.image = image
        await team.save()
        return res.json(team)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const deleteTeam = async (req, res) => {
    try {
        const {id, creatorId} = req.body

        const team = await Team.findOne({where: {id}})
        if (team.creator_id == creatorId) {
            const usersTeam = await UserTeam.destroy({where: {team_id: team.id}})
            await team.destroy()
            const userTeams = await Team.findAll({
                where: {creator_id: creatorId},
                include: [{model: UserTeam, include: [User]}, Sport]
            })
            return res.json(userTeams)
        } else {
            return res.json({message: 'You cant delete this team'})
        }
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const deleteTeamMete = async (req, res) => {
    try {
        const {id, creator_id, teamMeteId} = req.body

        const team = await Team.findOne({
            where: {id}, include: [
                {
                    model: UserTeam,
                    include: {
                        model: User,
                        where: {
                            status
                        }
                    }
                },
                Sport]
        })

        if (team.creator_id !== Number(creator_id)) {

            return res.json({message: "You cant delete this teamete"})
        } else {
            const teamMete = await UserTeam.destroy({
                where: {
                    user_id: teamMeteId,
                    team_id: team.id
                }
            })
            return res.json(team)
        }
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const myTeams = async (req, res) => {
    try {
        const {id} = req.query

        const userTeams = await Team.findAll({
            // where: {creator_id: id},
            include: [{
                model: UserTeam, include: [User], where: {
                    user_id: id
                }
            }, Sport]
        })

        return res.json(userTeams)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const getSingle = async (req, res) => {
    try {
        const {id, status} = req.query
        if (status) {
            const item = await Team.findOne({
                where: {id},
                include: [
                    {
                        model: UserTeam,
                        include: {
                            model: User,
                            where: {
                                status
                            }
                        }
                    },
                    Sport]
            })
            return res.json(item)
        } else {
            const item = await Team.findOne({
                where: {id},
                include: [
                    {
                        model: UserTeam,
                        include: {
                            model: User,
                        }
                    },
                    Sport]
            })
            return res.json(item)
        }
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const getAll = async (req, res) => {
    try {
        const teams = await Team.findAll({
            include: [{model: UserTeam, include: [User]}, Sport]
        })
        return res.json(teams)
    } catch (e) {
        console.log('something went wrong', e)
    }
}
module.exports = {
    create,
    deleteTeam,
    getSingle,
    getAll,
    editTeam,
    deleteTeamMete,
    myTeams
}