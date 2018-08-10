DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS connections;
DROP TABLE IF EXISTS chat;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS user_lenguages;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    hashed_password VARCHAR(100) NOT NULL,
    image_url VARCHAR(300),
    bio VARCHAR(400),
    currently_at VARCHAR(100) DEFAULT 1 REFERENCES locations(city_name),
    birth_city VARCHAR(100),
    birth_country VARCHAR(100),
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

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    city_name VARCHAR(100),
    street VARCHAR(400),
    postal_code VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_lenguages (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    lenguage VARCHAR(400),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
