const spicedPg = require("spiced-pg")
let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL)
} else {
    db = spicedPg('postgres:sergioherrero:password@localhost:5432/co-living');
}

exports.newUser = function(first_name, last_name, email, hashed_password) {
    const q = `
        INSERT INTO users (first_name, last_name, email, hashed_password, currently_at)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `
    const params = [first_name, last_name, email, hashed_password, 1]
    return db.query(q, params).then(results => {
        return results.rows[0]
    })
}

exports.getEmails = function(email) {
    const params = [email]
    return db.query('SELECT * FROM users WHERE email = $1;', params)
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

exports.getUserById = function(id) {
    const params = [id]
    return db.query('SELECT * FROM users WHERE id = $1;', params)
        .then(results => {
            return results.rows[0]
        })
}

exports.saveBio = function(id, bio) {
    const params = [id, bio];
    const q = `
        UPDATE users SET
        bio = $2
        WHERE id = $1
        RETURNING *;
        `;
    return db.query(q, params).then(userInfo => {
        return userInfo.rows[0].bio
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

exports.saveBio = function(id, bio) {
    const params = [id, bio];
    const q = `
        UPDATE users SET
        bio = $2
        WHERE id = $1
        RETURNING *;
        `;
    return db.query(q, params).then(userInfo => {
        return userInfo.rows[0].bio
    })
}

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

exports.savePaymentInfo = function(id, card_number, expiration_month, expiration_year, CCV) {
    const params = [id, card_number, expiration_month, expiration_year, CCV]
    const q = `
        UPDATE users SET card_number = $2, expiration_month = $3, expiration_year = $4, CCV = $5
        WHERE id = $1
        RETURNING *;
        `
    return db.query(q, params).then(newPaymentInfo => {
        return newPaymentInfo.rows[0]
    })
}

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

exports.getUsersByIds = function(ids) {
    const params = [ids]
    const q = `SELECT * FROM users WHERE id = ANY($1)`;
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
        ORDER BY hostel_chat.id DESC LIMIT 10;
        `
    return db.query(q)
        .then(results => {
            console.log("when getting messages, location Id: ", results.rows);
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
