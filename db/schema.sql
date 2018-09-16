DROP TABLE IF EXISTS producers;
DROP TABLE IF EXISTS production_facilities;

CREATE TABLE producers (
    id SERIAL PRIMARY KEY,
    company_legal_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    hashed_password VARCHAR(100) NOT NULL,
    company_type INT NOT NULL,
    company_image_url VARCHAR(300),
    company_description VARCHAR(500),
    company_score INT DEFAULT 50 CHECK (company_score >= 0 AND company_score <= 100),
    headquarter_country VARCHAR(100),
    headquarter_city VARCHAR(100),
    headquarter_postal_code VARCHAR(100),
    headquarter_street VARCHAR(100),
    headquarter_address_number VARCHAR(100),
    payment_card_number INT,
    payment_card_expiration_month INT,
    payment_card_expiration_year INT,
    payment_card_ccv INT,
    bank_account_number INT,
    bank_iban VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE production_facilities (
    id SERIAL PRIMARY KEY,
    owner INT NOT NULL REFERENCES producers(id),
    headquarter_country VARCHAR(100) NOT NULL,
    headquarter_city VARCHAR(100) NOT NULL,
    headquarter_postal_code VARCHAR(100) NOT NULL,
    headquarter_street VARCHAR(100) NOT NULL,
    headquarter_address_number VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
