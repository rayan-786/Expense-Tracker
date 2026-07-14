const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const db = require("../config/db");

const generateToken = require("../utils/generateToken");

/* ======================================================

REGISTER

====================================================== */

exports.register = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {

      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });

    }

    const existing = await db("users")
      .where({ email })
      .first();

    if (existing) {

      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });

    }

    const hash = await bcrypt.hash(password, 10);

    const [id] = await db("users").insert({
  name,
  email,
  password: hash
});

// Default Accounts
await db("accounts").insert([
  {
    user_id: id,
    name: "Cash",
    type: "Cash",
    opening_balance: 0,
    current_balance: 0,
    is_default: 1,
    is_active: 1
  },
  {
    user_id: id,
    name: "HDFC Bank",
    type: "Bank",
    opening_balance: 0,
    current_balance: 0,
    is_default: 0,
    is_active: 1
  },
  {
    user_id: id,
    name: "UPI",
    type: "Wallet",
    opening_balance: 0,
    current_balance: 0,
    is_default: 0,
    is_active: 1
  },
  {
    user_id: id,
    name: "Paytm Wallet",
    type: "Wallet",
    opening_balance: 0,
    current_balance: 0,
    is_default: 0,
    
    is_active: 1
  },
  {
  user_id: id,
  name: "PhonePe Wallet",
  type: "Wallet",
  opening_balance: 0,
  current_balance: 0,
  is_default: 0,
  is_active: 1
},
{
  user_id: id,
  name: "Google Pay",
  type: "Wallet",
  opening_balance: 0,
  current_balance: 0,
  is_default: 0,
  is_active: 1
},
{
  user_id: id,
  name: "ICICI Bank",
  type: "Bank",
  opening_balance: 0,
  current_balance: 0,
  is_default: 0,
  is_active: 1
},
{
  user_id: id,
  name: "SBI Bank",
  type: "Bank",
  opening_balance: 0,
  current_balance: 0,
  is_default: 0,
  is_active: 1
}
]);

res.status(201).json({
  success: true,
  message: "User registered successfully",
  userId: id
});

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

};

/* ======================================================

LOGIN

====================================================== */

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await db("users")
      .where({ email })
      .first();

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found"
      });

    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {

      return res.status(401).json({
        success: false,
        message: "Invalid Password"
      });

    }

    const token = generateToken(user.id);

    res.json({

      success: true,

      message: "Login Successful",

      token,

      user: {

        id: user.id,

        name: user.name,

        email: user.email

      }

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

};

/* ======================================================

FORGOT PASSWORD

====================================================== */

exports.forgotPassword = async (req, res) => {

  try {

    const { email } = req.body;

    const user = await db("users")
      .where({ email })
      .first();

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found"
      });

    }

    const token = crypto.randomBytes(32).toString("hex");

    const expiry = new Date(
      Date.now() + 60 * 60 * 1000
    );

    await db("users")
      .where({ email })
      .update({

        reset_token: token,

        reset_token_expiry: expiry

      });

    res.json({

      success: true,

      message: "Reset token generated",

      token

    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

};

/* ======================================================

RESET PASSWORD

====================================================== */

exports.resetPassword = async (req, res) => {

  try {

    const { token, password } = req.body;

    const user = await db("users")
      .where({ reset_token: token })
      .first();

    if (!user) {

      return res.status(400).json({
        success: false,
        message: "Invalid Token"
      });

    }

    const hash = await bcrypt.hash(password, 10);

    await db("users")
      .where({ id: user.id })
      .update({

        password: hash,

        reset_token: null,

        reset_token_expiry: null

      });

    res.json({

      success: true,

      message: "Password Updated"

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: "Server Error"

    });

  }

};

/* ======================================================

PROFILE

====================================================== */

exports.profile = async (req, res) => {

  const user = await db("users")
    .where({ id: req.user.id })
    .select("id", "name", "email")
    .first();

  res.json({

    success: true,

    user

  });

};