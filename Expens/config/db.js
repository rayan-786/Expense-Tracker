const knex = require("knex");
const knexConfig = require("../knexfile.cjs");

// Use production config on Vercel
const db = knex(
    process.env.VERCEL
        ? knexConfig.production
        : knexConfig.development
);

module.exports = db;