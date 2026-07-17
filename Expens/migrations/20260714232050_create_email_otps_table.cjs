exports.up = async function (knex) {
  await knex.schema.createTable("email_otps", (table) => {
    table.increments("id").primary();

    table.string("name").notNullable();

    table.string("email").notNullable().unique();

    table.string("password").notNullable();

    table.string("otp", 6).notNullable();

    table.timestamp("expires_at").notNullable();

    table.timestamps(true, true);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("email_otps");
};