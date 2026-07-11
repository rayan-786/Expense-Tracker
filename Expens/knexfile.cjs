const path = require("path");
require("dotenv").config();

module.exports = {
  development: {
    client: "mysql2",

    connection: {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 4000,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  }
},

    seeds: {
      directory: path.resolve(__dirname, "seeds"),
      directory: "./seeds",
      extension: "cjs"
    }
  }
};