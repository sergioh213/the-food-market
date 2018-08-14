-- DROP TABLE IF EXISTS locations;
-- DROP TABLE IF EXISTS connections;
-- DROP TABLE IF EXISTS chat;
-- DROP TABLE IF EXISTS user_lenguages;
-- DROP TABLE IF EXISTS user_images;
-- DROP TABLE IF EXISTS user_notes;
-- DROP TABLE IF EXISTS users;

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    city_name VARCHAR(100),
    street VARCHAR(400),
    num VARCHAR(10),
    postal_code VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    hashed_password VARCHAR(100) NOT NULL,
    profile_image_url VARCHAR(300),
    bio VARCHAR(400),
    currently_at VARCHAR(100) REFERENCES locations(city_name),
    checked_in BOOLEAN DEFAULT false,
    -- checked_in status 1 = currently there // status 2 = not in location
    user_score INT DEFAULT 50 CHECK (user_score >= 0 AND user_score <= 100),
    birth_city VARCHAR(100),
    birth_country VARCHAR(100),
    payment_info VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE connections (
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id),
    receiver_id INT REFERENCES users(id),
    status INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);


CREATE TABLE chat (
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id),
    message VARCHAR(400),
    location VARCHAR(100) REFERENCES locations(city_name),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_lenguages (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    lenguage VARCHAR(400),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_images (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    image_url VARCHAR(400),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_notes (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    sender_id INT REFERENCES users(id),
    note VARCHAR(400),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
