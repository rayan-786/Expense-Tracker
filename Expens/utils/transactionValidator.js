/* =========================================================
   TRANSACTION VALIDATOR
========================================================= */

const validateTransaction = (data) => {

  const {
    title,
    amount,
    type,
    category_id,
    payment_method,
    transaction_date
  } = data;

  /* =======================================================
     REQUIRED FIELDS
  ======================================================= */

  if (
    !title ||
    !amount ||
    !type ||
    !category_id ||
    !payment_method ||
    !transaction_date
  ) {
    return {
      valid: false,
      message: "All required fields are mandatory."
    };
  }

  /* =======================================================
     TITLE
  ======================================================= */

  if (title.trim().length < 3) {
    return {
      valid: false,
      message: "Title must be at least 3 characters."
    };
  }

  /* =======================================================
     AMOUNT
  ======================================================= */

  if (isNaN(amount) || Number(amount) <= 0) {
    return {
      valid: false,
      message: "Amount must be greater than zero."
    };
  }

  /* =======================================================
     TYPE
  ======================================================= */

  if (!["income", "expense"].includes(type)) {
    return {
      valid: false,
      message: "Invalid transaction type."
    };
  }

  /* =======================================================
     PAYMENT METHOD
  ======================================================= */

  const methods = [
    "Cash",
    "UPI",
    "Card",
    "Bank Transfer"
  ];

  if (!methods.includes(payment_method)) {
    return {
      valid: false,
      message: "Invalid payment method."
    };
  }

  return {
    valid: true
  };

};

module.exports = validateTransaction;