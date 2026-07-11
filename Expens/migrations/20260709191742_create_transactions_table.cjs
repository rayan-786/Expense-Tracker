exports.up = function (knex) {
  return knex.schema.createTable("transactions", (table) => {

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
      .notNullable()
      .references("id")
      .inTable("categories")
      .onDelete("RESTRICT");

    /* =========================================================
       TRANSACTION
    ========================================================= */

    table
      .enum("type", ["income", "expense"])
      .notNullable();

    table
      .string("title", 150)
      .notNullable();

    table
      .decimal("amount", 10, 2)
      .notNullable();

    table
      .enum("payment_method", [
        "Cash",
        "UPI",
        "Card",
        "Bank Transfer"
      ])
      .notNullable();

    table
      .date("transaction_date")
      .notNullable();

    table.text("notes");

    /* =========================================================
       OPTIONAL
    ========================================================= */

    table.string("reference_no", 100);

    table.timestamps(true, true);

    /* =========================================================
       INDEXES
    ========================================================= */

    table.index(["user_id"]);
    table.index(["category_id"]);
    table.index(["type"]);
    table.index(["transaction_date"]);

  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("transactions");
};