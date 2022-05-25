const Users = require('../models').User
const Sport = require('../models').Sports
const UserSports = require('../models').UserSport
const UserTeam = require("../models").UserTeam
const {networkInterfaces} = require('os');
const Team = require("../models").Team
const Verify = require("../models").VerifyCode
const Forgot = require("../models").Forgot
const fetch = require('cross-fetch');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const wbm = require("../utils/wbm");
const text = require("../utils/data/data").verificationText
const characters = require("../utils/data/data").characters


function generateString(length) {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const checkNumber = async (req, res) => {
    try {
        const {number, type, email} = req.body
        console.log(email, "...")
        const code = generateString(8)
        let testEmailAccount = await nodemailer.createTestAccount()
        if (type == "1") {
            wbm.start({qrCodeData: true, session: false, showBrowser: false})
                .then(async qrCodeData => {
                    res.send(qrCodeData);
                    await wbm.waitQRCode();
                    const phones = number;
                    const message = code;
                    await wbm.send(phones, message);
                    await wbm.end();
                }).catch(err => console.log(err, "eee"));
            await Verify.create({
                email:"",code,number
            })
        } else if (type == "2") {
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
                    text: `${text} ${code}`
                },
                function (error, info) {
                    if (error) {
                        console.log("something went wrong", error);
                    } else {
                        console.log("Email sent: " + info.response);
                        return res.json({message: "Verification code sended in you email"})
                    }
                });
             await Verify.create({
                 email,code,number:""
             })
        }
    } catch (e) {
        console.log("something went wrong", e)
    }
}
const create = async (req, res) => {
    try {
        const {number, email, code, type} = req.body

        let userCode;
        if (type == "1") {
            userCode = await Verify.findOne({
                where: {number}
            })
        } else if (type == "2") {
            userCode = await Verify.findOne({
                where: {email}
            })
        }
        if (userCode.code == code) {
            const oldUser = await Users.findOne({
                where: {whatsapp: number}
            })
            if (oldUser) {
                return res.json({message: "User whit this number alredy exist"})
            } else {
                const newUser = await Users.create({number})
                await userCode.destroy()
                return res.json(newUser)
            }
        } else {
            return res.json({message: "Something went wrong"})
        }
        return res.json({message: "true"})
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const loginCredentials = async (req, res) => {
    try {
        const {id, email, password} = req.body
        const user = await Users.findOne({where: {id}})
        let encryptedPassword = await bcrypt.hash(password, 10);
        user.email = email.toLowerCase()
        user.password = encryptedPassword
        await user.save()
        return res.json({answer: "true"})
    } catch (e) {
        console.log('something went wrog', e)
    }
}

const addCredentials = async (req, res) => {
    try {
        const {id} = req.query
        const user = await Users.findOne({where: {id}})
        if (!(user.email && user.papassword)) {
            return res.json({message: "Add Credentials for login!"})
        }
    } catch (e) {
        console.log('something went wrong', e)
    }
}


const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!(email && password)) {
            return res.json({
                error: ["Password and email are required fields"],
            });
        }

        const user = await Users.findOne({
            where: {email: email.toLowerCase()},
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {user_id: user.id, email},
                process.env.TOKEN_KEY
            );
            user.token = token;
            user.save();
            return res.status(200).json(user);
        }
        return res.json({error: ["Invalid credentials"]});
    } catch (err) {
        return res.json({error: ["Error"]});
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

const edit = async (req, res) => {
    try {
        const {
            id,
            firstName,
            lastName,
            email,
            gender,
            image,
            address1,
            address2,
            telegram,
            whatsapp,
            facebook,
            tiktok,
            instagram,
            linkedin,
            youtube,
            birth,
            city,
            country,
            state,
            postalCode
        } = req.body

        const user = await Users.findOne({where: {id}})
        if (user) {
            user.firstName = firstName
            user.lastName = lastName
            user.email = email
            user.birth = birth
            user.gender = gender
            user.telegram = telegram
            user.whatsapp = whatsapp
            user.image = image
            user.address1 = address1
            user.address2 = address2
            user.facebook = facebook
            user.tiktok = tiktok
            user.instagram = instagram
            user.linkedin = linkedin
            user.city = city
            user.country = country
            user.state = state
            user.postalCode = postalCode
            user.youtube = youtube
            await user.save()
            return res.json(user)
        } else return res.json({err: "You cant change credentials"})
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const changeAvatar = async (req,res) => {
    try{
        const {id,image} = req.body
        console.log(id,image,"...............")
        const user = await Users.findOne({
            where:{id}
        })
        user.image = image
        await  user.save()
        return res.json(user)
    }catch (e) {
        console.log('something went wrong', e)
    }
}

const conformPasswordAddCode = async (req, res) => {
    const {email} = req.body;

    const thisUSer = await User.findOne({where: {email}});

    if (!thisUSer) {
        return res.json({
            error: ["User Not Found!"],
        });
    }
    try {
        let generateCode = JSON.parse(
            JSON.stringify(new String(generateString(8)))
        );

        const newCode = await Forgot.create({
            code: generateCode,
            user: thisUSer.id,
        });
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
        transporter.sendMail(
            {
                from: process.env.EMAIL,
                to: email,
                text: generateCode,
            },
            function (error, info) {
                if (error) {
                    console.log(error, "🚀");
                } else {
                    console.log("🚀  info.response", "Email sent: " + info.response);
                }
            }
        );
        return res.json({message: "Verify code sent in you email"});
    } catch (error) {
        return res.json({
            error: ["Something Is Wrong!"],
        });
    }
}

const checkVerifyCode = async (req, res) => {
    try {
        const {id, newCode} = req.body
        const code = await Forgot.findOne({
            where: {
                code: newCode,
                user: id,
            }
        })
        if (code.code == newCode) {
            await code.destroy()
            return res.json({answer: "true"})
        } else return res.json({answer: "false"})
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const newPassword = async (req, res) => {
    try {
        const {id, password} = req.body

        const user = await Users.findOne({where: {id}})
        let encryptedPassword = await bcrypt.hash(password, 10);
        if (user) {
            user.password = encryptedPassword
            await user.save()
            return res.json({message: "true"})
        }
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const getAll = async (req, res) => {
    const {status} = req.query
    const offset = Number.parseInt(req.query.offset) || 0;
    const limit = Number.parseInt(req.query.limit) || 6;
    const count = await Users.findAll()
    try {
        if (status) {
            const allUsers = await Users.findAll({
                where: {status},
                offset: offset * limit,
                limit,
                include: [{
                    model: UserSports,
                    include: [Sport]
                }]
            })
            return res.json({paginateUsers: allUsers, count: count.count})
        } else {
            const allUsers = await Users.findAll({
                include: [{
                    model: UserSports,
                    include: [Sport],
                    offset: offset * limit,
                    limit,
                }]
            })
            return res.json({paginateUsers: allUsers, count: count.count})
        }
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
        });

    // return res.json(results.wlp3s0)
}

const changePassword = async (req,res) => {
    try{
        const {oldPassword,newPassword,id} = req.body
        const user = await Users.findOne({
            where:{id}
        })
        if(user){
                let encryptedPassword = await bcrypt.hash(oldPassword, 10);
                if (user.password == encryptedPassword){
                    const password = await bcrypt.hash(newPassword,10)
                    if(user.password = password){
                        return res.json({message:"This password You use alredy!"})
                    }else {
                        user.password = password
                        await user.save
                    }
                    return res.json({message:"password is changed!"})
                }else {
                    return res.json({message:"Password is not much!"})
                }
        }
    }catch (e) {
        console.log('something went wrong', e)
    }
}

module.exports = {
    checkNumber,
    create,
    loginCredentials,
    login,
    addCredentials,
    edit,
    getAll,
    info,
    logout,
    getSingle,
    getUserTeams,
    deactivateAccount,
    conformPasswordAddCode,
    checkVerifyCode,
    newPassword,
    changePassword,
    changeAvatar
}