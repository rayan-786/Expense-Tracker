import {

  Eye,

  Pencil,

  Trash2,

  ArrowUpCircle,

  ArrowDownCircle

} from "lucide-react";

const TransactionTable = ({

  transactions = [],

  loading = false,

  onView,

  onEdit,

  onDelete

}) => {

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {

    return (

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div className="animate-pulse p-8">

          <div className="mb-6 h-6 w-56 rounded bg-slate-200"></div>

          {[1, 2, 3, 4, 5].map((item) => (

            <div

              key={item}

              className="mb-4 h-16 rounded-xl bg-slate-100"

            />

          ))}

        </div>

      </div>

    );

  }

  /* =========================================================
     EMPTY STATE
  ========================================================= */

  if (!transactions.length) {

    return (

      <div className="rounded-3xl border border-slate-200 bg-white p-20 text-center shadow-sm">

        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">

          <ArrowUpCircle

            size={36}

            className="text-slate-400"

          />

        </div>

        <h3 className="text-xl font-semibold text-slate-800">

          No Transactions Found

        </h3>

        <p className="mt-2 text-slate-500">

          Add your first income or expense transaction.

        </p>

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

      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

        <div>

          <h2 className="text-lg font-semibold text-slate-900">

            Transactions

          </h2>

          <p className="mt-1 text-sm text-slate-500">

            Latest income & expense records

          </p>

        </div>

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

                Payment

              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

                Date

              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">

                Amount

              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">

                Actions

              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100">

                        {transactions.map((transaction) => (

              <tr

                key={transaction.id}

                className="transition hover:bg-slate-50"

              >

                {/* ==========================================
                    TRANSACTION
                ========================================== */}

                <td className="px-6 py-5">

                  <div className="flex items-center gap-4">

                    <div

                      className={`

                        flex h-11 w-11 items-center justify-center rounded-2xl

                        ${

                          transaction.type === "income"

                            ? "bg-green-100"

                            : "bg-red-100"

                        }

                      `}

                    >

                      {

                        transaction.type === "income"

                          ? (

                            <ArrowDownCircle

                              size={22}

                              className="text-green-600"

                            />

                          )

                          : (

                            <ArrowUpCircle

                              size={22}

                              className="text-red-600"

                            />

                          )

                      }

                    </div>

                    <div>

                      <h4 className="font-semibold text-slate-800">

                        {transaction.title}

                      </h4>

                      <p className="mt-1 text-xs text-slate-500">

                        {transaction.notes || "-"}

                      </p>

                    </div>

                  </div>

                </td>

                {/* ==========================================
                    CATEGORY
                ========================================== */}

                <td className="px-6 py-5">

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">

                    {transaction.category_name || "-"}

                  </span>

                </td>

                {/* ==========================================
                    ACCOUNT
                ========================================== */}

                <td className="px-6 py-5">

                  {transaction.account || "-"}

                </td>

                {/* ==========================================
                    PAYMENT
                ========================================== */}

                <td className="px-6 py-5">

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">

                    {transaction.payment_method}

                  </span>

                </td>

                {/* ==========================================
                    DATE
                ========================================== */}

                <td className="px-6 py-5 text-slate-600">

                  {

                    new Date(

                      transaction.transaction_date

                    ).toLocaleDateString("en-IN")

                  }

                </td>

                {/* ==========================================
                    AMOUNT
                ========================================== */}

                <td

                  className={`

                    px-6 py-5 text-right font-bold

                    ${

                      transaction.type === "income"

                        ? "text-green-600"

                        : "text-red-600"

                    }

                  `}

                >

                  {

                    transaction.type === "income"

                      ? "+"

                      : "-"

                  }

                  ₹

                  {

                    Number(

                      transaction.amount

                    ).toLocaleString("en-IN")

                  }

                </td>

                {/* ==========================================
                    ACTIONS
                ========================================== */}

                <td className="px-6 py-5">

                  <div className="flex items-center justify-center gap-2">

                    <button

                      onClick={() =>

                        onView(transaction)

                      }

                      className="rounded-xl bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"

                    >

                      <Eye size={18} />

                    </button>

                    <button

                      onClick={() =>

                        onEdit(transaction)

                      }

                      className="rounded-xl bg-yellow-50 p-2 text-yellow-600 transition hover:bg-yellow-100"

                    >

                      <Pencil size={18} />

                    </button>

                    <button

                      onClick={() =>

                        onDelete(transaction)

                      }

                      className="rounded-xl bg-red-50 p-2 text-red-600 transition hover:bg-red-100"

                    >

                      <Trash2 size={18} />

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default TransactionTable;
          
          