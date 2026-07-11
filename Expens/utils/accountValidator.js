/* =========================================================
   ACCOUNT VALIDATOR
========================================================= */

function validateAccount(data) {

  const {

    name,

    type,

    opening_balance,

    account_number

  } = data;

  /* =====================================================
     NAME
  ===================================================== */

  if (!name || name.trim() === "") {

    return {

      valid: false,

      message: "Account name is required."

    };

  }

  if (name.length > 100) {

    return {

      valid: false,

      message: "Account name cannot exceed 100 characters."

    };

  }

  /* =====================================================
     ACCOUNT TYPE
  ===================================================== */

  const validTypes = [

    "Cash",

    "Bank",

    "Wallet",

    "Credit Card"

  ];

  if (!type || !validTypes.includes(type)) {

    return {

      valid: false,

      message: "Invalid account type."

    };

  }

  /* =====================================================
     OPENING BALANCE
  ===================================================== */

  if (

    opening_balance === undefined ||

    opening_balance === null ||

    opening_balance === ""

  ) {

    return {

      valid: false,

      message: "Opening balance is required."

    };

  }

  if (

    isNaN(opening_balance) ||

    Number(opening_balance) < 0

  ) {

    return {

      valid: false,

      message: "Opening balance must be zero or greater."

    };

  }

  /* =====================================================
     ACCOUNT NUMBER
  ===================================================== */

  /* =====================================================
   ACCOUNT NUMBER
===================================================== */

if (

  type === "Bank" &&

  (!account_number || account_number.trim() === "")

) {

  return {

    valid: false,

    message: "Account number is required for bank accounts."

  };

}

if (

  account_number &&

  account_number.length > 50

) {

  return {

    valid: false,

    message: "Account number cannot exceed 50 characters."

  };

}

  /* =====================================================
     SUCCESS
  ===================================================== */

  return {

    valid: true

  };

}

module.exports = validateAccount;