import {
  Receipt,
  Calendar,
  CreditCard,
  Tags
} from "lucide-react";

const TopExpensesTable = ({

  expenses = []

}) => {

  /* =========================================================
     EMPTY STATE
  ========================================================= */

  if (!expenses.length) {

    return (

      <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center shadow-sm">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50">

          <Receipt

            size={38}

            className="text-red-600"

          />

        </div>

        <h3 className="mt-5 text-2xl font-bold text-slate-900">

          No Expense Data

        </h3>

        <p className="mt-2 text-slate-500">

          Top expense transactions will appear here.

        </p>

      </div>

    );

  }

  return (

    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="border-b border-slate-200 px-6 py-5">

        <h2 className="text-lg font-semibold text-slate-900">

          Top Expenses

        </h2>

        <p className="mt-1 text-sm text-slate-500">

          Highest expense transactions in selected period.

        </p>

      </div>

      {/* ==========================================
          TABLE
      ========================================== */}

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

                Transaction

              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

                Category

              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

                Account

              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

                Date

              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">

                Amount

              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100">

            {

              expenses.map((item) => (

                <tr

                  key={item.id}

                  className="transition hover:bg-slate-50"

                >

                  {/* TRANSACTION */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <div className="rounded-xl bg-red-100 p-2">

                        <Receipt

                          size={18}

                          className="text-red-600"

                        />

                      </div>

                      <div>

                        <h4 className="font-semibold text-slate-800">

                          {item.title}

                        </h4>

                        <p className="mt-1 text-xs text-slate-500">

                          #{item.id}

                        </p>

                      </div>

                    </div>

                  </td>

                  {/* CATEGORY */}

                  <td className="px-6 py-5">

                    <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">

                      <Tags size={14} />

                      {item.category_name}

                    </span>

                  </td>

                  {/* ACCOUNT */}

                  <td className="px-6 py-5">

                    <div className="inline-flex items-center gap-2 text-slate-700">

                      <CreditCard size={16} />

                      {item.account_name}

                    </div>

                  </td>

                  {/* DATE */}

                  <td className="px-6 py-5">

                    <div className="inline-flex items-center gap-2 text-slate-600">

                      <Calendar size={16} />

                      {item.transaction_date}

                    </div>

                  </td>

                  {/* AMOUNT */}

                  <td className="px-6 py-5 text-right">

                    <span className="font-bold text-red-600">

                      ₹

                      {Number(

                        item.amount || 0

                      ).toLocaleString("en-IN")}

                    </span>

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default TopExpensesTable;