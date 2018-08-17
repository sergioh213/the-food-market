-- DROP TABLE IF EXISTS user_reservations;
-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS locations;
-- DROP TABLE IF EXISTS connections;
-- DROP TABLE IF EXISTS hostel_chat;
-- DROP TABLE IF EXISTS user_lenguages;
-- DROP TABLE IF EXISTS user_images;
-- DROP TABLE IF EXISTS user_notes;
DROP TABLE IF EXISTS user_events;
DROP TABLE IF EXISTS events;

-- CREATE TABLE locations (
--     id SERIAL PRIMARY KEY,
--     city_name VARCHAR(100),
--     area VARCHAR(100),
--     coordinates VARCHAR(400),
--     street VARCHAR(400),
--     num VARCHAR(10),
--     postal_code VARCHAR(20),
--     hostel_main_img VARCHAR(300),
--     total_num_beds INT,
--     num_beds_left INT CHECK (num_beds_left >= 0 AND num_beds_left <= total_num_beds),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
--
-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     first_name VARCHAR(100) NOT NULL,
--     last_name VARCHAR(100) NOT NULL,
--     email VARCHAR(100) NOT NULL UNIQUE,
--     hashed_password VARCHAR(100) NOT NULL,
--     profile_image_url VARCHAR(300),
--     bio VARCHAR(400),
--     currently_at INT REFERENCES locations(id),
--     checked_in BOOLEAN DEFAULT false,
--     user_score INT DEFAULT 50 CHECK (user_score >= 0 AND user_score <= 100),
--     birth_city VARCHAR(100),
--     birth_country VARCHAR(100),
--     card_number INT,
--     expiration_month INT,
--     expiration_year INT,
--     CCV INT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE locations_amenities (
--     id SERIAL PRIMARY KEY,
--     location_id INT REFERENCES locations(id),
--     amenity_name VARCHAR(100),
--     amenity_description VARCHAR(400),
--     main_amenity BOOLEAN DEFAULT false,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
--
-- CREATE TABLE user_reservations (
--     id SERIAL PRIMARY KEY,
--     user_id INT NOT NULL REFERENCES users(id),
--     location_id INT NOT NULL REFERENCES locations(id),
--     arrival_date VARCHAR(400) NOT NULL,
--     departure_date VARCHAR(400) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
--
-- CREATE TABLE connections (
--     id SERIAL PRIMARY KEY,
--     sender_id INT REFERENCES users(id),
--     receiver_id INT REFERENCES users(id),
--     status INT DEFAULT 1,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP
-- );

-- CREATE TABLE hostel_chat (
--     id SERIAL PRIMARY KEY,
--     sender_id INT REFERENCES users(id),
--     message VARCHAR(400),
--     location_id INT NOT NULL REFERENCES locations(id),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
--
-- CREATE TABLE user_lenguages (
--     id SERIAL PRIMARY KEY,
--     user_id INT REFERENCES users(id),
--     lenguage VARCHAR(400),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
--
-- CREATE TABLE user_images (
--     id SERIAL PRIMARY KEY,
--     user_id INT REFERENCES users(id),
--     image_url VARCHAR(400),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
--
-- CREATE TABLE user_notes (
--     id SERIAL PRIMARY KEY,
--     user_id INT REFERENCES users(id),
--     sender_id INT REFERENCES users(id),
--     note VARCHAR(400),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    location_id INT NOT NULL REFERENCES locations(id),
    event_time TIMESTAMP NOT NULL,
    event_name VARCHAR(200) NOT NULL,
    event_description VARCHAR(600) NOT NULL,
    max_num_attendees INT NOT NULL,
    num_attendees_left INT CHECK (num_attendees_left >= 0 AND num_attendees_left <= max_num_attendees),
    creator_id INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_events (
    id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(id),
    user_id INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
