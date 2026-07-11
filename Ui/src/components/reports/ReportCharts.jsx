import {

  ResponsiveContainer,

  BarChart,

  Bar,

  XAxis,

  YAxis,

  CartesianGrid,

  Tooltip,

  Legend,

  PieChart,

  Pie,

  Cell,

  LineChart,

  Line

} from "recharts";

const COLORS = [

  "#3B82F6",

  "#10B981",

  "#F59E0B",

  "#EF4444",

  "#8B5CF6",

  "#14B8A6"

];

const ReportCharts = ({

  monthlySummary = [],

  expenseByCategory = [],

  cashFlow = {}

}) => {

  /* =========================================================
     CASH FLOW DATA
  ========================================================= */

  const cashFlowData = [

    {

      name: "Cash In",

      amount:

        Number(

          cashFlow.cashIn || 0

        )

    },

    {

      name: "Cash Out",

      amount:

        Number(

          cashFlow.cashOut || 0

        )

    }

  ];

  return (

    <div className="space-y-6">

      {/* ==========================================
          ROW 1
      ========================================== */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* ======================================
            INCOME VS EXPENSE
        ====================================== */}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <h3 className="mb-5 text-lg font-semibold text-slate-800">

            Income vs Expense

          </h3>

          <div className="h-[320px]">

            <ResponsiveContainer>

              <BarChart

                data={monthlySummary}

              >

                <CartesianGrid

                  strokeDasharray="3 3"

                />

                <XAxis

                  dataKey="month"

                />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar

                  dataKey="income"

                  name="Income"

                  radius={[6,6,0,0]}

                  fill="#10B981"

                />

                <Bar

                  dataKey="expense"

                  name="Expense"

                  radius={[6,6,0,0]}

                  fill="#EF4444"

                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* ======================================
            CATEGORY PIE
        ====================================== */}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <h3 className="mb-5 text-lg font-semibold text-slate-800">

            Expense by Category

          </h3>

         <div className="h-[320px]">

  <ResponsiveContainer
    width="100%"
    height="100%"
  >

    <PieChart>

      <Pie
        data={expenseByCategory.map(item => ({
          ...item,
          amount: Number(item.amount)
        }))}
        dataKey="amount"
        nameKey="category"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
      >

        {expenseByCategory.map((_, index) => (

          <Cell
            key={index}
            fill={COLORS[index % COLORS.length]}
          />

        ))}

      </Pie>

      <Tooltip />

      <Legend />

    </PieChart>

  </ResponsiveContainer>

</div>

        </div>

      </div>
            {/* ==========================================
          ROW 2
      ========================================== */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* ======================================
            MONTHLY TREND
        ====================================== */}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <h3 className="mb-5 text-lg font-semibold text-slate-800">

            Monthly Trend

          </h3>

          <div className="h-[320px]">

            <ResponsiveContainer>

              <LineChart

                data={monthlySummary}

              >

                <CartesianGrid

                  strokeDasharray="3 3"

                />

                <XAxis

                  dataKey="month"

                />

                <YAxis />

                <Tooltip />

                <Legend />

                <Line

                  type="monotone"

                  dataKey="income"

                  name="Income"

                  stroke="#10B981"

                  strokeWidth={3}

                  dot={{ r: 4 }}

                />

                <Line

                  type="monotone"

                  dataKey="expense"

                  name="Expense"

                  stroke="#EF4444"

                  strokeWidth={3}

                  dot={{ r: 4 }}

                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* ======================================
            CASH FLOW
        ====================================== */}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <h3 className="mb-5 text-lg font-semibold text-slate-800">

            Cash Flow

          </h3>

          <div className="h-[320px]">

            <ResponsiveContainer>

              <BarChart

                data={cashFlowData}

              >

                <CartesianGrid

                  strokeDasharray="3 3"

                />

                <XAxis

                  dataKey="name"

                />

                <YAxis />

                <Tooltip />

                <Bar

                  dataKey="amount"

                  radius={[8, 8, 0, 0]}

                >

                  <Cell fill="#10B981" />

                  <Cell fill="#EF4444" />

                </Bar>

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>

  );

};

export default ReportCharts;