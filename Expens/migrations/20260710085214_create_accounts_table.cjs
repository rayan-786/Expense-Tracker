exports.up = function (knex) {

  return knex.schema.createTable("accounts", (table) => {

    /* =====================================================
       PRIMARY KEY
    ===================================================== */

    table.increments("id").primary();

    /* =====================================================
       USER
    ===================================================== */

    table

      .integer("user_id")

      .unsigned()

      .notNullable()

      .references("id")

      .inTable("users")

      .onDelete("CASCADE");

    /* =====================================================
       ACCOUNT DETAILS
    ===================================================== */

    table

      .string("name", 100)

      .notNullable();

    table

      .enum("type", [

        "Cash",

        "Bank",

        "Wallet",

        "Credit Card"

      ])

      .notNullable();

    table

      .string("account_number", 50)

      .nullable();

    /* =====================================================
       BALANCE
    ===================================================== */

    table

      .decimal("opening_balance", 12, 2)

      .defaultTo(0);

    table

      .decimal("current_balance", 12, 2)

      .defaultTo(0);

    /* =====================================================
       DEFAULT ACCOUNT
    ===================================================== */

    table

      .boolean("is_default")

      .defaultTo(false);

    /* =====================================================
       STATUS
    ===================================================== */

    table

      .boolean("is_active")

      .defaultTo(true);

    /* =====================================================
       TIMESTAMPS
    ===================================================== */

    table.timestamps(true, true);

    /* =====================================================
       INDEXES
    ===================================================== */

    table.index(["user_id"]);

    table.index(["type"]);

    table.unique([

      "user_id",

      "name"

    ]);

  });

};

exports.down = function (knex) {

  return knex.schema.dropTableIfExists("accounts");

};