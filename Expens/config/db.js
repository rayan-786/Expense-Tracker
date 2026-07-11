const knex = require("knex");
const knexConfig = require("../knexfile.cjs");

const db = knex(knexConfig.development);

/* =========================================================
   DATABASE CONNECTION CHECK
========================================================= */

(async () => {
  try {
    await db.raw("SELECT 1");

    console.log("========================================");
    console.log("✅ Database Connected Successfully");
    console.log(`📦 Database : ${process.env.DB_NAME}`);
    console.log(`🖥️ Host     : ${process.env.DB_HOST}`);
    console.log("========================================\n");

  } catch (error) {

    console.error("========================================");
    console.error("❌ Database Connection Failed");
    console.error(error.message);
    console.error("========================================");

    process.exit(1);
  }
})();

module.exports = db;