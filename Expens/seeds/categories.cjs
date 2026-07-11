exports.seed = async function (knex) {
  await knex("categories").del();

  await knex("categories").insert([
    // Income
    { name: "Salary", type: "income" },
    { name: "Freelance", type: "income" },
    { name: "Business", type: "income" },
    { name: "Investment", type: "income" },
    { name: "Other Income", type: "income" },

    // Expense
    { name: "Food", type: "expense" },
    { name: "Shopping", type: "expense" },
    { name: "Travel", type: "expense" },
    { name: "Bills", type: "expense" },
    { name: "Medical", type: "expense" },
    { name: "Entertainment", type: "expense" },
    { name: "Education", type: "expense" },
    { name: "Fuel", type: "expense" },
    { name: "Rent", type: "expense" },
    { name: "Other Expense", type: "expense" }
  ]);
};