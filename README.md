# 💰 Expense Tracker

A production-ready **Full Stack Expense Tracker** built with **React, Node.js, Express.js, MySQL (TiDB Cloud), and JWT Authentication**. The application enables users to securely manage their personal finances with powerful expense tracking, financial reporting, GitHub Single Sign-On (SSO), profile management, and a modern responsive dashboard.

Designed using a scalable architecture with secure authentication, RESTful APIs, modular backend structure, and responsive UI to simulate a real-world SaaS application.

---

## 🚀 Live Demo

### 🌐 Frontend
https://expense-tracker786.vercel.app

### ⚡ Backend API
https://expense-tracker-1-yjmg.onrender.com

---

# ✨ Features

## 🔐 Authentication & Security

- User Registration
- Secure Login
- JWT Authentication
- GitHub OAuth (Single Sign-On)
- Email OTP Verification
- Forgot Password
- Reset Password
- Password Encryption (bcrypt)
- Protected Routes
- Secure REST APIs
- Environment Variables
- Session Persistence

---

## 📊 Dashboard

- Financial Overview
- Total Income
- Total Expenses
- Current Balance
- Recent Transactions
- Expense Summary
- Category Breakdown
- Quick Financial Insights

---

## 💸 Transaction Management

- Add Income
- Add Expenses
- Edit Transactions
- Delete Transactions
- Search Transactions
- Filter Transactions
- Transaction History

---

## 📁 Category Management

- Create Categories
- Update Categories
- Delete Categories
- Category-wise Expense Tracking

---

## 📈 Reports & Analytics

- Monthly Reports
- Category-wise Reports
- Financial Analytics
- PDF Export
- Excel Export

---

## 👤 Profile Management

- Update Profile Information
- Change Password
- Manage Personal Information
- Language Preferences
- Delete Account
- Secure Account Settings

---

## ⚙ Settings

- Profile Settings
- Account Settings
- Password Management
- Language Selection
- Delete Account
- Security Settings

---

## 🎨 User Experience

- Modern Dashboard
- Responsive Design
- Mobile Friendly
- Tablet Optimized
- Desktop Optimized
- Clean User Interface
- Smooth Animations

---

# 🛠 Technology Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Framer Motion
- Lucide React

---

## Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt
- Nodemailer
- Knex.js
- REST API

---

## Database

- MySQL
- TiDB Cloud

---

## Authentication

- JWT
- GitHub OAuth
- Email OTP Verification

---

## Deployment

Frontend → Vercel

Backend → Render

Database → TiDB Cloud

---

# 📂 Project Structure

```text
Expense-Tracker
│
├── Backend
│   │
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── migrations
│   ├── routes
│   ├── services
│   ├── utils
│   ├── knexfile.cjs
│   ├── server.js
│   └── package.json
│
├── Frontend
│   │
│   ├── src
│   │   ├── api
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── layouts
│   │   ├── pages
│   │   ├── routes
│   │   ├── utils
│   │   └── App.jsx
│   │
│   ├── public
│   └── package.json
│
└── README.md
```

---

# 🔑 Environment Variables

## Backend

```env
PORT=

JWT_SECRET=

DB_HOST=

DB_PORT=

DB_USER=

DB_PASSWORD=

DB_NAME=

EMAIL_USER=

EMAIL_PASS=

GITHUB_CLIENT_ID=

GITHUB_CLIENT_SECRET=

GITHUB_CALLBACK_URL=

FRONTEND_URL=
```

## Frontend

```env
VITE_API_URL=
```

---

# ⚙ Installation

Clone the repository

```bash
git clone https://github.com/rayan-786/expense-tracker.git
```

Backend

```bash
cd Backend

npm install

npm run migrate

npm run dev
```

Frontend

```bash
cd Frontend

npm install

npm run dev
```

---

# 🔒 Security

- JWT Authentication
- Password Hashing
- Protected API Routes
- Secure Authentication Flow
- Email Verification
- GitHub OAuth Login
- Environment Variables
- Modular Backend Architecture

---

# 🚀 Upcoming Features

- 🤖 AI Financial Insights
- 💎 Pro Subscription (Razorpay)
- 📧 Monthly Email Reports
- 📥 CSV Import
- 🌙 Dark Mode
- 📱 Progressive Web App (PWA)

---

# 📈 Future Enhancements

- AI-powered Spending Analysis
- Subscription-based Premium Features
- Budget Planner
- Goal Tracking
- Smart Saving Recommendations
- Multi Currency Support
- Notification System

---

# 💼 Why This Project?

This project was built to demonstrate production-level full-stack development skills, including secure authentication, OAuth integration, REST API development, responsive frontend design, cloud database integration, and modern deployment practices. It reflects real-world application architecture with scalability and maintainability in mind.

---

# 👨‍💻 Author

**Rayan Ahmad**

GitHub

https://github.com/rayan-786

LinkedIn

(https://linkedin.com/in/rayan-ahmad786)

Portfolio

(https://rayan.website)

---

# 📄 License

Licensed under the MIT License.
