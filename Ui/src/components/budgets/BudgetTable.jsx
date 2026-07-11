import {
  Eye,
  Pencil,
  Trash2,
  Wallet,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const BudgetTable = ({

  budgets = [],

  loading = false,

  pagination,

  onPageChange,

  onLimitChange,

  onView,

  onEdit,

  onDelete,

  onAdd

}) => {

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {

    return (

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div className="animate-pulse">

          <div className="border-b border-slate-200 p-6">

            <div className="h-6 w-52 rounded bg-slate-200"></div>

            <div className="mt-3 h-4 w-72 rounded bg-slate-100"></div>

          </div>

          <div className="space-y-4 p-6">

            {

              Array.from({

                length: 8

              }).map((_, index) => (

                <div

                  key={index}

                  className="flex items-center gap-4 rounded-xl border border-slate-100 p-4"

                >

                  <div className="h-12 w-12 rounded-xl bg-slate-200"></div>

                  <div className="flex-1">

                    <div className="h-4 w-52 rounded bg-slate-200"></div>

                    <div className="mt-2 h-3 w-32 rounded bg-slate-100"></div>

                  </div>

                  <div className="h-6 w-20 rounded bg-slate-200"></div>

                  <div className="h-6 w-24 rounded bg-slate-100"></div>

                  <div className="h-10 w-28 rounded-xl bg-slate-200"></div>

                </div>

              ))

            }

          </div>

        </div>

      </div>

    );

  }

  /* =========================================================
     EMPTY
  ========================================================= */

  if (!budgets.length) {

    return (

      <div className="rounded-3xl border border-slate-200 bg-white p-20 text-center shadow-sm">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">

          <Wallet

            size={38}

            className="text-blue-600"

          />

        </div>

        <h3 className="mt-6 text-2xl font-bold text-slate-900">

          No Budgets Found

        </h3>

        <p className="mt-3 text-slate-500">

          Create your first monthly budget.

        </p>

        {

          onAdd && (

            <button

              onClick={onAdd}

              className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"

            >

              Add Budget

            </button>

          )

        }

      </div>

    );

  }

  /* =========================================================
     TABLE
  ========================================================= */

  return (

    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="border-b border-slate-200 px-6 py-5">

        <h2 className="text-lg font-semibold text-slate-900">

          Monthly Budgets

        </h2>

        <p className="mt-1 text-sm text-slate-500">

          Monitor your spending and budget utilization.

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

                Category

              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

                Month

              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

                Budget

              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

                Spent

              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

                Remaining

              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

                Progress

              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

                Status

              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">

                Actions

              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100">
                        {budgets.map((budget) => {

              const budgetAmount = Number(

                budget.amount || 0

              );

              const spent = Number(

                budget.spent || 0

              );

              const remaining =

                budgetAmount - spent;

              const usage =

                budgetAmount > 0

                  ? (spent / budgetAmount) * 100

                  : 0;

              let status = "Safe";

              let statusClass =
                "bg-green-100 text-green-700";

              if (usage > 90 && usage <= 100) {

                status = "Warning";

                statusClass =
                  "bg-yellow-100 text-yellow-700";

              }

              if (usage > 100) {

                status = "Over Budget";

                statusClass =
                  "bg-red-100 text-red-700";

              }

              return (

                <tr

                  key={budget.id}

                  className="transition hover:bg-slate-50"

                >

                  {/* CATEGORY */}

                  <td className="px-6 py-5">

                    <div>

                      <h4 className="font-semibold text-slate-800">

                        {budget.category_name}

                      </h4>

                    </div>

                  </td>

                  {/* MONTH */}

                  <td className="px-6 py-5 text-slate-600">

                    {budget.month}

                  </td>

                  {/* BUDGET */}

                  <td className="px-6 py-5 font-semibold text-blue-600">

                    ₹

                    {budgetAmount.toLocaleString("en-IN")}

                  </td>

                  {/* SPENT */}

                  <td className="px-6 py-5 font-semibold text-red-600">

                    ₹

                    {spent.toLocaleString("en-IN")}

                  </td>

                  {/* REMAINING */}

                  <td className="px-6 py-5 font-semibold">

                    <span

                      className={

                        remaining >= 0

                          ? "text-green-600"

                          : "text-red-600"

                      }

                    >

                      ₹

                      {remaining.toLocaleString("en-IN")}

                    </span>

                  </td>

                  {/* PROGRESS */}

                  <td className="px-6 py-5">

                    <div className="w-40">

                      <div className="h-2 overflow-hidden rounded-full bg-slate-200">

                        <div

                          className={`h-full rounded-full transition-all

                          ${

                            usage <= 60

                              ? "bg-green-500"

                              : usage <= 90

                              ? "bg-yellow-500"

                              : "bg-red-500"

                          }`}

                          style={{

                            width: `${Math.min(

                              usage,

                              100

                            )}%`

                          }}

                        />

                      </div>

                      <p className="mt-2 text-xs font-medium text-slate-600">

                        {usage.toFixed(1)}%

                      </p>

                    </div>

                  </td>

                  {/* STATUS */}

                  <td className="px-6 py-5">

                    <span

                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}

                    >

                      {status}

                    </span>

                  </td>

                  {/* ACTIONS */}

                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-2">

                      <button

                        onClick={() =>

                          onView(budget)

                        }

                        className="rounded-xl bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"

                      >

                        <Eye size={18} />

                      </button>

                      <button

                        onClick={() =>

                          onEdit(budget)

                        }

                        className="rounded-xl bg-amber-50 p-2 text-amber-600 transition hover:bg-amber-100"

                      >

                        <Pencil size={18} />

                      </button>

                      <button

                        onClick={() =>

                          onDelete(budget)

                        }

                        className="rounded-xl bg-red-50 p-2 text-red-600 transition hover:bg-red-100"

                      >

                        <Trash2 size={18} />

                      </button>

                    </div>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

      {/* ==========================================
          PAGINATION
      ========================================== */}

      {pagination && (

        <div className="flex flex-col gap-4 border-t border-slate-200 px-6 py-4 md:flex-row md:items-center md:justify-between">

          <p className="text-sm text-slate-500">

            Showing

            <span className="mx-1 font-semibold text-slate-800">

              {Math.min(

                (pagination.page - 1) *

                  pagination.limit +

                  1,

                pagination.total

              )}

            </span>

            -

            <span className="mx-1 font-semibold text-slate-800">

              {Math.min(

                pagination.page *

                  pagination.limit,

                pagination.total

              )}

            </span>

            of

            <span className="mx-1 font-semibold text-slate-800">

              {pagination.total}

            </span>

          </p>

          <div className="flex items-center gap-3">

            <select

              value={pagination.limit}

              onChange={(e) =>

                onLimitChange(

                  Number(e.target.value)

                )

              }

              className="rounded-xl border border-slate-300 px-3 py-2 text-sm"

            >

              <option value={10}>10</option>

              <option value={25}>25</option>

              <option value={50}>50</option>

              <option value={100}>100</option>

            </select>

            <button

              disabled={pagination.page === 1}

              onClick={() =>

                onPageChange(

                  pagination.page - 1

                )

              }

              className="rounded-xl border border-slate-300 p-2 disabled:opacity-40"

            >

              <ChevronLeft size={18} />

            </button>

            <div className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white">

              {pagination.page} / {pagination.totalPages}

            </div>

            <button

              disabled={

                pagination.page >=

                pagination.totalPages

              }

              onClick={() =>

                onPageChange(

                  pagination.page + 1

                )

              }

              className="rounded-xl border border-slate-300 p-2 disabled:opacity-40"

            >

              <ChevronRight size={18} />

            </button>

          </div>

        </div>

      )}

    </div>

  );

};

export default BudgetTable;