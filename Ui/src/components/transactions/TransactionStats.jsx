import {
  ArrowLeftRight,
  TrendingUp,
  TrendingDown,
  Wallet
} from "lucide-react";

import StatCard from "../ui/StatCard";

const TransactionStats = ({ transactions = [] }) => {

  /* =========================================================
     CALCULATIONS
  ========================================================= */

  const totalTransactions = transactions.length;

  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const totalExpense = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const balance = totalIncome - totalExpense;

  return (

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Transactions"
        value={totalTransactions}
        prefix=""
        icon={ArrowLeftRight}
        color="blue"
      />

      <StatCard
        title="Income"
        value={totalIncome}
        icon={TrendingUp}
        color="green"
      />

      <StatCard
        title="Expense"
        value={totalExpense}
        icon={TrendingDown}
        color="red"
      />

      <StatCard
        title="Net Balance"
        value={balance}
        icon={Wallet}
        color="orange"
      />

    </div>

  );

};

export default TransactionStats;