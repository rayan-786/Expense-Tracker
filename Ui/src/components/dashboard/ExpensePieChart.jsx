import {

  PieChart,

  Pie,

  Cell,

  Tooltip,

  ResponsiveContainer,

  Legend

} from "recharts";

import SectionCard from "../ui/SectionCard";

/* =========================================================
   COLORS
========================================================= */

const COLORS = [

  "#2563EB",

  "#22C55E",

  "#F59E0B",

  "#EF4444",

  "#8B5CF6",

  "#14B8A6",

  "#EC4899",

  "#6366F1"

];

const ExpensePieChart = ({ data = [] }) => {

  /* =======================================================
     FORMAT DATA
  ======================================================= */

  const chartData = data.map((item) => ({

    name: item.category,

    value: Number(item.amount)

  }));

  return (

    <SectionCard

      title="Expense by Category"

      subtitle="Category wise expense distribution"

      className="h-full"

    >

      {chartData.length === 0 ? (

        <div className="flex h-[350px] items-center justify-center text-gray-500">

          No expense data available.

        </div>

      ) : (

        <div className="h-[350px]">

          <ResponsiveContainer

            width="100%"

            height="100%"

          >

            <PieChart>

              {/* =====================================
                  PIE
              ===================================== */}

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

                {chartData.map((entry, index) => (

                  <Cell

                    key={index}

                    fill={

                      COLORS[

                        index % COLORS.length

                      ]

                    }

                  />

                ))}

              </Pie>

              {/* =====================================
                  TOOLTIP
              ===================================== */}

              <Tooltip

                formatter={(value) => [

                  `₹ ${Number(value).toLocaleString("en-IN")}`,

                  "Expense"

                ]}

              />

              {/* =====================================
                  LEGEND
              ===================================== */}

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

      )}

    </SectionCard>

  );

};

export default ExpensePieChart;