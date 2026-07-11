const db = require("../config/db");
const validateBudget = require("../utils/budgetValidator");

/* =========================================================
   CREATE BUDGET
   POST /api/budgets
========================================================= */

exports.createBudget = async (req, res) => {

  try {

    const userId = req.user.id;

    /* =====================================================
       VALIDATION
    ===================================================== */

    const validation = validateBudget(req.body);

    if (!validation.valid) {

      return res.status(400).json({

        success: false,

        message: validation.message

      });

    }

    const {

      category_id,

      month,

      year,

      amount

    } = req.body;

    /* =====================================================
       CHECK CATEGORY
    ===================================================== */

    const category = await db("categories")
      .where({
        id: category_id,
        type: "expense"
      })
      .first();

    if (!category) {

      return res.status(404).json({

        success: false,

        message: "Expense category not found."

      });

    }

    /* =====================================================
       CHECK DUPLICATE BUDGET
    ===================================================== */

    const existingBudget = await db("budgets")
      .where({

        user_id: userId,

        category_id,

        month,

        year

      })
      .first();

    if (existingBudget) {

      return res.status(400).json({

        success: false,

        message: "Budget already exists for this category and month."

      });

    }

    /* =====================================================
       CREATE BUDGET
    ===================================================== */

    const [budgetId] = await db("budgets")
      .insert({

        user_id: userId,

        category_id,

        month,

        year,

        amount

      });

    console.log("💰 Budget Created :", budgetId);

    /* =====================================================
       RESPONSE
    ===================================================== */

    return res.status(201).json({

      success: true,

      message: "Budget created successfully.",

      budgetId

    });

  } catch (error) {

    console.error("\n❌ Create Budget Error");
    console.error("----------------------------------------");
    console.error(error.message);
    console.error("----------------------------------------");

    return res.status(500).json({

      success: false,

      message: "Internal Server Error."

    });

  }

};


/* =========================================================
   GET ALL BUDGETS
   GET /api/budgets
========================================================= */

exports.getBudgets = async (req, res) => {

  try {

    const userId = req.user.id;

    /* =====================================================
       QUERY PARAMS
    ===================================================== */

    const {

      page = 1,

      limit = 10,

      search = "",

      month,

      year,

      category_id

    } = req.query;

    const offset = (page - 1) * limit;

    /* =====================================================
       BASE QUERY
    ===================================================== */

    let query = db("budgets as b")

      .leftJoin("categories as c", "c.id", "b.category_id")

      .where("b.user_id", userId);

    /* =====================================================
       SEARCH
    ===================================================== */

    if (search) {

      query.where("c.name", "like", `%${search}%`);

    }

    /* =====================================================
       FILTERS
    ===================================================== */

    if (month) {

      query.andWhere("b.month", month);

    }

    if (year) {

      query.andWhere("b.year", year);

    }

    if (category_id) {

      query.andWhere("b.category_id", category_id);

    }

    /* =====================================================
       TOTAL COUNT
    ===================================================== */

    const totalResult = await query

      .clone()

      .count("b.id as total")

      .first();

    const total = Number(totalResult.total);

    /* =====================================================
       FETCH DATA
    ===================================================== */

    const budgets = await query

      .clone()

      .select(

        "b.id",

        "b.month",

        "b.year",

        "b.amount",

        "b.created_at",

        "b.updated_at",

        "c.id as category_id",

        "c.name as category_name"

      )

      .orderBy("b.year", "desc")

      .orderBy("b.month", "desc")

      .limit(limit)

      .offset(offset);

    /* =====================================================
       RESPONSE
    ===================================================== */

    return res.status(200).json({

      success: true,

      message: "Budgets fetched successfully.",

      data: budgets,

      pagination: {

        page: Number(page),

        limit: Number(limit),

        total,

        totalPages: Math.ceil(total / limit)

      }

    });

  } catch (error) {

    console.error("Get Budgets Error :", error);

    return res.status(500).json({

      success: false,

      message: "Internal Server Error."

    });

  }

};

/* =========================================================
   GET SINGLE BUDGET
   GET /api/budgets/:id
========================================================= */

exports.getBudget = async (req, res) => {

  try {

    const userId = req.user.id;

    const budgetId = req.params.id;

    /* =====================================================
       FETCH BUDGET
    ===================================================== */

    const budget = await db("budgets as b")

      .leftJoin("categories as c", "c.id", "b.category_id")

      .select(

        "b.id",

        "b.month",

        "b.year",

        "b.amount",

        "b.created_at",

        "b.updated_at",

        "c.id as category_id",

        "c.name as category_name",

        "c.type as category_type"

      )

      .where({

        "b.id": budgetId,

        "b.user_id": userId

      })

      .first();

    /* =====================================================
       NOT FOUND
    ===================================================== */

    if (!budget) {

      return res.status(404).json({

        success: false,

        message: "Budget not found."

      });

    }

    /* =====================================================
       RESPONSE
    ===================================================== */

    return res.status(200).json({

      success: true,

      message: "Budget fetched successfully.",

      data: budget

    });

  } catch (error) {

    console.error("Get Budget Error :", error);

    return res.status(500).json({

      success: false,

      message: "Internal Server Error."

    });

  }

};


/* =========================================================
   UPDATE BUDGET
   PUT /api/budgets/:id
========================================================= */

exports.updateBudget = async (req, res) => {

  try {

    const userId = req.user.id;

    const budgetId = req.params.id;

    /* =====================================================
       VALIDATION
    ===================================================== */

    const validation = validateBudget(req.body);

    if (!validation.valid) {

      return res.status(400).json({

        success: false,

        message: validation.message

      });

    }

    const {

      category_id,

      month,

      year,

      amount

    } = req.body;

    /* =====================================================
       CHECK BUDGET
    ===================================================== */

    const budget = await db("budgets")

      .where({

        id: budgetId,

        user_id: userId

      })

      .first();

    if (!budget) {

      return res.status(404).json({

        success: false,

        message: "Budget not found."

      });

    }

    /* =====================================================
       CHECK CATEGORY
    ===================================================== */

    const category = await db("categories")

      .where({

        id: category_id,

        type: "expense"

      })

      .first();

    if (!category) {

      return res.status(404).json({

        success: false,

        message: "Expense category not found."

      });

    }

    /* =====================================================
       CHECK DUPLICATE
    ===================================================== */

    const duplicateBudget = await db("budgets")

      .where({

        user_id: userId,

        category_id,

        month,

        year

      })

      .whereNot("id", budgetId)

      .first();

    if (duplicateBudget) {

      return res.status(400).json({

        success: false,

        message: "Budget already exists for this category and month."

      });

    }

    /* =====================================================
       UPDATE
    ===================================================== */

    await db("budgets")

      .where({

        id: budgetId,

        user_id: userId

      })

      .update({

        category_id,

        month,

        year,

        amount,

        updated_at: db.fn.now()

      });

    console.log("💰 Budget Updated :", budgetId);

    /* =====================================================
       RESPONSE
    ===================================================== */

    return res.status(200).json({

      success: true,

      message: "Budget updated successfully."

    });

  } catch (error) {

    console.error("Update Budget Error :", error);

    return res.status(500).json({

      success: false,

      message: "Internal Server Error."

    });

  }

};


/* =========================================================
   DELETE BUDGET
   DELETE /api/budgets/:id
========================================================= */

exports.deleteBudget = async (req, res) => {

  try {

    const userId = req.user.id;

    const budgetId = req.params.id;

    /* =====================================================
       CHECK BUDGET
    ===================================================== */

    const budget = await db("budgets")

      .where({

        id: budgetId,

        user_id: userId

      })

      .first();

    if (!budget) {

      return res.status(404).json({

        success: false,

        message: "Budget not found."

      });

    }

    /* =====================================================
       DELETE
    ===================================================== */

    await db("budgets")

      .where({

        id: budgetId,

        user_id: userId

      })

      .del();

    console.log("🗑️ Budget Deleted :", budgetId);

    /* =====================================================
       RESPONSE
    ===================================================== */

    return res.status(200).json({

      success: true,

      message: "Budget deleted successfully."

    });

  } catch (error) {

    console.error("Delete Budget Error :", error);

    return res.status(500).json({

      success: false,

      message: "Internal Server Error."

    });

  }

};


/* =========================================================
   GET BUDGET STATUS
   GET /api/budgets/status
========================================================= */

/* =========================================================
   GET BUDGET STATUS
   GET /api/budgets/status
========================================================= */

exports.getBudgetStatus = async (req, res) => {

  try {

    const userId = req.user.id;

    /* =====================================================
       BUDGET STATUS
    ===================================================== */

    const budgets = await db("budgets as b")

      .leftJoin("categories as c", "c.id", "b.category_id")

      .leftJoin("transactions as t", function () {

        this.on("t.category_id", "=", "b.category_id")
          .andOn("t.user_id", "=", "b.user_id")
          .andOn(db.raw("MONTH(t.transaction_date)=b.month"))
          .andOn(db.raw("YEAR(t.transaction_date)=b.year"))
          .andOn(db.raw("t.type='expense'"));

      })

      .where("b.user_id", userId)

      .groupBy(

        "b.id",

        "b.category_id",

        "b.month",

        "b.year",

        "b.amount",

        "c.name"

      )

      .select(

        "b.id as budget_id",

        "b.category_id",

        "c.name as category",

        "b.month",

        "b.year",

        "b.amount as budget",

        db.raw("COALESCE(SUM(t.amount),0) as spent")

      );

    /* =====================================================
       FORMAT RESPONSE
    ===================================================== */

    const data = budgets.map((item) => {

      const budget = Number(item.budget);

      const spent = Number(item.spent);

      const remaining = budget - spent;

      const percentage = budget > 0

        ? Number(((spent / budget) * 100).toFixed(2))

        : 0;

      let status = "Safe";

      if (percentage >= 100) {

        status = "Over Budget";

      }

      else if (percentage >= 80) {

        status = "Warning";

      }

      return {

        budget_id: item.budget_id,

        category: item.category,

        month: item.month,

        year: item.year,

        budget,

        spent,

        remaining,

        percentage,

        status

      };

    });

    /* =====================================================
       RESPONSE
    ===================================================== */

    return res.status(200).json({

      success: true,

      message: "Budget status fetched successfully.",

      total: data.length,

      data

    });

  } catch (error) {

    console.error("Budget Status Error :", error);

    return res.status(500).json({

      success: false,

      message: "Internal Server Error."

    });

  }

};