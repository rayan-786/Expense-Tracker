exports.up = function (knex) {

  return knex.schema.alterTable("transactions", (table) => {

    /* =====================================================
       RECEIPT
    ===================================================== */

    table

      .string("receipt_url", 255)

      .nullable()

      .after("reference_no");

  });

};

exports.down = function (knex) {

  return knex.schema.alterTable("transactions", (table) => {

    table.dropColumn("receipt_url");

  });

};