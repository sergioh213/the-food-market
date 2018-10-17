const spicedPg = require("spiced-pg")
const accounts = require("./AutomaticAccountGenerator.js");
let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL)
} else {
    db = spicedPg('postgres:sergioherrero:password@localhost:5432/food-market');
}

/////// uncoment to generate profiles ////////
async function automaticallyGenerateAccounts(desiredAmountOfUsers, desiredAmountOfCompanies){
    getAllProducers = async function() {
            return db.query(`SELECT * FROM producers;`)
            .then(results => {
                return results.rows
            })
        }
    getAllUsers = async function() {
        return db.query(`SELECT * FROM users;`)
        .then(results => {
            return results.rows
        })
    }
    getAllRolls = async function() {
        return db.query(`SELECT * FROM rolls;`)
        .then(results => {
            return results.rows
        })
    }
    saveCompany = async function(company_legal_name, email, hashed_password, company_image_url, company_description) {
        const q = `
            INSERT INTO producers (company_legal_name, email, hashed_password, company_type, company_image_url, company_description)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
            `
        const params = [company_legal_name, email, hashed_password, 1, company_image_url, company_description]
        return db.query(q, params).then(results => {
            return results.rows[0]
        })
    }
    saveRoll = async function(company, roll_name, roll_description) {
        const q = `
            INSERT INTO rolls (company, roll_name, roll_description)
            VALUES ($1, $2, $3)
            RETURNING *;
            `
        const params = [company, roll_name, roll_description]
        return db.query(q, params).then(results => {
            return results.rows[0]
        })
    }
    saveUser = async function(email, hashed_password, user_name, user_lastname, profile_image_url, user_bio, user_roll) {
        const q = `
            INSERT INTO users (email, hashed_password, user_name, user_lastname, profile_image_url, user_bio, user_roll)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
            `
        const params = [email, hashed_password, user_name, user_lastname, profile_image_url, user_bio, user_roll]
        return db.query(q, params).then(results => {
            return results.rows[0]
        })
    }
    ////////// companies ///////////
    var existingCompanies = await getAllProducers()

    if (existingCompanies.length <= 100) {
        var numberOfCompaniesToCreate = desiredAmountOfCompanies - existingCompanies.length
        var generatedCompanies = await accounts.createCompanies(numberOfCompaniesToCreate, desiredAmountOfCompanies)
        var finalCompanies
        await generatedCompanies.forEach(company => {
            saveCompany(company.company_legal_name, company.email, company.hashed_password, company.company_image_url, company.company_description)
        })
        existingCompanies = await getAllProducers()
    } else {
        return console.log("AUTOMATIC GENERATION FAILED. 100 COMPANIES REACHED");
    }
    ////////// create rolls ///////////
    var existingRolls = await getAllRolls()
    console.log("existingRolls.length: ", existingRolls.length, " existingCompanies.length: ", existingCompanies.length);
    if (existingRolls.length <= existingCompanies.length) {
        console.log("got inside creation of rolls");
        var numOfRollsToCreate = existingCompanies.length - existingRolls.length
        var finalRolls = await accounts.createRolls(numOfRollsToCreate)
        await finalRolls.forEach(roll => {
            saveRoll(roll.company, roll.roll_name, roll.roll_description)
        })
        existingRolls = await getAllRolls()
    } else {
        return console.log("AUTOMATIC GENERATION FAILED. 100 ROLLS REACHED");
    }
    ////////// users ///////////
    var ExistingUsers = await getAllUsers()

    if (ExistingUsers.length <= 100) {
        var numberOfUsersToCreate = desiredAmountOfUsers - ExistingUsers.length
        var generatedUsers = await accounts.createUsers(numberOfUsersToCreate, desiredAmountOfUsers, existingRolls.length)
        await generatedUsers.forEach(user => {
            saveUser(user.email, user.hashed_password, user.user_name, user.user_lastname, user.profile_image_url, user.user_bio, user.user_roll)
        })
    } else {
        return console.log("AUTOMATIC GENERATION FAILED. 100 USERS REACHED");
    }
    console.log("generatedCompanies: ", generatedCompanies);
    console.log("generatedUsers: ", generatedUsers);
}
// automaticallyGenerateAccounts(100, 100)

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

exports.getAllProducers = function() {
    return db.query(`SELECT * FROM producers;`)
        .then(results => {
            return results.rows
        })
}
exports.getAllUsers = function() {
    return db.query(`SELECT * FROM users;`)
        .then(results => {
            return results.rows
        })
}

exports.getProductionFacilitiesById = function(id) {
    const params = [id]
    return db.query(`SELECT * FROM production_facilities WHERE owner = $1;`, params)
        .then(results => {
            return results.rows
        })
}
exports.getProductionFacilitiesImages = function(id) {
    const params = [id]
    return db.query(`SELECT * FROM production_facilities_images WHERE facility = $1;`, params)
        .then(results => {
            return results.rows
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

exports.changeCompanyLogoImage = function(user_id, company_image_url) {
    const params = [user_id, company_image_url];
    const q = `
        UPDATE producers SET
        company_image_url = $2
        WHERE id = $1
        RETURNING *;
        `;
    return db.query(q, params).then(userInfo => {
        return userInfo.rows[0].company_image_url
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
        return updatedCompanyName.rows[0].company_legal_name;
    });
};

exports.updateHeadquarters = function(id, headquarter_google_maps_place_id, headquarter_formatted_address, headquarter_latitude, headquarter_longitude) {
    const q = `
        UPDATE producers SET headquarter_google_maps_place_id = $2, headquarter_formatted_address = $3, headquarter_latitude = $4, headquarter_longitude = $5
        WHERE id = $1
        RETURNING *;
    `;
    const params = [id, headquarter_google_maps_place_id, headquarter_formatted_address, headquarter_latitude, headquarter_longitude];
    return db.query(q, params).then(updatedCompanyInfo => {
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

exports.saveNewFacility = function(owner, google_maps_place_id, formatted_address, latitude, longitude, facility_name, how_to_arrive_text) {
    const params = [owner, google_maps_place_id, formatted_address, latitude, longitude, facility_name, how_to_arrive_text]
    const q = `
        INSERT INTO production_facilities (owner, google_maps_place_id, formatted_address, latitude, longitude, facility_name, how_to_arrive_text)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
        `
    return db.query(q, params).then(newFacilityInfo => {
        return newFacilityInfo.rows[0]
    })
}

exports.saveFacilityImage = function(facility, image_url) {
    const params = [facility, image_url]
    const q = `
    INSERT INTO production_facilities_images (facility, image_url)
    VALUES ($1, $2)
    RETURNING *;
    `
    return db.query(q, params).then(image => {
        return image.rows[0].image_url
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
        SELECT general_messages.id, producers.company_legal_name, producers.company_image_url, general_messages.message, general_messages.sender_id, general_messages.created_at
        FROM general_messages
        JOIN producers
        ON general_messages.sender_id = producers.id
        `
        // ORDER BY general_messages.id DESC LIMIT 9;
    return db.query(q)
        .then(results => {
            return results.rows.sort( (a, b) => {
                return a.id - b.id
            })
        })
}

exports.saveMessage = function(userId, message) {
    const params = [userId, message]
    const q = `
            INSERT INTO general_messages (sender_id, message)
            VALUES ($1, $2)
            RETURNING *;
        `;
    return db.query(q, params).then(results => {
        return results.rows[0]
    })
}

// INSERT INTO locations (city_name, area, coordinates, street, num, postal_code, hostel_main_img, total_num_beds, num_beds_left) VALUES ('Berlin', 'KREUZBERG', '420-620', 'Erkelenzdamm', '35-21', '10999', '/content/header-pic-1.jpg', 8, 8);
// INSERT INTO locations (city_name, area, coordinates, street, num, postal_code, hostel_main_img, total_num_beds, num_beds_left) VALUES ('Berlin', 'EAST MITTE', '395-480', 'Alexanderstraße', '7', '10178', '/content/header-pic-2.jpg', 3, 3);
// INSERT INTO locations (city_name, area, coordinates, street, num, postal_code, hostel_main_img, total_num_beds, num_beds_left) VALUES ('Berlin', 'NORTH MITTE', '555-390', 'Chausseestraße', '61', '10115', '/content/header-pic-3.jpg', 14, 14);
