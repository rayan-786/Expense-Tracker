import { useEffect, useState } from "react";

import {

  RefreshCw,

  AlertCircle

} from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";

import SummaryCards from "../../components/dashboard/SummaryCards";
import MonthlyChart from "../../components/dashboard/MonthlyChart";
import ExpensePieChart from "../../components/dashboard/ExpensePieChart";
import BudgetProgress from "../../components/dashboard/BudgetProgress";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import AccountsSummary from "../../components/dashboard/AccountsSummary";
import QuickActions from "../../components/dashboard/QuickActions";

import {

  getDashboard

} from "../../services/dashboard.service";

const Dashboard = () => {

  /* =========================================================
     STATE
  ========================================================= */

  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /* =========================================================
     FETCH DASHBOARD
  ========================================================= */

  const fetchDashboard = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await getDashboard();

      setDashboard(response.data);

    }

    catch (err) {

      console.error(err);

      setError(

        err.response?.data?.message ||

        "Unable to load dashboard."

      );

    }

    finally {

      setLoading(false);

    }

  };

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {

    fetchDashboard();

  }, []);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {

    return (

      <div className="flex h-[75vh] items-center justify-center">

        <div className="flex flex-col items-center gap-5">

          <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

          <p className="text-sm text-slate-500">

            Loading dashboard...

          </p>

        </div>

      </div>

    );

  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {

    return (

      <div className="flex h-[75vh] items-center justify-center">

        <div className="w-full max-w-md rounded-3xl border border-red-200 bg-red-50 p-8 text-center">

          <AlertCircle

            size={48}

            className="mx-auto mb-4 text-red-500"

          />

          <h2 className="text-xl font-bold text-red-600">

            Failed to Load Dashboard

          </h2>

          <p className="mt-3 text-sm text-gray-600">

            {error}

          </p>

          <button

            onClick={fetchDashboard}

            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"

          >

            <RefreshCw size={18} />

            Retry

          </button>

        </div>

      </div>

    );

  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (

    <div className="space-y-8">

      <PageHeader

        title="Dashboard"

        subtitle="Track your income, expenses, budgets and financial performance."

        action={

          <button

            onClick={fetchDashboard}

            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"

          >

            <RefreshCw size={18} />

            Refresh

          </button>

        }

      />
            {/* =========================================================
          SUMMARY CARDS
      ========================================================= */}

      <SummaryCards
        summary={dashboard?.summary}
        budget={dashboard?.budget}
        cashFlow={dashboard?.cashFlow}
        monthlySavings={dashboard?.monthlySavings?.savings}
      />

      {/* =========================================================
          CASH FLOW
      ========================================================= */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-emerald-500 to-green-600 p-6 text-white shadow-sm">

          <p className="text-sm opacity-90">

            Cash In

          </p>

          <h2 className="mt-3 text-3xl font-bold">

            ₹

            {Number(

              dashboard?.cashFlow?.cashIn || 0

            ).toLocaleString("en-IN")}

          </h2>

          <p className="mt-2 text-sm opacity-80">

            Total incoming amount

          </p>

        </div>

        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-red-500 to-rose-600 p-6 text-white shadow-sm">

          <p className="text-sm opacity-90">

            Cash Out

          </p>

          <h2 className="mt-3 text-3xl font-bold">

            ₹

            {Number(

              dashboard?.cashFlow?.cashOut || 0

            ).toLocaleString("en-IN")}

          </h2>

          <p className="mt-2 text-sm opacity-80">

            Total outgoing amount

          </p>

        </div>

        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white shadow-sm">

          <p className="text-sm opacity-90">

            Net Cash Flow

          </p>

          <h2 className="mt-3 text-3xl font-bold">

            ₹

            {Number(

              dashboard?.cashFlow?.netFlow || 0

            ).toLocaleString("en-IN")}

          </h2>

          <p className="mt-2 text-sm opacity-80">

            Current financial position

          </p>

        </div>

      </div>

      {/* =========================================================
          CHARTS
      ========================================================= */}

      <div className="grid grid-cols-1 gap-6 2xl:grid-cols-3">

        {/* ==========================
            MONTHLY CHART
        ========================== */}

        <div className="2xl:col-span-2">

          <MonthlyChart

            data={dashboard?.monthlySummary || []}

          />

        </div>

        {/* ==========================
            PIE CHART
        ========================== */}

        <ExpensePieChart

          data={dashboard?.expenseByCategory || []}

        />

      </div>

            {/* =========================================================
          RECENT TRANSACTIONS + BUDGET
      ========================================================= */}

      <div className="grid grid-cols-1 gap-6 2xl:grid-cols-3">

        {/* ==========================
            RECENT TRANSACTIONS
        ========================== */}

        <div className="2xl:col-span-2">

          <RecentTransactions

            transactions={

              dashboard?.recentTransactions || []

            }

          />

        </div>

        {/* ==========================
            BUDGET PROGRESS
        ========================== */}

        <BudgetProgress

          budget={dashboard?.budget}

        />

      </div>

      {/* =========================================================
          ACCOUNTS + QUICK ACTIONS
      ========================================================= */}

      <div className="grid grid-cols-1 gap-6 2xl:grid-cols-3">

        {/* ==========================
            ACCOUNTS
        ========================== */}

        <div className="2xl:col-span-2">

          <AccountsSummary

            accountsSummary={

              dashboard?.accountsSummary || {}

            }

          />

        </div>

        {/* ==========================
            QUICK ACTIONS
        ========================== */}

        <QuickActions />

      </div>

    </div>

  );

};

export default Dashboard;