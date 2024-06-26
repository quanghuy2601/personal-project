const { Pool } = require('pg');
const dotenv = require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
});

module.exports = { pool };
