import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

import SectionCard from "../ui/SectionCard";
import { CHART_COLORS, formatCurrency } from "./chartColors";

const AccountBalanceChart = ({ accounts = [] }) => {
  const chartData = accounts
    .filter((account) => Number(account.current_balance) !== 0)
    .map((account) => ({
      name: account.name,
      value: Number(account.current_balance)
    }));

  return (
    <SectionCard
      title="Balance Distribution"
      subtitle="Account-wise balance breakdown"
    >
      {chartData.length === 0 ? (
        <div className="flex h-[350px] items-center justify-center text-gray-500">
          No account balance data available.
        </div>
      ) : (
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={110}
                innerRadius={60}
                paddingAngle={3}
                dataKey="value"
                nameKey="name"
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => [formatCurrency(value), "Balance"]}
              />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </SectionCard>
  );
};

export default AccountBalanceChart;
