exports.up = async function (knex) {
  await knex.schema.createTable("email_change_otps", (table) => {

    table.increments("id").primary();

    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.string("new_email").notNullable();

    table.string("otp", 6).notNullable();

    table.timestamp("expires_at").notNullable();

    table.timestamps(true, true);

  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("email_change_otps");
};