/* =========================================================
   BUDGET VALIDATOR
========================================================= */

const validateBudget = (data) => {

  const {

    category_id,

    month,

    year,

    amount

  } = data;

  /* =====================================================
     REQUIRED FIELDS
  ===================================================== */

  if (
    !category_id ||
    !month ||
    !year ||
    !amount
  ) {

    return {

      valid: false,

      message: "All required fields are mandatory."

    };

  }

  /* =====================================================
     CATEGORY
  ===================================================== */

  if (isNaN(category_id) || Number(category_id) <= 0) {

    return {

      valid: false,

      message: "Invalid category."

    };

  }

  /* =====================================================
     MONTH
  ===================================================== */

  if (
    isNaN(month) ||
    Number(month) < 1 ||
    Number(month) > 12
  ) {

    return {

      valid: false,

      message: "Month must be between 1 and 12."

    };

  }

  /* =====================================================
     YEAR
  ===================================================== */

  if (
    isNaN(year) ||
    String(year).length !== 4
  ) {

    return {

      valid: false,

      message: "Invalid year."

    };

  }

  /* =====================================================
     AMOUNT
  ===================================================== */

  if (
    isNaN(amount) ||
    Number(amount) <= 0
  ) {

    return {

      valid: false,

      message: "Budget amount must be greater than zero."

    };

  }

  /* =====================================================
     SUCCESS
  ===================================================== */

  return {

    valid: true

  };

};

module.exports = validateBudget;