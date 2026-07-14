import {
  FolderTree,
  TrendingUp,
  TrendingDown
} from "lucide-react";

import StatCard from "../ui/StatCard";

const CategoryStats = ({

  categories = []

}) => {

  /* =========================================================
     STATS
  ========================================================= */

  const totalCategories = categories.length;

  const incomeCategories = categories.filter(

    (category) =>

      category.type === "income"

  ).length;

  const expenseCategories = categories.filter(

    (category) =>

      category.type === "expense"

  ).length;

  return (

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

      {/* ==========================================
          TOTAL
      ========================================== */}

      <StatCard

        title="Total Categories"

        value={totalCategories}

        icon={FolderTree}

        color="blue"
         prefix=""

      />

      {/* ==========================================
          INCOME
      ========================================== */}

      <StatCard

        title="Income Categories"

        value={incomeCategories}

        icon={TrendingUp}

        color="green"
         prefix=""

      />

      {/* ==========================================
          EXPENSE
      ========================================== */}

      <StatCard

        title="Expense Categories"

        value={expenseCategories}

        icon={TrendingDown}

        color="red"
         prefix=""

      />

    </div>

  );

};

export default CategoryStats;