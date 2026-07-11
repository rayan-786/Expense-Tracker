const db = require("../config/db");

/* =========================================================
   GET DASHBOARD
========================================================= */

exports.getDashboard = async (req, res) => {

  try {

    const userId = req.user.id;

    /* =====================================================
       QUERIES
    ===================================================== */

    const summaryQuery = db("transactions")

      .where("user_id", userId)

      .select(

        db.raw(`
          COALESCE(
            SUM(
              CASE
                WHEN type='income'
                THEN amount
                ELSE 0
              END
            ),0
          ) as income
        `),

        db.raw(`
          COALESCE(
            SUM(
              CASE
                WHEN type='expense'
                THEN amount
                ELSE 0
              END
            ),0
          ) as expense
        `)

      )

      .first();


      /* =====================================================
   MONTHLY SAVINGS
===================================================== */

const monthlySavingsQuery = db("transactions")

  .where("user_id", userId)

  .whereRaw("MONTH(transaction_date)=MONTH(CURDATE())")

  .whereRaw("YEAR(transaction_date)=YEAR(CURDATE())")

  .select(

    db.raw(`
      COALESCE(
        SUM(
          CASE
            WHEN type='income'
            THEN amount
            ELSE 0
          END
        ),0
      ) as income
    `),

    db.raw(`
      COALESCE(
        SUM(
          CASE
            WHEN type='expense'
            THEN amount
            ELSE 0
          END
        ),0
      ) as expense
    `)

  )

  .first();

    /* =====================================================
       BUDGET SUMMARY
    ===================================================== */

    const budgetQuery = db("budgets")

      .where("user_id", userId)

      .select(

        db.raw("COALESCE(SUM(amount),0) as totalBudget")

      )

      .first();

    /* =====================================================
       RECENT TRANSACTIONS
    ===================================================== */

    const recentTransactionsQuery = db("transactions as t")

      .leftJoin(

        "categories as c",

        "c.id",

        "t.category_id"

      )

      .select(

        "t.id",

        "t.title",

        "t.amount",

        "t.type",

        "t.payment_method",

        db.raw(
          "DATE_FORMAT(t.transaction_date,'%d %b %Y') as transaction_date"
        ),

        "c.name as category"

      )

      .where("t.user_id", userId)

      .orderBy("t.created_at", "desc")

      .limit(5);

    /* =====================================================
       PROMISE ALL
    ===================================================== */

   const [

summary,

budget,

recentTransactions,

monthlySavings

] = await Promise.all([

summaryQuery,

budgetQuery,

recentTransactionsQuery,

monthlySavingsQuery

]);

    /* =====================================================
       SUMMARY
    ===================================================== */

    const income = Number(summary.income);

    const expense = Number(summary.expense);

    const balance = income - expense;

    const totalBudget = Number(budget.totalBudget);

    const remainingBudget = totalBudget - expense;

    const budgetUsage = totalBudget > 0

    

      ? Number(
          ((expense / totalBudget) * 100).toFixed(2)
        )

      : 0;

      /* =====================================================
   CASH FLOW
===================================================== */

const cashFlow = {

  cashIn: income,

  cashOut: expense,

  netFlow: balance

};

/* =====================================================
   MONTHLY SAVINGS
===================================================== */

const currentMonthSavings =

Number(monthlySavings.income)

-

Number(monthlySavings.expense);

/* =====================================================
   BUDGET STATUS
===================================================== */

let budgetStatus = "Safe";

if (budgetUsage >= 100) {

  budgetStatus = "Over Budget";

}

else if (budgetUsage >= 80) {

  budgetStatus = "Warning";

}

          /* =====================================================
       EXPENSE BY CATEGORY
    ===================================================== */

    const expenseByCategoryQuery = db("transactions as t")

      .leftJoin("categories as c", "c.id", "t.category_id")

      .where({

        "t.user_id": userId,

        "t.type": "expense"

      })

      .groupBy("c.id", "c.name")

      .select(

        "c.id as category_id",

        "c.name as category",

        db.raw("COALESCE(SUM(t.amount),0) as amount")

      )

      .orderBy("amount", "desc");

    /* =====================================================
       MONTHLY SUMMARY
    ===================================================== */

    const monthlySummaryQuery = db("transactions")

      .where("user_id", userId)

      .groupByRaw("YEAR(transaction_date), MONTH(transaction_date)")

      .select(

        db.raw("YEAR(transaction_date) as year"),

        db.raw("MONTH(transaction_date) as month_number"),

        db.raw("DATE_FORMAT(MIN(transaction_date),'%b') as month"),

        db.raw(`
          SUM(
            CASE
              WHEN type='income'
              THEN amount
              ELSE 0
            END
          ) as income
        `),

        db.raw(`
          SUM(
            CASE
              WHEN type='expense'
              THEN amount
              ELSE 0
            END
          ) as expense
        `)

      )

      .orderBy("year")

      .orderBy("month_number");

    /* =====================================================
       PAYMENT METHOD DISTRIBUTION
    ===================================================== */

    const paymentMethodsQuery = db("transactions")

      .where({

        user_id: userId,

        type: "expense"

      })

      .groupBy("payment_method")

      .select(

        "payment_method",

        db.raw("SUM(amount) as amount")

      )

      .orderBy("amount", "desc");

    /* =====================================================
       TOP EXPENSES
    ===================================================== */

    const topExpensesQuery = db("transactions as t")

      .leftJoin("categories as c", "c.id", "t.category_id")

      .where({

        "t.user_id": userId,

        "t.type": "expense"

      })

      .select(

        "t.id",

        "t.title",

        "t.amount",

        db.raw(
          "DATE_FORMAT(t.transaction_date,'%d %b %Y') as transaction_date"
        ),

        "c.name as category"

      )

      .orderBy("t.amount", "desc")

      .limit(5);

    /* =====================================================
       TOP EXPENSE CATEGORIES
    ===================================================== */

    const topCategoriesQuery = db("transactions as t")

      .leftJoin("categories as c", "c.id", "t.category_id")

      .where({

        "t.user_id": userId,

        "t.type": "expense"

      })

      .groupBy("c.id", "c.name")

      .select(

        "c.name as category",

        db.raw("SUM(t.amount) as amount")

      )

      .orderBy("amount", "desc")

      .limit(5);

    /* =====================================================
       DASHBOARD STATISTICS
    ===================================================== */

    const statisticsQuery = Promise.all([

      db("transactions")
        .where("user_id", userId)
        .count("id as total")
        .first(),

      db("transactions")
        .where({
          user_id: userId,
          type: "income"
        })
        .count("id as total")
        .first(),

      db("transactions")
        .where({
          user_id: userId,
          type: "expense"
        })
        .count("id as total")
        .first(),

      db("categories")
        .count("id as total")
        .first(),

      db("budgets")
        .where("user_id", userId)
        .count("id as total")
        .first()

    ]);

    /* =====================================================
       LOAD ANALYTICS
    ===================================================== */

    const [

      expenseByCategory,

      monthlySummary,

      paymentMethods,

      topExpenses,

      topCategories,

      statistics

    ] = await Promise.all([

      expenseByCategoryQuery,

      monthlySummaryQuery,

      paymentMethodsQuery,

      topExpensesQuery,

      topCategoriesQuery,

      statisticsQuery

    ]);

    const [

      totalTransactions,

      incomeTransactions,

      expenseTransactions,

      totalCategories,

      totalBudgets

    ] = statistics;

/* =====================================================
   FORMAT RESPONSE
===================================================== */

const dashboard = {

  /* ===================================================
     SUMMARY
  =================================================== */

  summary: {

    balance,

    income,

    expense

  },

  /* ===================================================
     CASH FLOW
  =================================================== */

  cashFlow: {

    cashIn: income,

    cashOut: expense,

    netFlow: balance

  },

  /* ===================================================
     MONTHLY SAVINGS
  =================================================== */

  monthlySavings: {

    income: Number(monthlySavings.income),

    expense: Number(monthlySavings.expense),

    savings: currentMonthSavings

  },

  /* ===================================================
     BUDGET SUMMARY
  =================================================== */

  budget: {

    totalBudget,

    spent: expense,

    remaining: remainingBudget,

    usage: budgetUsage,

    status: budgetStatus

  },

  /* ===================================================
     RECENT TRANSACTIONS
  =================================================== */

  recentTransactions,

  /* ===================================================
     CHARTS
  =================================================== */

  expenseByCategory,

  monthlySummary,

  paymentMethods,

  /* ===================================================
     TOP DATA
  =================================================== */

  topExpenses,

  topCategories,

  /* ===================================================
     DASHBOARD STATISTICS
  =================================================== */

  statistics: {

    totalTransactions:
      Number(totalTransactions.total),

    incomeTransactions:
      Number(incomeTransactions.total),

    expenseTransactions:
      Number(expenseTransactions.total),

    totalCategories:
      Number(totalCategories.total),

    totalBudgets:
      Number(totalBudgets.total)

  }

};

/* =====================================================
   RESPONSE
===================================================== */

return res.status(200).json({

  success: true,

  message: "Dashboard fetched successfully.",

  data: dashboard

});
  } catch (error) {

    console.error("\n❌ Dashboard Error");

    console.error("----------------------------------------");

    console.error(error.message);

    console.error("----------------------------------------");

    return res.status(500).json({

      success: false,

      message: "Internal Server Error."

    });

  }

};

















// const db = require("../config/db");

// /* =========================================================
//    GET DASHBOARD
// ========================================================= */

// exports.getDashboard = async (req, res) => {

//   try {

//     const userId = req.user.id;

//     /* =====================================================
//        SUMMARY
//     ===================================================== */

//     const summary = await db("transactions")
//       .where("user_id", userId)
//       .select(
//         db.raw(`
//           COALESCE(SUM(CASE WHEN type='income' THEN amount ELSE 0 END),0) AS income
//         `),
//         db.raw(`
//           COALESCE(SUM(CASE WHEN type='expense' THEN amount ELSE 0 END),0) AS expense
//         `)
//       )
//       .first();

//     const income = Number(summary.income);
//     const expense = Number(summary.expense);

//     const balance = income - expense;

//     /* =====================================================
//        RECENT TRANSACTIONS
//     ===================================================== */

//     const recentTransactions = await db("transactions as t")

//       .leftJoin("categories as c", "c.id", "t.category_id")

//       .select(
//         "t.id",
//         "t.title",
//         "t.amount",
//         "t.type",
//         "t.transaction_date",
//         "c.name as category"
//       )

//       .where("t.user_id", userId)

//       .orderBy("t.created_at", "desc")

//       .limit(5);

//     /* =====================================================
//        EXPENSE BY CATEGORY
//     ===================================================== */

//     const expenseByCategory = await db("transactions as t")

//       .leftJoin("categories as c", "c.id", "t.category_id")

//       .select(
//         "c.name as category"
//       )

//       .sum({
//         amount: "t.amount"
//       })

//       .where({
//         "t.user_id": userId,
//         "t.type": "expense"
//       })

//       .groupBy("c.name")

//       .orderBy("amount", "desc");

//     /* =====================================================
//        MONTHLY SUMMARY
//     ===================================================== */

//     const monthlySummary = await db("transactions")

//   .select(

//     db.raw("YEAR(transaction_date) as year"),

//     db.raw("MONTH(transaction_date) as month_number"),

//     db.raw("DATE_FORMAT(MIN(transaction_date), '%b') as month"),

//     db.raw(`
//       SUM(CASE
//         WHEN type='income'
//         THEN amount
//         ELSE 0
//       END) as income
//     `),

//     db.raw(`
//       SUM(CASE
//         WHEN type='expense'
//         THEN amount
//         ELSE 0
//       END) as expense
//     `)

//   )

//   .where("user_id", userId)

//   .groupByRaw("YEAR(transaction_date), MONTH(transaction_date)")

//   .orderBy("year")

//   .orderBy("month_number");

//     /* =====================================================
//        RESPONSE
//     ===================================================== */

//     return res.status(200).json({

//       success: true,

//       message: "Dashboard fetched successfully.",

//       data: {

//         summary: {

//           balance,

//           income,

//           expense

//         },

//         recentTransactions,

//         expenseByCategory,

//         monthlySummary

//       }

//     });

//   } catch (error) {

//     console.error("Dashboard Error :", error);

//     return res.status(500).json({

//       success: false,

//       message: "Internal Server Error."

//     });

//   }

// };