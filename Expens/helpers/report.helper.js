const db = require("../config/db");

/* =========================================================
   BUILD REPORT
========================================================= */

exports.buildReport = async (

  userId,

  filters = {}

) => {

  /* =====================================================
     FILTERS
  ===================================================== */

  const {

    start_date,

    end_date,

    month,

    year,

    type,

    category_id,

    account_id,

    search = "",

    page = 1,

    limit = 10

  } = filters;

  const offset =

    (Number(page) - 1) *

    Number(limit);

  /* =====================================================
     BASE SUMMARY QUERY
  ===================================================== */

  const summaryQuery = db("transactions")

    .where(

      "user_id",

      userId

    );

  /* =====================================================
     BASE TRANSACTION QUERY
  ===================================================== */

  const transactionQuery = db(

    "transactions as t"

  )

    .leftJoin(

      "categories as c",

      "c.id",

      "t.category_id"

    )

    .leftJoin(

      "accounts as a",

      "a.id",

      "t.account_id"

    )

    .where(

      "t.user_id",

      userId

    );

  /* =====================================================
     DATE RANGE
  ===================================================== */

  if (

    start_date &&

    end_date

  ) {

    summaryQuery.whereBetween(

      "transaction_date",

      [

        start_date,

        end_date

      ]

    );

    transactionQuery.whereBetween(

      "t.transaction_date",

      [

        start_date,

        end_date

      ]

    );

  }

  /* =====================================================
     MONTH
  ===================================================== */

  if (month) {

    summaryQuery.whereRaw(

      "MONTH(transaction_date)=?",

      [month]

    );

    transactionQuery.whereRaw(

      "MONTH(t.transaction_date)=?",

      [month]

    );

  }

  /* =====================================================
     YEAR
  ===================================================== */

  if (year) {

    summaryQuery.whereRaw(

      "YEAR(transaction_date)=?",

      [year]

    );

    transactionQuery.whereRaw(

      "YEAR(t.transaction_date)=?",

      [year]

    );

  }

  /* =====================================================
     TYPE
  ===================================================== */

  if (type) {

    summaryQuery.where({

      type

    });

    transactionQuery.where({

      "t.type": type

    });

  }

  /* =====================================================
     CATEGORY
  ===================================================== */

  if (category_id) {

    summaryQuery.where({

      category_id

    });

    transactionQuery.where({

      "t.category_id":

        category_id

    });

  }

  /* =====================================================
     ACCOUNT
  ===================================================== */

  if (account_id) {

    summaryQuery.where({

      account_id

    });

    transactionQuery.where({

      "t.account_id":

        account_id

    });

  }

  /* =====================================================
     SEARCH
  ===================================================== */

  if (search) {

    transactionQuery.where(function () {

      this.where(

        "t.title",

        "like",

        `%${search}%`

      )

      .orWhere(

        "t.reference_no",

        "like",

        `%${search}%`

      )

      .orWhere(

        "c.name",

        "like",

        `%${search}%`

      )

      .orWhere(

        "a.name",

        "like",

        `%${search}%`

      );

    });

  }

  /* =====================================================
     SUMMARY
  ===================================================== */

  const summary = await summaryQuery

    .clone()

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
     TRANSACTION COUNT
  ===================================================== */

  const totalResult = await transactionQuery

    .clone()

    .count(

      "t.id as total"

    )

    .first();

  /* =====================================================
     TRANSACTIONS
  ===================================================== */

  const transactions =

    await transactionQuery

      .clone()

      .select(

        "t.id",

        "t.title",

        "t.amount",

        "t.type",

        "t.payment_method",

        "t.reference_no",

        "t.receipt_url",

        "t.transaction_date",

        "t.notes",

        "c.id as category_id",

        "c.name as category",

        "a.id as account_id",

        "a.name as account",

        "a.type as account_type"

      )

      .orderBy(

        "t.transaction_date",

        "desc"

      )

      .limit(

        Number(limit)

      )

      .offset(offset);

  /* =====================================================
     BASIC TOTALS
  ===================================================== */

  const income = Number(

    summary.income || 0

  );

  const expense = Number(

    summary.expense || 0

  );

  const balance =

    income - expense;

   /* =====================================================
     EXPENSE BY CATEGORY
  ===================================================== */

  const expenseByCategory = await transactionQuery

    .clone()

    .where("t.type", "expense")

    .groupBy(

      "c.id",

      "c.name"

    )

    .select(

      "c.id as category_id",

      "c.name as category",

      db.raw(

        "SUM(t.amount) as amount"

      )

    )

    .orderBy(

      "amount",

      "desc"

    );

  /* =====================================================
     PAYMENT METHODS
  ===================================================== */

  const paymentMethods = await transactionQuery

    .clone()

    .groupBy(

      "t.payment_method"

    )

    .select(

      "t.payment_method",

      db.raw(

        "SUM(t.amount) as amount"

      ),

      db.raw(

        "COUNT(t.id) as totalTransactions"

      )

    )

    .orderBy(

      "amount",

      "desc"

    );

  /* =====================================================
     ACCOUNT SUMMARY
  ===================================================== */

  const accountSummary = await db(

    "accounts"

  )

    .where({

      user_id: userId,

      is_active: true

    })

    .select(

      "id",

      "name",

      "type",

      "opening_balance",

      "current_balance",

      "is_default",

      "is_active"

    )

    .orderBy(

      "is_default",

      "desc"

    )

    .orderBy(

      "name"

    );

  /* =====================================================
     TOP EXPENSES
  ===================================================== */

  const topExpenses = await transactionQuery

    .clone()

    .where(

      "t.type",

      "expense"

    )

    .select(

      "t.id",

      "t.title",

      "t.amount",

      "t.transaction_date",

      "c.name as category_name",

      "a.name as account_name"

    )

    .orderBy(

      "t.amount",

      "desc"

    )

    .limit(10);

  /* =====================================================
     TOP CATEGORIES
  ===================================================== */

  const topCategories =

    expenseByCategory

      .slice(0, 5)

      .map((item) => ({

        category_id:

          item.category_id,

        category:

          item.category,

        amount:

          Number(

            item.amount

          )

      }));

  /* =====================================================
     BUDGET SUMMARY
  ===================================================== */

  const budgetSummary = await db("budgets")

    .where({

      user_id: userId

    })

    .modify((query) => {

      if (month) {

        query.where("month", month);

      }

    })

    .select(

      db.raw(

        "COALESCE(SUM(amount),0) as totalBudget"

      )

    )

    .first();

  const totalBudget = Number(

    budgetSummary?.totalBudget || 0

  );

  const remainingBudget =

    totalBudget - expense;

  const budgetUsage =

    totalBudget > 0

      ? Number(

          (

            (expense /

              totalBudget) *

            100

          ).toFixed(2)

        )

      : 0;

  let budgetStatus = "Safe";

  if (budgetUsage >= 100) {

    budgetStatus =

      "Over Budget";

  }

  else if (

    budgetUsage >= 80

  ) {

    budgetStatus =

      "Warning";

  }

  /* =====================================================
     MONTHLY SUMMARY
  ===================================================== */

  const monthlySummary = await db(

    "transactions"

  )

    .where(

      "user_id",

      userId

    )

    .modify((query) => {

      if (year) {

        query.whereRaw(

          "YEAR(transaction_date)=?",

          [year]

        );

      }

      if (

        start_date &&

        end_date

      ) {

        query.whereBetween(

          "transaction_date",

          [

            start_date,

            end_date

          ]

        );

      }

    })

    .groupByRaw(

      "YEAR(transaction_date), MONTH(transaction_date)"

    )

    .select(

      db.raw(

        "YEAR(transaction_date) as year"

      ),

      db.raw(

        "MONTH(transaction_date) as month_number"

      ),

      db.raw(

        "DATE_FORMAT(MIN(transaction_date),'%b') as month"

      ),

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
     CASH FLOW
  ===================================================== */

  const cashFlow = {

    cashIn: income,

    cashOut: expense,

    netFlow: balance

  };

  /* =====================================================
     STATISTICS
  ===================================================== */

  const statistics = {

    totalTransactions:

      Number(

        totalResult.total

      ),

    incomeTransactions:

      transactions.filter(

        (item) =>

          item.type ===

          "income"

      ).length,

    expenseTransactions:

      transactions.filter(

        (item) =>

          item.type ===

          "expense"

      ).length,

    totalAccounts:

      accountSummary.length,

    totalCategories:

      expenseByCategory.length

  };

  /* =====================================================
     REPORT OBJECT
  ===================================================== */

  return {

    generatedAt:

      new Date(),

    filters: {

      start_date,

      end_date,

      month,

      year,

      type,

      category_id,

      account_id,

      search

    },

    summary: {

      income,

      expense,

      savings:

        balance,

      cashFlow:

        balance,

      balance

    },

    cashFlow,

    budget: {

      totalBudget,

      spent:

        expense,

      remaining:

        remainingBudget,

      usage:

        budgetUsage,

      status:

        budgetStatus

    },

    statistics,

    accounts:

      accountSummary,

    expenseByCategory,

    paymentMethods,

    monthlySummary,

    topExpenses,

    topCategories,

    pagination: {

      page:

        Number(page),

      limit:

        Number(limit),

      total:

        Number(

          totalResult.total

        ),

      totalPages:

        Math.ceil(

          Number(

            totalResult.total

          ) /

          Number(limit)

        )

    },

    transactions

  };

};

