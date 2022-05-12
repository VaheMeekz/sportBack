const Sports = require("../models").Sports
const getAll = async (req,res) => {
    try{
        const all = await Sports.findAll()
        return res.json(all)
    }catch (e) {
        console.log('something went wrong',e)
    }
}

module.exports = {
    getAll
}