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
                req.session.user = {id: userInfo.id, first_name: first_name, last_name: last_name, email: email, currently_at: userInfo.currently_at}
                res.json({
                    success: true,
                    id: userInfo.id,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    currently_at: userInfo.currently_at
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
                        req.session.user = {id: userInfo.id, firstName: userInfo.first_name, lastName: userInfo.last_name, email: userInfo.email, currently_at: userInfo.currently_at}
                        res.json({
                            success: true,
                            id: userInfo.id,
                            first_name: userInfo.first_name,
                            last_name: userInfo.last_name,
                            email: userInfo.email,
                            currently_at: userInfo.currently_at
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
    db.changeUserProfilePic(req.session.user.id, config.s3Url + req.file.filename).then(imgUrl => {
        res.json({
            success: true,
            profile_image_url: imgUrl
        })
    })
})

app.post("/editprofile.json", (req, res) => {
    const {age, birth_city, birth_country, password, email, last_name, first_name} = req.body
    if ((password == "" || null) || !password) {
        db.updateUserNoPassword(req.session.user.id, first_name, last_name, email, birth_city, birth_country).then(userInfo => {
            res.json({userInfo})
        })
    } else {
        bcrypt.hashPassword(password).then(hashedPassword => {
            db.updateUser(req.session.user.id, first_name, last_name, email, hashedPassword, birth_city, birth_country).then(userInfo => {
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
    db.checkInOut(req.session.user.id, !req.body.checked_in).then( newStatus => {
        res.json({
            checked_in: newStatus
        })
    })
})

app.post("/savePaymentInfo.json", (req, res) => {
    db.savePaymentInfo(req.session.user.id, req.body.card_number, req.body.expiration_month, req.body.expiration_year, req.body.CCV)
        .then( payment_info => {
            res.json({
                success: true,
                payment_info: payment_info
            })
        })
})

app.post("/newReservation.json", (req, res) => {
    db.newReservation(req.session.user.id, req.body.location_id, req.body.arrival_date, req.body.departure_date)
        .then(userInfo => {
            res.json({
                success: true,
                userInfo: userInfo
            })
        })
})

app.post("/new-hostel.json", (req, res) => {
    db.newHostel(city_name, area, coordinates, street, num, postal_code, hostel_main_img, total_num_beds, num_beds_left)
        .then(newHostelInfo => {
            res.json({
                newHostelInfo: newHostelInfo
            })
        })
})

app.get("/reservations.json", (req, res) => {
    db.getUsersReservations(req.session.user.id)
        .then( reservations => {
            res.json({
                reservations
            })
        })
})

app.get("/user/:id.json", (req, res) => {
    if (req.session.user.id == req.params.id) {
        res.json({
            redirect: true
        })
    } else {
        db.getUserById(req.params.id).then(data => {
            res.json({
                ...data,
                profile_image_url: data.profile_image_url || '/content/default_profile_picture.png'
            })
        })
    }
})

app.get("/friend/:id.json", (req, res) => {
    db.getCurrentStatus(req.session.user.id, req.params.id).then(data => {
        res.json(data && {
            sessionUserId: req.session.user.id,
            status: data.status,
            senderId: data.sender_id,
            receiverId: data.receiver_id
        })
    }).catch(err => {
        console.log(err);
    })
})

app.post("/friend/:id.json", (req, res) => {
    db.setStatus(req.session.user.id, req.params.id).then(data => {
        res.json({
            sessionUserId: req.session.user.id,
            status: 1,
            senderId: data.sender_id,
            receiverId: data.receiver_id
        })
    }).catch(err => {
        console.log(err);
    })
})

app.post("/terminate/:id.json", (req, res) => {
    db.deleteFriend(req.session.user.id, req.params.id).then(data => {
        res.json({
            sessionUserId: req.session.user.id,
            status: null,
        })
    }).catch(err => {
        console.log(err);
    })
})

app.post("/accept/:id.json", (req, res) => {
    db.acceptFriend(req.session.user.id, req.params.id).then(data => {
        console.log("accept friend data: ", data);
        res.json({
            sessionUserId: req.session.user.id,
            status: 2,
            senderId: data.sender_id,
            receiverId: data.receiver_id
        })
    }).catch(err => {
        console.log(err);
    })
})

app.get('/friendsWannabes.json', (req, res) => {
    db.getFriendsWannabes(req.session.user.id).then(friendsWannabes => {
        for (let user of friendsWannabes) {
            user.profile_image_url = user.profile_image_url || '/content/default_profile_picture.png'
        }
        res.json({friendsWannabes})
    })
})

app.get("/locations.json", (req, res) => {
    console.log("getting to get locations");
    db.getLocations().then( locations => {
        console.log("locations data: ", locations);
        res.json(locations)
    })
})

app.post("/newEvent.json", (req, res) => {
    // console.log("req.body at newEvent: ", req.body)
    var maxNumAttendees = parseInt(req.body.max_num_attendees)
    var locationId = parseInt(req.body.location_id)
    // console.log("maxNumAttendees after numerify: ", maxNumAttendees); // numerify
    db.createNewEvent(locationId, req.body.event_time, req.body.event_name, req.body.event_description, maxNumAttendees, maxNumAttendees, req.session.user.id)
        .then( data => {
            res.json({
                success: true,
                data: data
            })
        }).catch(err => {
            console.log(err);
            res.json({
                error: true
            })
        })
})

app.get("/events-and-attendees.json", (req, res) => {
    Promise.all([
        db.getEvents(),
        db.getAttendees()
    ]).then(([events, attendees]) => {
        const user_eventsByEvent_id = {};

        attendees.forEach(attendee => {
            if (!user_eventsByEvent_id[attendee.event_id]) {
                user_eventsByEvent_id[attendee.event_id] = [];
            }
            user_eventsByEvent_id[attendee.event_id].push(attendee)
            attendee.profile_image_url = attendee.profile_image_url || '/content/default_profile_picture.png'
        })

        // console.log("user_eventsByEvent_id: ", user_eventsByEvent_id);
        events.forEach( event => {
            event.attendees = user_eventsByEvent_id[event.id]
            event.attending = event.attendees && event.attendees.some( attendee => attendee.id == req.session.user.id )
        })
        console.log("events: ", events);
        res.json({events})
    })
})

app.post("/attend-event.json", (req, res) => {
    console.log("req.body at attend-event: ", req.body);
    var eventId = parseInt(req.body.event_id)
    db.attendEvent(eventId, req.session.user.id)
        .then( data => {
            console.log("attend-event data sent: ", data);
            res.json({
                success: true,
                data
            })
        })
})

app.post('/user-events.json', (req, res) => {
    console.log('req.body: ', req.body);
    console.log("req.body.event_id: ", req.body.event_id, " req.body.user_id: ", req.body.user_id);
    db.getUserEvents(req.body.event_id, req.body.user_id)
        .then(data => {
            if (data == undefined) {
                console.log("returned data on server: ", data);
                res.json({attending: false})
            } else {
                res.json({attending: true})
            }
        })
})

app.get("/check-in", (req, res) => {
    db.getCheckedInUsers().then( checkedInUsers => {
        console.log("checkedInUsers: ", checkedInUsers);
        for (let user of checkedInUsers) {
            user.profile_image_url = user.profile_image_url || '/content/default_profile_picture.png'
        }
        res.json({checkedInUsers})
    })
})

app.get("/user-location", (req, res) => {
    db.userLocation(req.session.user.id)
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
    if(!req.session.user) {
        res.redirect("/welcome")
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

server.listen(8080, function() {
    console.log("I'm listening.");
});

let onlineUsers = {};

io.on('connection', function(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);

    if (!socket.request.session || !socket.request.session.user.id) {
        return socket.disconnect(true);
    }

    const userId = socket.request.session.user.id

    onlineUsers[socket.id] = userId

    if (Object.values(onlineUsers).filter(
        id => id == userId
    ).length == 1) {
        // or db query to get the data, and pass it as the 2nd argument (better)
        db.getUserById(userId).then(userInfo => {
            socket.broadcast.emit('userJoined', {
                id: userId,
                first_name: userInfo.first_name,
                last_name: userInfo.last_name,
                profile_image_url: userInfo.profile_image_url || '/content/default_profile_picture.png'
            })
        })
    }

    db.getUsersByIds(Object.values(onlineUsers)).then(onlineUsers => {
            for (let user of onlineUsers) {
                user.profile_image_url = user.profile_image_url || '/content/default_profile_picture.png'
            }
            socket.emit('onlineUsers', onlineUsers)
        }
    )

    socket.on('disconnect', function() {
        io.emit('userLeft', userId)
        console.log(`socket with the id ${socket.id} is now disconnected`);
        delete onlineUsers[socket.id]
    });
    // io.sockets.sockets['jaflkjalkjefsukjh'].emit('hiDavid')

    ///// receiving from the client and the server fowards it to the other client ///////
    socket.on("privateMessage", data => {
        io.sockets.sockets[data.socketId].emit('privateMessage')
    })

    socket.on('thanks', function(data) {
        console.log(data);
    });

    socket.on("newMessage", message => {
        db.saveMessage(socket.request.session.user.id, message, socket.request.session.user.currently_at).then( data => {
            db.getUserById(userId).then( userInfo => {
                let newMessage = {
                    message: data.message,
                    sender_id: data.sender_id,
                    id: data.id,
                    location_id: data.location_id,
                    created_at: data.created_at,
                    first_name: userInfo.first_name,
                    last_name: userInfo.last_name,
                    profile_image_url: userInfo.profile_image_url || '/content/default_profile_picture.png'
                }
                io.sockets.emit("newMessage", newMessage)
            })
        })
    })

    db.getMessages().then( messages => {
        for (let message of messages) {
            message.profile_image_url = message.profile_image_url || '/content/default_profile_picture.png'
        }
        socket.emit("chatMessages", messages)
    })

    socket.emit('welcome', {
        message: 'Welome. It is nice to see you'
    });
});
