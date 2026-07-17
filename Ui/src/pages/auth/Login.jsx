import { WalletCards } from "lucide-react";
import { motion } from "framer-motion";

import LoginForm from "../../components/forms/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">

        {/* ================= LEFT ================= */}

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden w-1/2 flex-col justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-16 text-white lg:flex"
        >
          <div className="max-w-md">
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 backdrop-blur">
              <WalletCards size={42} />
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight">
              Expense
              <br />
              Tracker
            </h1>

            <p className="mb-10 text-lg leading-8 text-blue-100">
              Manage your income, expenses, budgets, accounts and reports
              from one professional dashboard.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
                <p>Track Income & Expenses</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
                <p>Manage Budgets Easily</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
                <p>Professional Reports & Analytics</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
                <p>Export PDF & Excel Reports</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= RIGHT ================= */}

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="
            flex
            flex-1
            items-start
            justify-center
            p-4
            pt-8
            sm:p-6
            lg:items-center
            lg:p-6
          "
        >
          <div
            className="
              w-full
              max-w-md
              rounded-3xl
              border
              border-gray-100
              bg-white
              shadow-xl
              p-6
              sm:p-8
            "
          >
            {/* Logo */}

            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg lg:hidden">
                <WalletCards size={32} />
              </div>

              <h2 className="text-3xl font-bold text-gray-900">
                Welcome Back 👋
              </h2>

              <p className="mt-2 text-gray-500">
                Sign in to continue to your account
              </p>
            </div>

            <LoginForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;