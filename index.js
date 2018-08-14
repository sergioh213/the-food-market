const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser')
const db = require("./db/db.js");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bc = require("./db/bcrypt.js")
const bcrypt = require('./db/bcrypt')
const csurf = require('csurf')
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const s3 = require("./s3");
const config = require("./config");
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: 'localhost:8080' });

var diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
      uidSafe(24).then(function(uid) {
          callback(null, uid + path.extname(file.originalname));
      });
    }
});
var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

const sessMiddleware = cookieSession({
       secret: `I'm always angry.`,
       maxAge: 1000 * 60 * 60 * 24 * 14
   })

app.use(sessMiddleware);
io.use(function(socket, next) {
    sessMiddleware(socket.request, socket.request.res, next);
});
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(csurf());
app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});

app.use(express.static("./public"))

app.use(compression());

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.post("/registration", (req, res) => {
    const {first_name, last_name, email, password} = req.body
    if (
        first_name == ""
        || last_name == ""
        || email == ""
        || password == ""
    ) {
        res.json({
            error: "Please, fill in all the fields"
        })
    } else {
        bcrypt.hashPassword(password)
        .then(hashedPassword => {
            db.newUser(first_name, last_name, email, hashedPassword)
            .then(userInfo => {
                req.session.user = {id: userInfo.id, first_name: first_name, last_name: last_name, email: email}
                res.json({
                    success: true,
                    id: userInfo.id,
                    first_name: first_name,
                    last_name: last_name,
                    email: email
                })
            }).catch(err => {
                console.log(err);
                res.json({
                    error: "Email already exists"
                })
            })
        }).catch(err => {
            console.log(err);
            res.json({
                error: "Ups, Something went wrong when encrypting the your password"
            })
        })
    }
})

app.post("/login", (req, res) => {
    db.getEmails(req.body.email).then(userInfo => {
        if (userInfo && userInfo.email) {
            bcrypt.checkPassword(req.body.password, userInfo.hashed_password)
                .then(passwordsMatch => {
                    if(passwordsMatch) {
                        req.session.user = {id: userInfo.id, firstName: userInfo.first_name, lastName: userInfo.last_name, email: userInfo.email}
                        res.json({
                            success: true,
                            id: userInfo.id,
                            first_name: userInfo.first_name,
                            last_name: userInfo.last_name,
                            email: userInfo.email
                        })
                    } else {
                        res.json({
                            success: false,
                            error: 'Wrong password'
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.json({
                        success: false,
                        error: 'Wrong password'
                    })
                })
        } else {
            res.json({
                success: false,
                error: 'Email not found'
            })
        }
    })
})

app.get("/user", (req, res) => {
    db.getUserById(req.session.user.id).then(userInfo => {
        res.json({
            ...userInfo,
            profile_image_url: userInfo.profile_image_url || '/content/default_profile_picture.png'
        })
    }).catch((err) => {
        console.log("logging error", err);
        res.sendStatus(500)
    })
})

app.post("/upload", uploader.single('file'), s3.upload, (req, res) => {
    console.log("we are here, and the file is: ", req.file.filename);
    db.changeUserProfilePic(req.session.user.id, config.s3Url + req.file.filename).then(imgUrl => {
        res.json({
            success: true,
            profile_image_url: imgUrl
        })
    })
})

app.post("/editprofile.json", (req, res) => {
    const {age, birth_city, birth_country, password, email, last_name, first_name} = req.body
    console.log("current user's ID: ", req.session.user.id);
    console.log("receiving req.body in server: ", req.body);
    if ((password == "" || null) || !password) {
        console.log("No pasword inputted");
        db.updateUserNoPassword(req.session.user.id, first_name, last_name, email, birth_city, birth_country).then(userInfo => {
            console.log("ADDITIONAL INFO SAVED NO Password!");
            res.json({userInfo})
        })
    } else {
        bcrypt.hashPassword(password).then(hashedPassword => {
            db.updateUser(req.session.user.id, first_name, last_name, email, hashedPassword, birth_city, birth_country).then(userInfo => {
                console.log("ADDITIONAL INFO SAVED!");
                res.json({userInfo})
            })
        })
    }
})

app.post("/bio", (req, res) => {
    db.saveBio(req.session.user.id, req.body.bio).then(bio => {
        res.json({bio})
    })
})

app.post("/check-in-out.json", (req, res) => {
    console.log("req.body.checked_in in server: ", req.body.checked_in);
    db.checkInOut(req.session.user.id, !req.body.checked_in).then( newStatus => {
        console.log("newStatus returned from db: ", newStatus);
        res.json({
            checked_in: newStatus
        })
    })
})

app.get("/welcome", (req, res) => {
    if(req.session.user){
        res.redirect("/")
    } else {
        res.sendFile(__dirname + '/index.html');
    }
})

app.get('/logout', (req, res) => {
    req.session = null
    res.redirect('/welcome')
})

app.get('*', function(req, res) {
    console.log("Is this happening tho");
    if(!req.session.user) {
        res.redirect("/welcome")
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

server.listen(8080, function() {
    console.log("I'm listening.");
});

io.on('connection', function(socket) {
    // console.log(`socket with the id ${socket.id} is now connected`);
    //
    // if (!socket.request.session || !socket.request.session.user.id) {
    //     return socket.disconnect(true);
    // }
    //
    // const userId = socket.request.session.user.id
    //
    // onlineUsers[socket.id] = userId
    //
    // if (Object.values(onlineUsers).filter(
    //     id => id == userId
    // ).length == 1) {
    //     // or db query to get the data, and pass it as the 2nd argument (better)
    //     db.getUserById(userId).then(userInfo => {
    //         socket.broadcast.emit('userJoined', {
    //             id: userId,
    //             first_name: userInfo.first_name,
    //             last_name: userInfo.last_name,
    //             image_url: userInfo.image_url || '/content/default_profile_picture.png'
    //         })
    //     })
    // }
    //
    // db.getUsersByIds(Object.values(onlineUsers)).then(onlineUsers => {
    //         for (let user of onlineUsers) {
    //             user.image_url = user.image_url || '/content/default_profile_picture.png'
    //         }
    //         console.log("onlineUsers: ", onlineUsers);
    //         socket.emit('onlineUsers', onlineUsers)
    //     }
    // )
    //
    // socket.on('disconnect', function() {
    //     io.emit('userLeft', userId)
    //     console.log(`socket with the id ${socket.id} is now disconnected`);
    //     delete onlineUsers[socket.id]
    // });
    // // io.sockets.sockets['jaflkjalkjefsukjh'].emit('hiDavid')
    //
    // ///// receiving from the client and the server fowards it to the other client ///////
    // socket.on("privateMessage", data => {
    //     io.sockets.sockets[data.socketId].emit('privateMessage')
    // })
    //
    // socket.on('thanks', function(data) {
    //     console.log(data);
    // });
    //
    // socket.on("newMessage", message => {
    //     db.saveMessage(socket.request.session.user.id, message).then( data => {
    //         db.getUserById(userId).then(userInfo => {
    //             let newMessage = {
    //                 message: data.message,
    //                 sender_id: data.sender_id,
    //                 id: data.id,
    //                 created_at: data.created_at,
    //                 first_name: userInfo.first_name,
    //                 last_name: userInfo.last_name,
    //                 image_url: userInfo.image_url || '/content/default_profile_picture.png'
    //             }
    //             io.sockets.emit("newMessage", newMessage)
    //         })
    //     })
    // })
    //
    // db.getMessages().then( messages => {
    //     for (let message of messages) {
    //         message.image_url = message.image_url || '/content/default_profile_picture.png'
    //     }
    //     socket.emit("chatMessages", messages)
    // })
    //
    // socket.emit('welcome', {
    //     message: 'Welome. It is nice to see you'
    // });
});
