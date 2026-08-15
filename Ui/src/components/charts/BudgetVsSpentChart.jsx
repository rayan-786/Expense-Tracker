import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import SectionCard from "../ui/SectionCard";
import { formatCurrency } from "./chartColors";

const BudgetVsSpentChart = ({ budgets = [] }) => {
  const chartData = budgets.map((item) => ({
    category: item.category_name || "Unknown",
    budget: Number(item.amount),
    spent: Number(item.spent || 0)
  }));

  return (
    <SectionCard
      title="Budget vs Spent"
      subtitle="Compare allocated budget with actual spending"
    >
      {chartData.length === 0 ? (
        <div className="flex h-[350px] items-center justify-center text-gray-500">
          No budget data available.
        </div>
      ) : (
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" />

              <XAxis
                dataKey="category"
                tick={{ fill: "#64748B", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fill: "#64748B", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                formatter={(value) => formatCurrency(value)}
                contentStyle={{
                  borderRadius: 12,
                  border: "none",
                  boxShadow: "0 10px 25px rgba(0,0,0,.08)"
                }}
              />

              <Legend />

              <Bar
                dataKey="budget"
                name="Budget"
                fill="#2563EB"
                radius={[6, 6, 0, 0]}
              />

              <Bar
                dataKey="spent"
                name="Spent"
                fill="#EF4444"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </SectionCard>
  );
};

export default BudgetVsSpentChart;
