import {

  Wallet,

  TrendingUp,

  TrendingDown,

  PiggyBank

} from "lucide-react";

import StatCard from "../ui/StatCard";

const SummaryCards = ({

  summary = {},

  budget = {},

  cashFlow = {},

  monthlySavings = 0

}) => {

  return (

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

      {/* ==========================================
          BALANCE
      ========================================== */}

      <StatCard

        title="Current Balance"

        value={summary.balance || 0}

        icon={Wallet}

        color="blue"

      />

      {/* ==========================================
          INCOME
      ========================================== */}

      <StatCard

        title="Total Income"

        value={summary.income || 0}

        icon={TrendingUp}

        color="green"

      />

      {/* ==========================================
          EXPENSE
      ========================================== */}

      <StatCard

        title="Total Expense"

        value={summary.expense || 0}

        icon={TrendingDown}

        color="red"

      />

      {/* ==========================================
          SAVINGS
      ========================================== */}

      <StatCard

        title="Monthly Savings"

        value={monthlySavings}

        icon={PiggyBank}

        color="orange"

      />

    </div>

  );

};

export default SummaryCards;