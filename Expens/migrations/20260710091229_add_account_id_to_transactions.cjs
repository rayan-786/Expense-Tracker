exports.up = function (knex) {

  return knex.schema.alterTable("transactions", (table) => {

    table
      .integer("account_id")
      .unsigned()
      .after("category_id")
      .references("id")
      .inTable("accounts")
      .onDelete("RESTRICT");

    table.index(["account_id"]);

  });

};

exports.down = function (knex) {

  return knex.schema.alterTable("transactions", (table) => {

    table.dropIndex(["account_id"]);

    table.dropColumn("account_id");

  });

};