const db = require("../config/db");

const validateAccount = require("../utils/accountValidator");


exports.createAccount = async (req, res) => {

  try {

    const userId = req.user.id;

    /* =====================================================
       VALIDATION
    ===================================================== */

    const validation = validateAccount(req.body);

    if (!validation.valid) {

      return res.status(400).json({

        success: false,

        message: validation.message

      });

    }

    const {

      name,

      type,

      opening_balance,

      account_number,

      is_default = false

    } = req.body;

    /* =====================================================
       CHECK DUPLICATE ACCOUNT
    ===================================================== */

    const existingAccount = await db("accounts")

      .where({

        user_id: userId,

        name

      })

      .first();

    if (existingAccount) {

      return res.status(400).json({

        success: false,

        message: "Account name already exists."

      });

    }

const totalAccounts = await db("accounts")

  .where({

    user_id: userId

  })

  .count("id as total")

  .first();

let defaultAccount = is_default;

if (Number(totalAccounts.total) === 0) {

  defaultAccount = true;

}

if (defaultAccount) {

  await db("accounts")

    .where({

      user_id: userId

    })

    .update({

      is_default: false

    });

}

    /* =====================================================
       CREATE ACCOUNT
    ===================================================== */

    const [accountId] = await db("accounts")

      .insert({

        user_id: userId,

        name,

        type,

        account_number: account_number || null,

        opening_balance,

        current_balance: opening_balance,

        is_default: defaultAccount,

        is_active: true

      });

    console.log("💳 Account Created :", accountId);

    /* =====================================================
       RESPONSE
    ===================================================== */

   return res.status(201).json({

  success: true,

  message: "Account created successfully.",

  data: {

    id: accountId,

    name,

    type,

    opening_balance,

    current_balance: opening_balance,

    is_default: defaultAccount

  }

});

  } catch (error) {

    console.error("\n❌ Create Account Error");

    console.error("----------------------------------------");

    console.error(error.message);

    console.error("----------------------------------------");

    return res.status(500).json({

      success: false,

      message: "Internal Server Error."

    });

  }

};

exports.getAccounts = async (req, res) => {

  try {

    const userId = req.user.id;

    /* =====================================================
       QUERY PARAMS
    ===================================================== */

    const {

      page = 1,

      limit = 10,

      search = "",

      type,

      is_active

    } = req.query;

    const offset = (page - 1) * limit;

    /* =====================================================
       BASE QUERY
    ===================================================== */

    let query = db("accounts")

      .where({

        user_id: userId

      });

    /* =====================================================
       SEARCH
    ===================================================== */

    if (search) {

      query.where(

        "name",

        "like",

        `%${search}%`

      );

    }

    /* =====================================================
       FILTER TYPE
    ===================================================== */

    if (type) {

      query.andWhere(

        "type",

        type

      );

    }

    /* =====================================================
       FILTER STATUS
    ===================================================== */

    if (

      is_active !== undefined

    ) {

      query.andWhere(

        "is_active",

        is_active

      );

    }

    /* =====================================================
       TOTAL COUNT
    ===================================================== */

    const totalResult = await query

      .clone()

      .count("id as total")

      .first();

    const total = Number(

      totalResult.total

    );

    /* =====================================================
       FETCH DATA
    ===================================================== */

    const accounts = await query

      .clone()

      .select(

        "id",

        "name",

        "type",

        "account_number",

        "opening_balance",

        "current_balance",

        "is_default",

        "is_active",

        "created_at",

        "updated_at"

      )

      .orderBy(

        "is_default",

        "desc"

      )

      .orderBy(

        "created_at",

        "desc"

      )

      .limit(limit)

      .offset(offset);

    /* =====================================================
       RESPONSE
    ===================================================== */

    return res.status(200).json({

      success: true,

      message: "Accounts fetched successfully.",

      data: accounts,

      pagination: {

        page: Number(page),

        limit: Number(limit),

        total,

        totalPages: Math.ceil(

          total / limit

        )

      }

    });

  } catch (error) {

    console.error(

      "Get Accounts Error :",

      error

    );

    return res.status(500).json({

      success: false,

      message: "Internal Server Error."

    });

  }

};

exports.getAccount = async (req, res) => {

  try {

    const userId = req.user.id;

    const accountId = req.params.id;

    /* =====================================================
       FETCH ACCOUNT
    ===================================================== */

    const account = await db("accounts")

      .select(

        "id",

        "name",

        "type",

        "account_number",

        "opening_balance",

        "current_balance",

        "is_default",

        "is_active",

        "created_at",

        "updated_at"

      )

      .where({

        id: accountId,

        user_id: userId

      })

      .first();

    /* =====================================================
       NOT FOUND
    ===================================================== */

    if (!account) {

      return res.status(404).json({

        success: false,

        message: "Account not found."

      });

    }

    /* =====================================================
       RESPONSE
    ===================================================== */

    return res.status(200).json({

      success: true,

      message: "Account fetched successfully.",

      data: account

    });

  } catch (error) {

    console.error("Get Account Error :", error);

    return res.status(500).json({

      success: false,

      message: "Internal Server Error."

    });

  }

};

exports.updateAccount = async (req, res) => {

  try {

    const userId = req.user.id;

    const accountId = req.params.id;

    /* =====================================================
       VALIDATION
    ===================================================== */

    const validation = validateAccount(req.body);

    if (!validation.valid) {

      return res.status(400).json({

        success: false,

        message: validation.message

      });

    }

    const {

      name,

      type,

      account_number,

      opening_balance,

      is_default = false,

      is_active = true

    } = req.body;

    /* =====================================================
       CHECK ACCOUNT
    ===================================================== */

    const account = await db("accounts")

      .where({

        id: accountId,

        user_id: userId

      })

      .first();

    if (!account) {

      return res.status(404).json({

        success: false,

        message: "Account not found."

      });

    }

    /* =====================================================
       CHECK DUPLICATE ACCOUNT NAME
    ===================================================== */

    const duplicate = await db("accounts")

      .where({

        user_id: userId,

        name

      })

      .whereNot("id", accountId)

      .first();

    if (duplicate) {

      return res.status(400).json({

        success: false,

        message: "Account name already exists."

      });

    }

    /* =====================================================
       DEFAULT ACCOUNT
    ===================================================== */

    if (is_default) {

      await db("accounts")

        .where({

          user_id: userId

        })

        .update({

          is_default: false

        });

    }


await db("accounts")

  .where({

    id: accountId,

    user_id: userId

  })

  .update({

    name,

    type,

    account_number: account_number || null,

    opening_balance,

    is_default,

    is_active,

    updated_at: db.fn.now()

  });

    console.log("💳 Account Updated :", accountId);

    return res.status(200).json({

      success: true,

      message: "Account updated successfully."

    });

  } catch (error) {

    console.error("\n❌ Update Account Error");

    console.error("----------------------------------------");

    console.error(error.message);

    console.error("----------------------------------------");

    return res.status(500).json({

      success: false,

      message: "Internal Server Error."

    });

  }

};

exports.deleteAccount = async (req, res) => {

  try {

    const userId = req.user.id;

    const accountId = req.params.id;

    /* =====================================================
       CHECK ACCOUNT
    ===================================================== */

    const account = await db("accounts")

      .where({

        id: accountId,

        user_id: userId

      })

      .first();

    if (!account) {

      return res.status(404).json({

        success: false,

        message: "Account not found."

      });

    }

    /* =====================================================
       CHECK TRANSACTIONS
    ===================================================== */

    const transaction = await db("transactions")

      .where({

        account_id: accountId

      })

      .first();

    if (transaction) {

      return res.status(400).json({

        success: false,

        message: "Cannot delete account because transactions exist."

      });

    }

    /* =====================================================
       CHECK DEFAULT ACCOUNT
    ===================================================== */

    if (account.is_default) {

      const totalAccounts = await db("accounts")

        .where({

          user_id: userId,

          is_active: true

        })

        .whereNot("id", accountId)

        .count("id as total")

        .first();

      if (Number(totalAccounts.total) > 0) {

        return res.status(400).json({

          success: false,

          message: "Default account cannot be deleted. Please set another account as default."

        });

      }

    }

    /* =====================================================
       DELETE ACCOUNT
    ===================================================== */

    await db("accounts")

      .where({

        id: accountId,

        user_id: userId

      })

      .del();

    console.log("🗑️ Account Deleted :", accountId);

    /* =====================================================
       RESPONSE
    ===================================================== */

    return res.status(200).json({

      success: true,

      message: "Account deleted successfully."

    });

  } catch (error) {

    console.error("\n❌ Delete Account Error");

    console.error("----------------------------------------");

    console.error(error.message);

    console.error("----------------------------------------");

    return res.status(500).json({

      success: false,

      message: "Internal Server Error."

    });

  }

};