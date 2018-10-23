const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser')
const db = require("./db/db.js");
const accounts = require("./db/AutomaticAccountGenerator.js");
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

const {
    getPlaceId,
    autoCompletePlace,
    getPlaceDetails,
    getPlaceIdByText,
    getPlaceIdByCoords
} = require("./googlePlace");

let domain
if (process.env.NODE_ENV == "production") {
    domain = 'https://the-food-market.herokuapp.com:*'
} else {
    domain = 'localhost:8080'
}

const io = require('socket.io')(server, { origins: domain });

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

//////////////// ROUTES ///////////////////

app.get("/user-cookies.json", (req, res) => {
    console.log("getting to get user-cookies.json.json");
    if ( req.session.cookiesAccepted ) {
        res.json({ hasAccepted: true })
    } else {
        res.json({ hasAccepted: false })
    }
})

app.post("/user-cookies.json", (req, res) => {
    console.log("getting to post user-cookies.json.json");
    console.log("body: ", req.body);
    if ( req.body.clientAccepted ) {
        console.log("getting into first if");
        req.session.cookiesAccepted = true
        res.json({ hasAccepted: true })
    } else {
        console.log("getting into else");
        res.json({ hasAccepted: false })
    }
})

app.post("/new-producer.json", (req, res) => {
    const {company_legal_name, email, password} = req.body
    if (
        company_legal_name == ""
        || email == ""
        || password == ""
    ) {
        res.json({
            error: "Please, fill in all the fields"
        })
    } else {
        bcrypt.hashPassword(password)
        .then(hashedPassword => {
            db.newProducer(company_legal_name, email, hashedPassword)
            .then(companyInfo => {
                req.session.user = {id: companyInfo.id, company_legal_name: company_legal_name, email: email, company_type: companyInfo.company_type}
                res.json({
                    success: true,
                    id: companyInfo.id,
                    company_legal_name: company_legal_name,
                    email: email,
                    company_type: companyInfo.company_type
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
    db.getProducerByEmail(req.body.email).then(companyInfo => {
        if (companyInfo && companyInfo.email) {
            bcrypt.checkPassword(req.body.password, companyInfo.hashed_password)
                .then(passwordsMatch => {
                    if(passwordsMatch) {
                        var companyImageUrl = companyInfo.company_image_url || '/content/default_company_logo_picture.png'
                        req.session.user = {id: companyInfo.id, company_legal_name: companyInfo.company_legal_name, lastName: companyInfo.last_name, email: companyInfo.email, company_type: companyInfo.company_type, company_image_url: companyImageUrl}
                        res.json({
                            success: true,
                            id: companyInfo.id,
                            company_legal_name: companyInfo.company_legal_name,
                            email: companyInfo.email,
                            company_type: companyInfo.company_type,
                            company_image_url: companyInfo.company_image_url || '/content/default_company_logo_picture.png'
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

app.get("/producer.json", (req, res) => {
    db.getProducerById(req.session.user.id).then(companyInfo => {
        res.json({
            ...companyInfo,
            company_image_url: companyInfo.company_image_url || '/content/default_company_logo_picture.png'
        })
    }).catch((err) => {
        res.sendStatus(500)
    })
})

app.get("/all-companies.json", (req, res) => {
    console.log("getting to /all-companies.json");
    db.getAllProducers().then(producers => {
        res.json({ producers })
    }).catch((err) => {
        res.sendStatus(500)
    })
})
app.get("/all-users.json", (req, res) => {
    console.log("getting to /all-users.json");
    db.getAllUsers().then(users => {
        res.json({ users })
    }).catch((err) => {
        res.sendStatus(500)
    })
})


app.get("/production-facilities.json", (req, res) => {
    db.getProductionFacilitiesById(req.session.user.id).then(productionFacilities => {
        productionFacilities.map(facility => {
            db.getProductionFacilitiesImages(facility.id).then(images => {
                facility.images_urls = images
            })
        })
        setTimeout(()=>{
            res.json({
                productionFacilities: productionFacilities
            })
        }, 500)
    }).catch((err) => {
        res.sendStatus(500)
    })
})

app.get("/place", async (req, res) => {
    const place = req.query.input;
    const placeId = await getPlaceId(place);
    const result = await getPlaceDetails(placeId[0])
    res.json(result);
});

app.get("/place-coordinates", async (req, res) => {
    const place = req.query.input;
    const result = await getPlaceIdByCoords(place)
    res.json(result);
})

app.get("/place-text", async (req, res) => {
    const place = req.query.input;
    const result = await getPlaceIdByText(place);
    res.json(result);
});

app.get("/place-details", async (req, res) => {
    const placeId = req.query.input;
    const result = await getPlaceDetails(placeId);
    res.json(result);
})

app.get("/place-autocomplete", async (req, res) => {
    const place = req.query.input;
    const result = await autoCompletePlace(place);
    res.json(result);
});

app.post("/change-company-name.json", (req, res) => {
    console.log("req.body at /change-company-name.json: ", req.body);
    db.updateCompanyName(req.session.user.id, req.body.new_company_name).then(companyName => {
        res.json({
            name_change_success: true,
            company_legal_name: companyName
        })
    })
})

app.post("/save-headquarters.json", (req, res) => {
    console.log("req.body at /save-headquarters.json: ", req.body);
    db.updateHeadquarters(req.session.user.id, req.body.placeId, req.body.address, req.body.latitude , req.body.longitude)
        .then(newCompanyInfo => {
            res.json({
                success: true,
                ...newCompanyInfo
            })
        })
})
app.post("/save-production-facility.json", (req, res) => {
    console.log("req.body at /save-production-facility.json: ", req.body);
    db.saveProductionFacility()
        .then(newFacilityInfo => {
            res.json({
                success: true,
                ...newFacilityInfo
            })
        })
})

app.post("/company-logo-upload.json", uploader.single('file'), s3.upload, (req, res) => {
    console.log("getting to /company-logo-upload.json");
    db.changeCompanyLogoImage(req.session.user.id, config.s3Url + req.file.filename).then(imgUrl => {
        req.session.user = {company_image_url: imgUrl}
        console.log("imgUrl as returned from db: ", imgUrl);
        res.json({
            success: true,
            company_image_url: imgUrl
        })
    })
})
app.post('/upload-facility-images.json', uploader.array('file',10), s3.upload, (req, res) => {
    console.log("getting to '/upload-facility-images.json'");
    console.log("HEREEEEEEEEEEEEEEEEEEEEEEEEEEE\n req after s3: ", req);
    console.log("HEREEEEEEEEEEEEEEEEEEEEEEEEEEE\n res after s3: ", res);
    var imagesUrls = []
    req.files.forEach(singleFile => {
        imagesUrls.push(config.s3Url + singleFile.filename)
    })
    // var imageUrl = config.s3Url + req.file.filename
    // console.log("imageUrl at facilities upload: ", imageUrl);
    console.log("imagesUrls before sending: ", imagesUrls);
    res.json({
        success: true,
        imagesUrls: imagesUrls
    })
})

app.post("/save-new-complete-facility.json", (req, res) => {
    console.log("req.body at /save-new-complete-facility.json: ", req.body);
    db.saveNewFacility(
        req.session.user.id,
        req.body.google_maps_place_id,
        req.body.formatted_address,
        req.body.latitude,
        req.body.longitude,
        req.body.facility_name,
        req.body.how_to_arrive_text
    ).then(newFacilityInfo => {
        if (req.body.arrayOfImagesUrls && req.body.arrayOfImagesUrls.length) {
            var arrayOfReturnedImages = []
            req.body.arrayOfImagesUrls.forEach(image_url => {
                db.saveFacilityImage(newFacilityInfo.id, image_url).then(newImage_url => {
                    arrayOfReturnedImages.push(newImage_url)
                })
            })
            setTimeout(()=>{
                console.log("arrayOfReturnedImages: ", arrayOfReturnedImages);
                res.json({
                    success: true,
                    newFacilityInfo: {
                        ...newFacilityInfo,
                        images_urls: arrayOfReturnedImages
                    }
                })
            }, 500)
        } else {
            res.json({
                success: true,
                newFacilityInfo: newFacilityInfo
            })
        }
    })
})

app.post("/company-description.json", (req, res) => {
    db.saveDescription(req.session.user.id, req.body.companyDescription).then(companyDescription => {
        res.json({companyDescription})
    })
})

app.post("/savePaymentInfo.json", (req, res) => {
    console.log("/savePaymentInfo.json: ", req.body);
    db.savePaymentInfo(req.session.user.id, req.body.card_number, req.body.expiration_month, req.body.expiration_year, req.body.CCV)
        .then( payment_info => {
            res.json({
                success: true,
                payment_info: payment_info
            })
        })
})

app.post("/saveBankInfo.json", (req, res) => {
    console.log("/saveBankInfo.json: ", req.body);
    db.saveBankInfo(req.session.user.id, req.body.bank_account_number, req.body.bank_iban)
        .then( bankInfo => {
            console.log("bankInfo when returning from db: ", bankInfo);
            res.json({
                success: true,
                bank_info: bankInfo
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
    console.log("getting to /user/", req.params.id);
    if (req.session.user.id == req.params.id) {
        res.json({
            redirect: true
        })
    } else {
        db.getProducerById(req.params.id).then(data => {
            console.log("data received from db at opp route: ", data);
            res.json({
                ...data,
                company_image_url: data.company_image_url || '/content/default_company_logo_picture.png'
            })
        })
    }
})

app.post("/conversation", (req, res) => {
    db.getPrivateConversation(req.session.user.id, req.body.id).then(messages => {
        res.json({
            messages: messages
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
    if(!req.session.user) {
        res.redirect("/welcome")
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

server.listen(process.env.PORT || 8080, function() {
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
        db.getProducerById(userId).then(companyInfo => {
            socket.broadcast.emit('userJoined', {
                id: userId,
                company_legal_name: companyInfo.company_legal_name,
                company_image_url: companyInfo.company_image_url || '/content/default_company_logo_picture.png'
            })
        })
    }

    db.getCompaniesByIds(Object.values(onlineUsers)).then(onlineUsers => {
            for (let user of onlineUsers) {
                user.company_image_url = user.company_image_url || '/content/default_company_logo_picture.png'
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

    socket.on("privateMessage", async message => {
        // console.log("privateMessage data: ", data);
        // console.log("HERE data.profile: ", data.profile);
        // var previousArrayOfMessages = data.messages
        // var newProfile = data.profile
        // var message = await previousArrayOfMessages.splice(-1)[0]
        console.log("RECEIVED MESSAGE message: ", message, " message.receiver_id: ", message.receiver_id, " message.message: ", message.message);
        var newMessage = {}
        await db.savePrivateMessage(userId, message.receiver_id, message.message).then(returnedMessage => {
            console.log("returnedMessage after db: ", returnedMessage);
            newMessage = {
                sender_id: returnedMessage.sender_id,
                receiver_id: returnedMessage.receiver_id,
                message: returnedMessage.message,
                id: returnedMessage.id,
                created_at: returnedMessage.created_at
            }
        })
        // console.log("after await savePrivateMessage: ", newMessage);
        // await previousArrayOfMessages.push(newMessage)
        var userSocketIdToReceive
        for (var socketId in onlineUsers) {
            console.log("TTHINGS USED IN THE LOOP: \nsocketId: ", socketId, "\nonlineUsers: ", onlineUsers, "\nnewMessage.receiver_id: ", newMessage.receiver_id);
            if (onlineUsers[socketId] === newMessage.receiver_id) {
                console.log("ids match!!!!!!");
                console.log();
                userSocketIdToReceive = socketId
                break
            }
        }
        // var newData = {
        //     messages: previousArrayOfMessages,
        //     profile: newProfile
        //
        console.log("HERE userSocketIdToReceive: ", userSocketIdToReceive);
        io.sockets.sockets[userSocketIdToReceive].emit('privateMessage', newMessage)
    })

    socket.on('thanks', function(data) {
        console.log(data);
    });

    socket.on("newMessage", async messages => {
        console.log("2- socket newChatMessage RECEIVE 2 with message text: ", messages);
        console.log("event newMessage, width message: ", messages);
        var message = messages.splice(-1)[0]
        var newMessage = {}
        await db.saveMessage(userId, message).then(data => {
            newMessage = {
                message: data.message,
                sender_id: data.sender_id,
                id: data.id,
                created_at: data.created_at,
                company_legal_name: socket.request.session.user.company_legal_name,
                company_image_url: socket.request.session.user.company_image_url || '/content/default_company_logo_picture.png'
            }
        })
        await messages.push(newMessage)
        console.log("3- socket newChatMessage EMIT 2 with message text: ", messages);
        await io.sockets.emit("newMessage", messages)
    })

    db.getMessages().then( messages => {
        for (let message of messages) {
            message.company_image_url = message.company_image_url || '/content/default_company_logo_picture.png'
        }
        socket.emit("chatMessages", messages)
    })

    socket.emit('welcome', {
        message: 'Welome. It is nice to see you'
    });
});
