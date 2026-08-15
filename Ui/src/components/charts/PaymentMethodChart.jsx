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

const PaymentMethodChart = ({ data = [] }) => {
  const chartData = data.map((item) => ({
    name: item.payment_method || "Unknown",
    value: Number(item.amount)
  }));

  return (
    <SectionCard
      title="Payment Methods"
      subtitle="Expense distribution by payment method"
      className="h-full"
    >
      {chartData.length === 0 ? (
        <div className="flex h-[350px] items-center justify-center text-gray-500">
          No payment data available.
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
                innerRadius={55}
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
                formatter={(value) => [formatCurrency(value), "Amount"]}
              />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </SectionCard>
  );
};

export default PaymentMethodChart;
