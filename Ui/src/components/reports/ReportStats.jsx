import {
  IndianRupee,
  TrendingDown,
  PiggyBank,
  Activity
} from "lucide-react";

import StatCard from "../ui/StatCard";

const ReportStats = ({

  summary = {}

}) => {

  /* =========================================================
     DATA
  ========================================================= */

  const income = Number(summary?.income ?? 0);

const expense = Number(summary?.expense ?? 0);

const savings = Number(summary?.savings ?? 0);

const cashFlow = Number(summary?.cashFlow ?? 0);

  return (

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

      {/* ==========================================
          INCOME
      ========================================== */}

      <StatCard

        title="Total Income"

        value={income}

        icon={IndianRupee}

        color="green"

      />

      {/* ==========================================
          EXPENSE
      ========================================== */}

      <StatCard

        title="Total Expense"

        value={

          expense

}

        icon={TrendingDown}

        color="red"

      />

      {/* ==========================================
          SAVINGS
      ========================================== */}

      <StatCard

        title="Savings"

        value={

          savings

        }

        icon={PiggyBank}

        color="blue"

      />

      {/* ==========================================
          CASH FLOW
      ========================================== */}

      <StatCard

        title="Net Cash Flow"

        value={
          cashFlow

       }

        icon={Activity}

        color={

          cashFlow >= 0

            ? "emerald"

            : "orange"

        }

      />

    </div>

  );

};

export default ReportStats;