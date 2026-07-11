import {
  Wallet,
  TrendingDown,
  PiggyBank,
  Target
} from "lucide-react";

import StatCard from "../ui/StatCard";

const BudgetStats = ({

  budgets = []

}) => {

  /* =========================================================
     CALCULATIONS
  ========================================================= */

  const totalBudget = budgets.reduce(

    (sum, budget) =>

      sum +

      Number(

        budget.amount || 0

      ),

    0

  );

  const totalSpent = budgets.reduce(

    (sum, budget) =>

      sum +

      Number(

        budget.spent || 0

      ),

    0

  );

  const remaining =

    totalBudget -

    totalSpent;

  const usage =

    totalBudget > 0

      ? (

          totalSpent /

          totalBudget

        ) * 100

      : 0;

  return (

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

      {/* ==========================================
          TOTAL BUDGET
      ========================================== */}

      <StatCard

        title="Total Budget"

        value={totalBudget}

        icon={Wallet}

        color="blue"

      />

      {/* ==========================================
          SPENT
      ========================================== */}

      <StatCard

        title="Spent"

        value={totalSpent}

        icon={TrendingDown}

        color="red"

      />

      {/* ==========================================
          REMAINING
      ========================================== */}

      <StatCard

        title="Remaining"

        value={remaining}

        icon={PiggyBank}

        color="green"

      />

      {/* ==========================================
          USAGE
      ========================================== */}

      <StatCard

        title="Usage"

        value={usage}

        icon={Target}

        color="amber"

      />

    </div>

  );

};

export default BudgetStats;