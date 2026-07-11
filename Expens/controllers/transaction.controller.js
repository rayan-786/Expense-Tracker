const db = require("../config/db");
const validateTransaction = require("../utils/transactionValidator");

exports.createTransaction = async (req, res) => {

  try {

    const userId = req.user.id;

    const validation = validateTransaction(req.body);

    if (!validation.valid) {

      return res.status(400).json({

        success: false,

        message: validation.message

      });

    }

    console.log(req.body); // ✅ Should contain all text fields
  console.log(req.file); // ✅ Uploaded file

    const {

  title,

  amount,

  type,

  category_id,

  account_id,

  payment_method,

  transaction_date,

  notes,

  reference_no

} = req.body;

    /* =====================================================
       CHECK CATEGORY
    ===================================================== */

    const category = await db("categories")
      .where({
        id: category_id,
        type
      })
      .first();

    if (!category) {

      return res.status(404).json({

        success: false,

        message: "Category not found."

      });

    }

    /* =====================================================
   CHECK ACCOUNT
===================================================== */

const account = await db("accounts")

  .where({

    id: account_id,

    user_id: userId,

    is_active: true

  })

  .first();

if (!account) {

  return res.status(404).json({

    success: false,

    message: "Account not found."

  });

}

/* =====================================================
   RECEIPT
===================================================== */

const receipt_url = req.file

  ? `uploads/receipts/${req.file.filename}`

  : null;

    /* =====================================================
       CREATE TRANSACTION
    ===================================================== */

    const [transactionId] = await db("transactions")
      .insert({

  user_id: userId,

  category_id,

  account_id,

  title,

  amount,

  type,

  payment_method,

  transaction_date,

  notes,

  reference_no,

  receipt_url

});

    console.log("💾 Transaction Created :", transactionId);

    /* =====================================================
       RESPONSE
    ===================================================== */

    return res.status(201).json({

      success: true,

      message: "Transaction added successfully.",

      transactionId

    });

  } catch (error) {

    console.error("\n❌ Create Transaction Error");
    console.error("----------------------------------------");
    console.error(error.message);
    console.error("----------------------------------------");

    return res.status(500).json({

      success: false,

      message: "Internal Server Error."

    });

  }

};

exports.getTransactions = async (req, res) => {

  try {

    const userId = req.user.id;

    let {

      page = 1,

      limit = 10,

      search,

      type,

      category_id,

      startDate,

      endDate

    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const offset = (page - 1) * limit;

    /* =====================================================
       BASE QUERY
    ===================================================== */

    let query = db("transactions as t")
  .leftJoin("categories as c", "c.id", "t.category_id")
  .leftJoin("accounts as a", "a.id", "t.account_id")
  .where("t.user_id", userId);

    /* =====================================================
       SEARCH
    ===================================================== */

    if (search) {

      query.where(function () {

        this.where("t.title", "like", `%${search}%`)
          .orWhere("t.notes", "like", `%${search}%`);

      });

    }

    /* =====================================================
       FILTER TYPE
    ===================================================== */

    if (type) {

      query.where("t.type", type);

    }

    /* =====================================================
       FILTER CATEGORY
    ===================================================== */

    if (category_id) {

      query.where("t.category_id", category_id);

    }

    /* =====================================================
       FILTER DATE
    ===================================================== */

    if (startDate && endDate) {

      query.whereBetween("t.transaction_date", [

        startDate,

        endDate

      ]);

    }

    /* =====================================================
       TOTAL RECORDS
    ===================================================== */

    const totalQuery = query.clone();

    const [{ total }] = await totalQuery.count({
      total: "t.id"
    });

    /* =====================================================
       DATA
    ===================================================== */

    const transactions = await query

      .select(
        "t.id",
        "t.title",
        "t.amount",
        "t.type",
        "t.payment_method",
        "t.transaction_date",
        "t.notes",
        "c.id as category_id",
        "c.name as category_name",
        "a.name as account",
        "a.type as account_type",   

      )

      .orderBy("t.transaction_date", "desc")

      .limit(limit)

      .offset(offset);

    /* =====================================================
       RESPONSE
    ===================================================== */

    return res.status(200).json({

      success: true,

      message: "Transactions fetched successfully.",

      data: transactions,

      pagination: {

        page,

        limit,

        total: Number(total),

        totalPages: Math.ceil(total / limit)

      }

    });

  } catch (error) {

    console.error("Get Transactions Error :", error);

    return res.status(500).json({

      success: false,

      message: "Internal Server Error."

    });

  }

};

exports.getTransaction = async (req, res) => {

  try {

    const userId = req.user.id;

    const transactionId = req.params.id;

    /* =====================================================
       FETCH TRANSACTION
    ===================================================== */

    const transaction = await db("transactions as t")
      .leftJoin("categories as c", "c.id", "t.category_id")
      .select(

        "t.id",

        "t.title",

        "t.amount",

        "t.type",

        "t.payment_method",

        "t.transaction_date",

        "t.notes",

        "t.reference_no",

        "t.created_at",

        "t.updated_at",

        "c.id as category_id",

        "c.name as category_name"

      )
      .where({

        "t.id": transactionId,

        "t.user_id": userId

      })
      .first();

    /* =====================================================
       NOT FOUND
    ===================================================== */

    if (!transaction) {

      return res.status(404).json({

        success: false,

        message: "Transaction not found."

      });

    }

    /* =====================================================
       RESPONSE
    ===================================================== */

    return res.status(200).json({

      success: true,

      message: "Transaction fetched successfully.",

      data: transaction

    });

  } catch (error) {

    console.error("Get Transaction Error :", error);

    return res.status(500).json({

      success: false,

      message: "Internal Server Error."

    });

  }

};

exports.updateTransaction = async (req, res) => {

  try {

    const userId = req.user.id;

    const transactionId = req.params.id;

   const {

title,

amount,

type,

category_id,

account_id,

payment_method,

transaction_date,

notes,

reference_no

} = req.body;

    /* =====================================================
       VALIDATION
    ===================================================== */

    const validation = validateTransaction(req.body);

if (!validation.valid) {

  return res.status(400).json({

    success:false,

    message:validation.message

  });

}{

      return res.status(400).json({

        success: false,

        message: "All required fields are mandatory."

      });

    }

    /* =====================================================
       TYPE VALIDATION
    ===================================================== */

    if (!["income", "expense"].includes(type)) {

      return res.status(400).json({

        success: false,

        message: "Invalid transaction type."

      });

    }

    /* =====================================================
       PAYMENT METHOD
    ===================================================== */

    const paymentMethods = [

      "Cash",

      "UPI",

      "Card",

      "Bank Transfer"

    ];

    if (!paymentMethods.includes(payment_method)) {

      return res.status(400).json({

        success: false,

        message: "Invalid payment method."

      });

    }

    /* =====================================================
       CHECK TRANSACTION
    ===================================================== */

    const transaction = await db("transactions")
      .where({

        id: transactionId,

        user_id: userId

      })
      .first();

    if (!transaction) {

      return res.status(404).json({

        success: false,

        message: "Transaction not found."

      });

    }

    /* =====================================================
       CHECK CATEGORY
    ===================================================== */

    const category = await db("categories")
      .where({

        id: category_id,

        type

      })
      .first();

    if (!category) {

      return res.status(404).json({

        success: false,

        message: "Category not found."

      });

    }

    const account = await db("accounts")

.where({

id:account_id,

user_id:userId,

is_active:true

})

.first();

if(!account){

return res.status(404).json({

success:false,

message:"Account not found."

});

}


const receipt_url = req.file

? `uploads/receipts/${req.file.filename}`

: transaction.receipt_url;

    /* =====================================================
       UPDATE
    ===================================================== */

    await db("transactions")
      .where({

        id: transactionId,

        user_id: userId

      })
     .update({

title,

amount,

type,

category_id,

account_id,

payment_method,

transaction_date,

notes,

reference_no,

receipt_url,

updated_at:db.fn.now()

});

    /* =====================================================
       RESPONSE
    ===================================================== */

    return res.status(200).json({

      success: true,

      message: "Transaction updated successfully."

    });

  } catch (error) {

    console.error("Update Transaction Error :", error);

    return res.status(500).json({

      success: false,

      message: "Internal Server Error."

    });

  }

};

exports.deleteTransaction = async (req, res) => {

  try {

    const userId = req.user.id;

    const transactionId = req.params.id;

    /* =====================================================
       CHECK TRANSACTION
    ===================================================== */

    const transaction = await db("transactions")
      .where({
        id: transactionId,
        user_id: userId
      })
      .first();

    if (!transaction) {

      return res.status(404).json({

        success: false,

        message: "Transaction not found."

      });

    }

    /* =====================================================
       DELETE TRANSACTION
    ===================================================== */

    await db("transactions")
      .where({
        id: transactionId,
        user_id: userId
      })
      .del();

    console.log("🗑️ Transaction Deleted :", transactionId);

    /* =====================================================
       RESPONSE
    ===================================================== */

    return res.status(200).json({

      success: true,

      message: "Transaction deleted successfully."

    });

  } catch (error) {

    console.error("\n❌ Delete Transaction Error");
    console.error("--------------------------------------");
    console.error(error.message);
    console.error("--------------------------------------");

    return res.status(500).json({

      success: false,

      message: "Internal Server Error."

    });

  }

};