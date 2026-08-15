import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import SectionCard from "../ui/SectionCard";
import { formatCurrency } from "./chartColors";

const TopCategoriesChart = ({ data = [] }) => {
  const chartData = data.map((item) => ({
    category: item.category,
    amount: Number(item.amount)
  }));

  return (
    <SectionCard
      title="Top Expense Categories"
      subtitle="Highest spending categories"
      className="h-full"
    >
      {chartData.length === 0 ? (
        <div className="flex h-[350px] items-center justify-center text-gray-500">
          No category data available.
        </div>
      ) : (
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" />

              <XAxis
                type="number"
                tick={{ fill: "#64748B", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                type="category"
                dataKey="category"
                width={90}
                tick={{ fill: "#64748B", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                formatter={(value) => [formatCurrency(value), "Expense"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "none",
                  boxShadow: "0 10px 25px rgba(0,0,0,.08)"
                }}
              />

              <Bar
                dataKey="amount"
                fill="#2563EB"
                radius={[0, 8, 8, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </SectionCard>
  );
};

export default TopCategoriesChart;
