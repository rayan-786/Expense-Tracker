exports.up = async function (knex) {

  await knex.schema.alterTable("users", (table) => {

    table.string("language").defaultTo("en");

  });

};

exports.down = async function (knex) {

  await knex.schema.alterTable("users", (table) => {

    table.dropColumn("language");

  });

};