const mysql =  require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config(); //carga las variables de .env

const DB_CONFIG = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3307,
    waitForConnections: true,
    connectionLimit: 10,
};

const pool = mysql.createPool(DB_CONFIG);

module.exports = pool;