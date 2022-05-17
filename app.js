const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const userSportRouter = require('./routes/userSport')
const sportRouter = require('./routes/sports')
const teamRouter = require('./routes/team')
const inviteRouter = require('./routes/teamInvites')
const activityController = require('./routes/activity')
const activityInviteRouter = require('./routes/activityInvite')
const messageRouter = require('./routes/messages')
const userService = require("./services/status.service")
const messageService = require("./services/message.service")
const app = express();
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/userSports', userSportRouter);
app.use('/api/v1/sports', sportRouter);
app.use('/api/v1/team', teamRouter);
app.use('/api/v1/invite', inviteRouter);
app.use('/api/v1/activity', activityController)
app.use('/api/v1/activityInvite', activityInviteRouter)
app.use('/api/v1/message', messageRouter)
// app.use('/api/v1/userSport', userSportRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
//------------------------------------------------ sockets start -------------------------------------------------------

let users = []

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && users.push({userId, socketId});
    userService.setOnline(userId, socketId)
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
    userService.setOffline(socketId)
};

const getUser = (userId) => {
    return users.filter((user) => user.userId === userId);
};

const seenMessage = (messagId) => {
    messageService.seen(messagId)
}

const io = require("socket.io")(process.env.SOCKET_PORT, {
    cors: {
        origin: process.env.FRONT_URL,
    },
});

io.on("connection", (socket) => {
    //connect
    console.log("user is conected!");
    //get userId and socketId
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });
    //team invite
    socket.on("sendInvition", ({senderId, receiverId, teamName, senderName, status, teamImage}) => {
        const user = getUser(receiverId);
        user && io.emit("getInvitions", {
            senderId, senderName, receiverId, teamName, status, teamImage
        });
    });
//activity invite
    socket.on("sendActivityInvite", ({creatorName, name, description, sport, lat, long, date, time, receiverId}) => {
        const user = getUser(receiverId);
        user && io.emit("getActivityInvite", {
            creatorName, name, description, sport, lat, long, date, time
        })
    })
//chat start
    socket.on("sendMessage", ({senderId, senderImage, receiverId, text, senderName}) => {
        const user = getUser(receiverId);
        user && io.emit("getMessage", {
            senderId, senderImage, senderName, receiverId, text,
        });
    });

    //message seen
    socket.on("seen", ({messageId}) => {
        const user = seenMessage(messageId)
        user && io.emit("getSeen", {
            messageId
        })
    })

    //disconnect
    socket.on("disconnect", () => {
        removeUser(socket.id), console.log("a user is disconnected!");
        io.emit("getUsers", users);
    });
});
//---------------------------------------------------------- socket end ------------------------------------------------
module.exports = app;
