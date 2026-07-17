const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const db = require("../config/db");
const transporter = require("../config/mail");
const generateToken = require("../utils/generateToken");
const jwt = require("jsonwebtoken");

// exports.register = async (req, res) => {

//   try {

//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {

//       return res.status(400).json({
//         success: false,
//         message: "All fields are required"
//       });

//     }

//     const existing = await db("users")
//       .where({ email })
//       .first();

//     if (existing) {

//       return res.status(400).json({
//         success: false,
//         message: "Email already exists"
//       });

//     }

//     const hash = await bcrypt.hash(password, 10);

//     const [id] = await db("users").insert({
//   name,
//   email,
//   password: hash
// });

// // Default Accounts
// await db("accounts").insert([
//   {
//     user_id: id,
//     name: "Cash",
//     type: "Cash",
//     opening_balance: 0,
//     current_balance: 0,
//     is_default: 1,
//     is_active: 1
//   },
//   {
//     user_id: id,
//     name: "HDFC Bank",
//     type: "Bank",
//     opening_balance: 0,
//     current_balance: 0,
//     is_default: 0,
//     is_active: 1
//   },
//   {
//     user_id: id,
//     name: "UPI",
//     type: "Wallet",
//     opening_balance: 0,
//     current_balance: 0,
//     is_default: 0,
//     is_active: 1
//   },
//   {
//     user_id: id,
//     name: "Paytm Wallet",
//     type: "Wallet",
//     opening_balance: 0,
//     current_balance: 0,
//     is_default: 0,
    
//     is_active: 1
//   },
//   {
//   user_id: id,
//   name: "PhonePe Wallet",
//   type: "Wallet",
//   opening_balance: 0,
//   current_balance: 0,
//   is_default: 0,
//   is_active: 1
// },
// {
//   user_id: id,
//   name: "Google Pay",
//   type: "Wallet",
//   opening_balance: 0,
//   current_balance: 0,
//   is_default: 0,
//   is_active: 1
// },
// {
//   user_id: id,
//   name: "ICICI Bank",
//   type: "Bank",
//   opening_balance: 0,
//   current_balance: 0,
//   is_default: 0,
//   is_active: 1
// },
// {
//   user_id: id,
//   name: "SBI Bank",
//   type: "Bank",
//   opening_balance: 0,
//   current_balance: 0,
//   is_default: 0,
//   is_active: 1
// }
// ]);

// res.status(201).json({
//   success: true,
//   message: "User registered successfully",
//   userId: id
// });

//   } catch (error) {

//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: "Server Error"
//     });

//   }

// };

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const existing = await db("users")
      .where({ email })
      .first();

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // OTP expiry (5 minutes)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Save temporary registration data
    await db("email_otps")
      .insert({
        name,
        email,
        password: hashedPassword,
        otp,
        expires_at: expiresAt,
      })
      .onConflict("email")
      .merge();

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your Expense Tracker account",
      html: `
        <div style="font-family:Arial,sans-serif">
          <h2>Email Verification</h2>
          <p>Your OTP is:</p>
          <h1 style="letter-spacing:4px;">${otp}</h1>
          <p>This OTP will expire in <b>5 minutes</b>.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully to your email.",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
exports.sendEmailOTP = async (req, res) => {
  try {

    const { newEmail } = req.body;

    const userId = req.user.id;

    if (!newEmail) {
      return res.status(400).json({
        success: false,
        message: "New email is required",
      });
    }

    // Email already exists?
    const existing = await db("users")
      .where({ email: newEmail })
      .first();

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Generate OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const expiresAt = new Date(
      Date.now() + 5 * 60 * 1000
    );

    await db("email_change_otps")
        .where({ user_id: userId })
        .del();

      await db("email_change_otps").insert({
        user_id: userId,
        new_email: newEmail,
        otp,
        expires_at: expiresAt,
      });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: newEmail,
      subject: "Expense Tracker Email Verification",
      html: `
        <h2>Email Change Verification</h2>

        <p>Your OTP is</p>

        <h1>${otp}</h1>

        <p>Expires in 5 minutes.</p>
      `,
    });

    return res.json({
      success: true,
      message: "OTP sent successfully.",
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};
exports.updateEmail = async (req, res) => {
  try {

    const { otp } = req.body;

    const userId = req.user.id;

    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is required"
      });
    }

    const record = await db("email_change_otps")
      .where({ user_id: userId, otp })
      .first();

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    if (new Date(record.expires_at) < new Date()) {

      await db("email_change_otps")
        .where({ user_id: userId })
        .del();

      return res.status(400).json({
        success: false,
        message: "OTP expired"
      });

    }

    await db("users")
      .where({ id: userId })
      .update({
        email: record.new_email
      });

    await db("email_change_otps")
      .where({ user_id: userId })
      .del();

    const user = await db("users")
      .where({ id: userId })
      .first();

    return res.json({

      success: true,

      message: "Email updated successfully.",

      user: {

        id: user.id,

        name: user.name,

        email: user.email

      }

    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    // Get OTP data
    const otpData = await db("email_otps")
      .where({ email })
      .first();

    if (!otpData) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    }

    // Check expiry
    if (new Date() > new Date(otpData.expires_at)) {
      await db("email_otps").where({ email }).del();

      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // Verify OTP
    if (otpData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Create user
    const [id] = await db("users").insert({
      name: otpData.name,
      email: otpData.email,
      password: otpData.password,
    });

    // Create Default Accounts
    await db("accounts").insert([
      {
        user_id: id,
        name: "Cash",
        type: "Cash",
        opening_balance: 0,
        current_balance: 0,
        is_default: 1,
        is_active: 1,
      },
      {
        user_id: id,
        name: "HDFC Bank",
        type: "Bank",
        opening_balance: 0,
        current_balance: 0,
        is_default: 0,
        is_active: 1,
      },
      {
        user_id: id,
        name: "UPI",
        type: "Wallet",
        opening_balance: 0,
        current_balance: 0,
        is_default: 0,
        is_active: 1,
      },
      {
        user_id: id,
        name: "Paytm Wallet",
        type: "Wallet",
        opening_balance: 0,
        current_balance: 0,
        is_default: 0,
        is_active: 1,
      },
      {
        user_id: id,
        name: "PhonePe Wallet",
        type: "Wallet",
        opening_balance: 0,
        current_balance: 0,
        is_default: 0,
        is_active: 1,
      },
      {
        user_id: id,
        name: "Google Pay",
        type: "Wallet",
        opening_balance: 0,
        current_balance: 0,
        is_default: 0,
        is_active: 1,
      },
      {
        user_id: id,
        name: "ICICI Bank",
        type: "Bank",
        opening_balance: 0,
        current_balance: 0,
        is_default: 0,
        is_active: 1,
      },
      {
        user_id: id,
        name: "SBI Bank",
        type: "Bank",
        opening_balance: 0,
        current_balance: 0,
        is_default: 0,
        is_active: 1,
      },
    ]);

    // Delete OTP record
    await db("email_otps")
      .where({ email })
      .del();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId: id,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await db("users")
      .where({ email })
      .first();

    if (!user) {

  return res.status(401).json({

    success:false,

    message:"Invalid Email or Password"

  });

}

    const match = await bcrypt.compare(
      password,
      user.password
    );

   if (!match) {

  return res.status(401).json({

    success:false,

    message:"Invalid Email or Password"

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


exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const user = await db("users")
      .where({ email })
      .first();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Generate Reset Token
    const token = crypto.randomBytes(32).toString("hex");

    // Token Expiry (1 Hour)
    const expiry = new Date(Date.now() + 60 * 60 * 1000);

    // Save Token in Database
    await db("users")
      .where({ email })
      .update({
        reset_token: token,
        reset_token_expiry: expiry
      });

    // Reset Link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    // Send Email
    await transporter.sendMail({
      from: `"Expense Tracker" <${process.env.SMTP_EMAIL}>`,
      to: user.email,
      subject: "Reset Your Password",
      html: `
        <div style="font-family: Arial, sans-serif; padding:20px;">
          <h2>Expense Tracker</h2>

          <p>Hello <b>${user.name}</b>,</p>

          <p>You requested to reset your password.</p>

          <p>
            <a href="${resetLink}"
              style="
                background:#2563eb;
                color:#fff;
                padding:12px 20px;
                text-decoration:none;
                border-radius:6px;
                display:inline-block;">
              Reset Password
            </a>
          </p>

          <p>Or copy this link into your browser:</p>

          <p>${resetLink}</p>

          <p>This link will expire in <b>1 hour</b>.</p>

          <p>If you didn't request this, you can safely ignore this email.</p>

          <br>

          <p>Regards,<br><b>Expense Tracker Team</b></p>
        </div>
      `
    });

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email."
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


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

exports.updateProfile = async (req, res) => {
  try {

    const { username } = req.body;

    if (!username || username.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Username is required"
      });
    }

    await db("users")
      .where({ id: req.user.id })
      .update({
        name: username.trim()
      });

    const user = await db("users")
      .where({ id: req.user.id })
      .select("id", "name", "email")
      .first();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }
};

exports.changePassword = async (req, res) => {
  try {

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await db("users")
      .where({ id: req.user.id })
      .first();

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    await db("users")
      .where({ id: req.user.id })
      .update({
        password: hashedPassword,
      });

    return res.json({
      success: true,
      message: "Password updated successfully.",
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

exports.updateLanguage = async (req, res) => {

  try {

    const { language } = req.body;

    if (!["en","hi"].includes(language)) {

      return res.status(400).json({

        success:false,

        message:"Invalid language"

      });

    }

    await db("users")

      .where({

        id:req.user.id

      })

      .update({

        language

      });

    const user = await db("users")

      .where({

        id:req.user.id

      })

      .first();

    res.json({

      success:true,

      message:"Language updated successfully.",

      user

    });

  } catch(err){

    console.log(err);

    res.status(500).json({

      success:false,

      message:"Server Error"

    });

  }

};
exports.deleteAccount = async (req, res) => {
  try {

    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required"
      });
    }

    const user = await db("users")
      .where({ id: req.user.id })
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
      return res.status(400).json({
        success: false,
        message: "Incorrect password"
      });
    }

    // Delete user data

    await db("transactions")
      .where({ user_id: req.user.id })
      .del();

    await db("budgets")
      .where({ user_id: req.user.id })
      .del();

    await db("accounts")
      .where({ user_id: req.user.id })
      .del();

    // Delete user

    await db("users")
      .where({ id: req.user.id })
      .del();

    return res.json({
      success: true,
      message: "Account deleted successfully."
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }
};
exports.githubCallback=async(req,res)=>{

const github=req.user;

let user=await db("users")

.where({

email:github.email

})

.first();

if(!user){

const [id]=await db("users")

.insert({

name:github.name,

email:github.email,

github_id:github.id

});

user=await db("users")

.where({id})

.first();

}

const token = generateToken(user.id);

const encodedUser = encodeURIComponent(
  JSON.stringify({
    id: user.id,
    name: user.name,
    email: user.email,
  })
);

res.redirect(
  `${process.env.FRONTEND_URL}/auth/success?token=${token}&user=${encodedUser}`
);

};