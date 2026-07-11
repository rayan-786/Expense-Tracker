exports.up = function (knex) {

  return knex.schema.createTable("budgets", (table) => {

    table.increments("id").primary();

    /* =========================================================
       USER
    ========================================================= */

    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    /* =========================================================
       CATEGORY
    ========================================================= */

    table
      .integer("category_id")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("categories")
      .onDelete("CASCADE");

    /* =========================================================
       BUDGET
    ========================================================= */

    table.integer("month").notNullable();

    table.integer("year").notNullable();

    table.decimal("amount", 10, 2).notNullable();

    table.timestamps(true, true);

    /* =========================================================
       INDEXES
    ========================================================= */

    table.index(["user_id"]);
    table.index(["category_id"]);
    table.index(["month", "year"]);

    /* =========================================================
       UNIQUE
    ========================================================= */

    table.unique([
      "user_id",
      "category_id",
      "month",
      "year"
    ]);

  });

};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("budgets");
};