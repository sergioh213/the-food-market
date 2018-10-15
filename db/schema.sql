-- DROP TABLE IF EXISTS producers;
-- DROP TABLE IF EXISTS production_facilities_images;
-- DROP TABLE IF EXISTS production_facilities;
-- DROP TABLE IF EXISTS general_messages;
--
-- CREATE TABLE producers (
--     id SERIAL PRIMARY KEY,
--     company_legal_name VARCHAR(100) NOT NULL,
--     email VARCHAR(100) NOT NULL UNIQUE,
--     hashed_password VARCHAR(100) NOT NULL,
--     company_type INT NOT NULL,
--     company_image_url VARCHAR(300),
--     company_description VARCHAR(500),
--     company_score INT DEFAULT 50 CHECK (company_score >= 0 AND company_score <= 100),
--     payment_card_number VARCHAR(40),
--     payment_card_expiration_month INT,
--     payment_card_expiration_year INT,
--     payment_card_ccv INT,
--     bank_account_number VARCHAR(40),
--     bank_iban VARCHAR(40),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     headquarter_google_maps_place_id VARCHAR(500),
--     headquarter_formatted_address VARCHAR(200),
--     headquarter_latitude VARCHAR(100),
--     headquarter_longitude VARCHAR(100),
--     company_website_url VARCHAR(300)
-- );
--
-- CREATE TABLE production_facilities (
--     id SERIAL PRIMARY KEY,
--     owner INT NOT NULL REFERENCES producers(id),
--     google_maps_place_id VARCHAR(500) NOT NULL,
--     formatted_address VARCHAR(200) NOT NULL,
--     latitude VARCHAR(100) NOT NULL,
--     longitude VARCHAR(100) NOT NULL,
--     facility_name VARCHAR(200),
--     how_to_arrive_text VARCHAR(600),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
--
-- CREATE TABLE production_facilities_images (
--     id SERIAL PRIMARY KEY,
--     facility INT NOT NULL REFERENCES production_facilities(id),
--     image_url VARCHAR(500) NOT NULL,
--     uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
--
-- CREATE TABLE general_messages (
--     id SERIAL PRIMARY KEY,
--     sender_id INT REFERENCES producers(id),
--     message VARCHAR(400),
--     -- chat_id INT NOT NULL REFERENCES chat_rooms(id),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
--
-- CREATE TABLE private_messages (
--     id SERIAL PRIMARY KEY,
--     sender_id INT REFERENCES producers(id),
--     receiver_id INT REFERENCES producers(id),
--     message VARCHAR(400),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

CREATE TABLE rolls (
    id SERIAL PRIMARY KEY,
    company INT REFERENCES producers(id),
    roll_name VARCHAR(100),
    roll_description VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    hashed_password VARCHAR(100) NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    user_lastname VARCHAR(100),
    profile_image_url VARCHAR(300),
    user_bio VARCHAR(500),
    user_roll INT REFERENCES rolls(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ALTER TABLE rolls ADD roll_name VARCHAR(100);
-- ALTER TABLE producers DROP column_name, DROP column_name2;
-- ALTER TABLE users DROP works_for;
-- UPDATE producers SET headquarter_google_maps_place_id = NULL, headquarter_formatted_address = NULL, headquarter_latitude = NULL, headquarter_longitude = NULL WHERE id = 1;
-- UPDATE producers SET bank_account_number = NULL, bank_iban = NULL WHERE id = 1;
-- UPDATE producers SET payment_card_number = NULL WHERE id = 1;
