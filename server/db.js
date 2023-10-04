require('dotenv').config();

const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DB_CONNECTION_STRING,
});

module.exports = client;
