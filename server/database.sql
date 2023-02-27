CREATE DATABASE perntodo;

CREATE TABLE todos(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    email VARCHAR(255)
);

ALTER TABLE todos ADD COLUMN email VARCHAR(255);

CREATE TABLE login(
    email VARCHAR(255),
    hash VARCHAR(255)
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255)
);

