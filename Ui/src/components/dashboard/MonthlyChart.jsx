import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

import SectionCard from "../ui/SectionCard";

const MonthlyChart = ({ data = [] }) => {

  return (

    <SectionCard

      title="Monthly Overview"

      subtitle="Income vs Expense"

      className="h-full"

    >

      <div className="h-[350px] w-full">

        <ResponsiveContainer

          width="100%"

          height="100%"

        >

          <AreaChart

            data={data}

            margin={{

              top: 10,

              right: 20,

              left: 0,

              bottom: 0

            }}

          >

            {/* ===========================
                GRID
            =========================== */}

            <CartesianGrid

              strokeDasharray="4 4"

              stroke="#E5E7EB"

            />

            {/* ===========================
                X AXIS
            =========================== */}

            <XAxis

              dataKey="month"

              tick={{

                fill: "#64748B",

                fontSize: 12

              }}

              axisLine={false}

              tickLine={false}

            />

            {/* ===========================
                Y AXIS
            =========================== */}

            <YAxis

              tick={{

                fill: "#64748B",

                fontSize: 12

              }}

              axisLine={false}

              tickLine={false}

            />

            {/* ===========================
                TOOLTIP
            =========================== */}

            <Tooltip

              contentStyle={{

                borderRadius: 12,

                border: "none",

                boxShadow:

                  "0 10px 25px rgba(0,0,0,.08)"

              }}

            />

            {/* ===========================
                LEGEND
            =========================== */}

            <Legend />

            {/* ===========================
                INCOME
            =========================== */}

            <Area

              type="monotone"

              dataKey="income"

              stroke="#22C55E"

              fill="#22C55E"

              fillOpacity={0.18}

              strokeWidth={3}

              name="Income"

            />

            {/* ===========================
                EXPENSE
            =========================== */}

            <Area

              type="monotone"

              dataKey="expense"

              stroke="#EF4444"

              fill="#EF4444"

              fillOpacity={0.15}

              strokeWidth={3}

              name="Expense"

            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </SectionCard>

  );

};

export default MonthlyChart;