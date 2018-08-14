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
    const params = [first_name, last_name, email, hashed_password, 'Berlin']
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
    // console.log("bd, id: ", id, "bio: ", bio);
    const params = [id, bio];
    const q = `
        UPDATE users SET
        bio = $2
        WHERE id = $1
        RETURNING *;
        `;
    return db.query(q, params).then(userInfo => {
        // console.log("bio on the db: ", userInfo.rows[0].bio);
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

// exports.updateUser = function(id, name, lastname, email, password) {
//     const q = `
//     UPDATE users
//     SET first_name = $2,
//     last_name = $3,
//     email = $4,
//     hashed_password = $5
//     WHERE id = $1;
//     `;
//     const params = [id, name, lastname, email, password];
//     return db.query(q, params).then(updatedProfile => {
//         return updatedProfile.rows;
//     });
// };

exports.updateUserNoPassword = function(id, first_name, last_name, email, birth_city, birth_country) {
    console.log("db query NO-Password");
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
        INSERT INTO users (id, first_name, last_name, email, hashed_password, birth_city, birth_country)
    7 first_name = $2, last_name = $3, email = $4, hashed_password = $5, birth_city = $6, birth_country = $7;
    `;
    const params = [id, first_name, last_name, email, hashed_password, birth_city || null, birth_country || null];
    return db.query(q, params).then(updatedProfile => {
        return updatedProfile.rows;
    });
};

exports.saveBio = function(id, bio) {
    // console.log("bd, id: ", id, "bio: ", bio);
    const params = [id, bio];
    const q = `
        UPDATE users SET
        bio = $2
        WHERE id = $1
        RETURNING *;
        `;
    return db.query(q, params).then(userInfo => {
        // console.log("bio on the db: ", userInfo.rows[0].bio);
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
        console.log('returning from db: ', status.rows[0].checked_in)
        return status.rows[0].checked_in;
    });
}
