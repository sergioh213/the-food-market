const spicedPg = require("spiced-pg")
let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL)
} else {
    db = spicedPg('postgres:sergioherrero:password@localhost:5432/food-market');
}

exports.newProducer = function(company_legal_name, email, hashed_password) {
    const q = `
        INSERT INTO producers (company_legal_name, email, hashed_password, company_type)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `
    const params = [company_legal_name, email, hashed_password, 1]
    return db.query(q, params).then(results => {
        return results.rows[0]
    })
}

exports.getProducerByEmail = function(email) {
    const params = [email]
    return db.query('SELECT * FROM producers WHERE email = $1;', params)
        .then(results => {
            return results.rows[0]
        })
}

exports.getPasswordDB = function(email) {
    const params = [email]
    return db.query('SELECT hashed_password FROM users WHERE email = $1;', params)
        .then(results => {
            return results.rows[0]
        })
}

exports.getProducerById = function(id) {
    const params = [id]
    return db.query(`SELECT * FROM producers WHERE producers.id = $1;`, params)
        .then(results => {
            return results.rows[0]
        })
}

exports.saveDescription = function(id, company_description) {
    const params = [id, company_description];
    const q = `
        UPDATE producers SET
        company_description = $2
        WHERE id = $1
        RETURNING *;
        `;
    return db.query(q, params).then(userInfo => {
        return userInfo.rows[0].company_description
    })
}

exports.changeUserProfilePic = function(user_id, profile_image_url) {
    const params = [user_id, profile_image_url];
    const q = `
        UPDATE users SET
        profile_image_url = $2
        WHERE id = $1
        RETURNING *;
        `;
    return db.query(q, params).then(userInfo => {
        return userInfo.rows[0].profile_image_url
    })
}

exports.updateUserNoPassword = function(id, first_name, last_name, email, birth_city, birth_country) {
    const q = `
        UPDATE users SET first_name = $2, last_name = $3, email = $4, birth_city = $5, birth_country = $6
        WHERE id = $1
        RETURNING *;
    `;
    const params = [id, first_name, last_name, email, birth_city || null, birth_country || null];
    return db.query(q, params).then(updatedProfile => {
        return updatedProfile.rows[0];
    });
};

exports.updateCompanyName = function(id, company_legal_name) {
    const q = `
        UPDATE producers SET company_legal_name = $2
        WHERE id = $1
        RETURNING *;
    `;
    const params = [id, company_legal_name];
    return db.query(q, params).then(updatedCompanyName => {
        console.log("in db updatedCompanyName.rows[0].company_legal_name: ", updatedCompanyName.rows[0].company_legal_name);
        return updatedCompanyName.rows[0].company_legal_name;
    });
};

exports.updateHeadquarters = function(id, headquarter_google_maps_place_id, headquarter_formatted_address, headquarter_latitude, headquarter_longitude) {
    console.log("loging arguments in db: ", headquarter_google_maps_place_id, ", ", headquarter_formatted_address, ", ", headquarter_latitude, ", ", headquarter_longitude);
    const q = `
        UPDATE producers SET headquarter_google_maps_place_id = $2, headquarter_formatted_address = $3, headquarter_latitude = $4, headquarter_longitude = $5
        WHERE id = $1
        RETURNING *;
    `;
    const params = [id, headquarter_google_maps_place_id, headquarter_formatted_address, headquarter_latitude, headquarter_longitude];
    return db.query(q, params).then(updatedCompanyInfo => {
        console.log("in db updatedCompanyName.rows[0].company_legal_name: ", updatedCompanyInfo.rows[0]);
        return updatedCompanyInfo.rows[0];
    });
};

exports.updateUser = function(id, first_name, last_name, email, hashed_password, birth_city, birth_country) {
    const q = `
        UPDATE users SET first_name = $2, last_name = $3, email = $4, hashed_password = $5, birth_city = $6, birth_country = $7
        WHERE id = $1
        RETURNING *;
    `;
    const params = [id, first_name, last_name, email, hashed_password, birth_city || null, birth_country || null];
    return db.query(q, params).then(updatedProfile => {
        return updatedProfile.rows;
    });
};

exports.checkInOut = function(id, status) {
    const q = `
        UPDATE users SET checked_in = $2
        WHERE id = $1
        RETURNING *;
    `;
    const params = [id, status];
    return db.query(q, params).then(status => {
        return status.rows[0].checked_in;
    });
}

exports.savePaymentInfo = function(id, payment_card_number, payment_card_expiration_month, payment_card_expiration_year, payment_card_ccv) {
    const params = [id, payment_card_number, payment_card_expiration_month, payment_card_expiration_year, payment_card_ccv]
    const q = `
        UPDATE producers SET payment_card_number = $2, payment_card_expiration_month = $3, payment_card_expiration_year = $4, payment_card_ccv = $5
        WHERE id = $1
        RETURNING *;
        `
    return db.query(q, params).then(newPaymentInfo => {
        return newPaymentInfo.rows[0]
    })
}

exports.saveBankInfo = function(id, bank_account_number, bank_iban) {
    const params = [id, bank_account_number, bank_iban]
    const q = `
        UPDATE producers SET bank_account_number = $2, bank_iban = $3
        WHERE id = $1
        RETURNING *;
        `
    return db.query(q, params).then(newBankInfo => {
        return newBankInfo.rows[0]
    })
}

exports.deletePaymentInfo = function(id) {
    const params = [id]
    const q = `
        UPDATE producers
        SET payment_card_number = NULL, payment_card_expiration_month = NULL, payment_card_expiration_year = NULL, payment_card_ccv = NULL
        WHERE id = $1
        RETURNING *;
        `;
    return db.query(q, params).then(results => {
        return results.rows[0]
    })
}
// UPDATE producers SET payment_card_number = NULL, payment_card_expiration_month = NULL, payment_card_expiration_year = NULL, payment_card_ccv = NULL WHERE id = 1;

exports.newReservation = function(user_id, location_id, arrival_date, departure_date) {
    const params = [user_id, location_id, arrival_date, departure_date]
    const q = `
        INSERT INTO user_reservations (user_id, location_id, arrival_date, departure_date)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `
    return db.query(q, params).then(reservationInfo => {
        return reservationInfo.rows[0]
    })
}

exports.getUsersReservations = function(user_id) {
    const params = [user_id]
    return db.query('SELECT * FROM user_reservations WHERE user_id = $1;', params)
        .then(reservations => {
            return reservations.rows
        })
}

exports.getCompaniesByIds = function(ids) {
    const params = [ids]
    const q = `SELECT * FROM producers WHERE id = ANY($1)`;
    return db.query(q, params).then(results => {
        return results.rows
    })
}

exports.getMessages = function() {
    const q = `
        SELECT hostel_chat.id, users.first_name, users.last_name, users.profile_image_url, hostel_chat.message, hostel_chat.sender_id, hostel_chat.created_at, hostel_chat.location_id
        FROM hostel_chat
        JOIN users
        ON hostel_chat.sender_id = users.id
        ORDER BY hostel_chat.id DESC LIMIT 9;
        `
    return db.query(q)
        .then(results => {
            return results.rows.sort( (a, b) => {
                return a.id - b.id
            })
        })
}

exports.saveMessage = function(userId, message, location_id) {
    const params = [userId, message, location_id]
    const q = `
            INSERT INTO hostel_chat (sender_id, message, location_id)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
    return db.query(q, params).then(results => {
        return results.rows[0]
    })
}

exports.getCurrentStatus = function(sender_id, receiver_id) {
    const params = [sender_id, receiver_id]
    const q = `
        SELECT * FROM connections
        WHERE ((sender_id = $1 AND receiver_id = $2)
        OR (sender_id = $2 AND receiver_id = $1))
        `;
    return db.query(q, params).then(results => {
        return results.rows[0]
    }).catch(err => {
        return err
    })
}

exports.setStatus = function(sender_id, receiver_id) {
    const params = [sender_id, receiver_id]
    const q = `
        INSERT INTO connections (sender_id, receiver_id)
        VALUES ($1, $2)
        RETURNING *;
        `;
    return db.query(q, params).then(results => {
        return results.rows[0]
    })
}

exports.deleteFriend = function(sender_id, receiver_id) {
    const params = [sender_id, receiver_id]
    const q = `
        DELETE FROM connections
        WHERE ((sender_id = $1 AND receiver_id = $2)
        OR (sender_id = $2 AND receiver_id = $1));
        `;
    return db.query(q, params).then(results => {
        return results.rows[0]
    })
}

exports.acceptFriend = function(sender_id, receiver_id) {
    const params = [sender_id, receiver_id]
    const q = `
        UPDATE connections
        SET status = 2
        WHERE ((sender_id = $1 AND receiver_id = $2)
        OR (sender_id = $2 AND receiver_id = $1))
        RETURNING *;
        `;
    return db.query(q, params).then(results => {
        console.log("accept in db results.rows[0]: ", results.rows[0]);
        return results.rows[0]
    })
}

// exports.getFriends = function(userid) {
//     const params = [userid]
//     const q = `SELECT * FROM connections
//         WHERE ((sender_id = $1 OR receiver_id = $1)
//         AND (status = 2))
//         `;
//     return db.query(q, params).then(results => {
//         return results.rows
//     })
// }
//
// exports.getWannabes = function(userid) {
//     const params = [userid]
//     const q = `SELECT * FROM connections
//         WHERE (receiver_id = $1
//         AND status = 1)
//         `;
//     return db.query(q, params).then(results => {
//         return results.rows
//     })
// }

exports.getFriendsWannabes = function(userId) {
    const params = [userId]

    const q = `
        SELECT users.id, first_name, last_name, profile_image_url, status
        FROM connections
        JOIN users
        ON (status = 1 AND receiver_id = $1 AND sender_id = users.id)
        OR (status = 2 AND receiver_id = $1 AND sender_id = users.id)
        OR (status = 2 AND sender_id = $1 AND receiver_id = users.id)
    `;

    return db.query(q, params).then(results => {
        return results.rows
    })
}

exports.getLocations = function() {
    const q = `SELECT * FROM locations;`;
    return db.query(q).then(results => {
        return results.rows
    })
}

exports.getLocationsById = function(id) {
    const q = `SELECT * FROM locations WHERE id = $1;`;
    return db.query(q, [id]).then(results => {
        return results.rows[0]
    })
}

exports.createNewEvent = function(location_id, event_time, event_name, event_description, max_num_attendees, num_attendees_left, creator_id) {
    const params = [location_id, event_time, event_name, event_description, max_num_attendees, num_attendees_left, creator_id]
    const q = `
        INSERT INTO events (location_id, event_time, event_name, event_description, max_num_attendees, num_attendees_left, creator_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
        `;
    return db.query(q, params).then(results => {
        return results.rows[0]
    })
}

exports.getEvents = function() {
    const q = `SELECT * FROM events ORDER BY id DESC;`;
    return db.query(q).then(results => {
        return results.rows
    })
}

exports.attendEvent = function(event_id, user_id) {
    const params = [event_id, user_id]
    const q = `
        INSERT INTO user_events (event_id, user_id)
        VALUES ($1, $2)
        RETURNING *;
        `;
    return db.query(q, params).then(results => {
        console.log("in db attendEvent results.rows[0]: ", results.rows[0]);
        return results.rows[0]
    })
}

exports.getAttendees = function() {
    const q = `
        SELECT event_id, users.*
        FROM user_events
        LEFT JOIN users
        ON users.id = user_events.user_id;
    `;
    return db.query(q).then(results => {
        return results.rows
    })
}

exports.getCheckedInUsers = function() {
    const q = `SELECT * FROM users WHERE checked_in = true`;
    return db.query(q).then(results => {
        return results.rows
    })
}

exports.getUserEvents = function(event_id, user_id) {
    const params = [event_id, user_id]
    const q = `SELECT * FROM user_events WHERE (event_id = $1 AND user_id = $2);`;
    return db.query(q, params).then(results => {
        return results.rows[0]
    })
}

exports.newHostel = function(city_name, area, coordinates, street, num, postal_code, hostel_main_img, total_num_beds, num_beds_left) {
    const params = [city_name, area, coordinates, street, num, postal_code, hostel_main_img, total_num_beds, num_beds_left]
    const q = `
        INSERT INTO locations (city_name, area, coordinates, street, num, postal_code, hostel_main_img, total_num_beds, num_beds_left)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
        `
    return db.query(q, params).then(newHostelInfo => {
        return newHostelInfo.rows[0]
    })
}

// INSERT INTO locations (city_name, area, coordinates, street, num, postal_code, hostel_main_img, total_num_beds, num_beds_left) VALUES ('Berlin', 'KREUZBERG', '420-620', 'Erkelenzdamm', '35-21', '10999', '/content/header-pic-1.jpg', 8, 8);
// INSERT INTO locations (city_name, area, coordinates, street, num, postal_code, hostel_main_img, total_num_beds, num_beds_left) VALUES ('Berlin', 'EAST MITTE', '395-480', 'Alexanderstraße', '7', '10178', '/content/header-pic-2.jpg', 3, 3);
// INSERT INTO locations (city_name, area, coordinates, street, num, postal_code, hostel_main_img, total_num_beds, num_beds_left) VALUES ('Berlin', 'NORTH MITTE', '555-390', 'Chausseestraße', '61', '10115', '/content/header-pic-3.jpg', 14, 14);
