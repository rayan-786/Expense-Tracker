const path = require("path");
require("dotenv").config();

const config = {
    client: "mysql2",

    connection: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 4000),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,

        ssl: {
            rejectUnauthorized: false
        }
    },

    pool: {
        min: 0,
        max: 5,
        acquireTimeoutMillis: 30000,
        idleTimeoutMillis: 10000
    },

    seeds: {
        directory: path.resolve(__dirname, "seeds"),
        extension: "cjs"
    }
};

module.exports = {
    development: config,
    production: config
};