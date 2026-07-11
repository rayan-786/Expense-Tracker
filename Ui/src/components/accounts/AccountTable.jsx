import {
  Eye,
  Pencil,
  Trash2,
  Landmark,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const AccountTable = ({

  accounts = [],

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

            <div className="h-6 w-56 rounded bg-slate-200"></div>

            <div className="mt-3 h-4 w-72 rounded bg-slate-100"></div>

          </div>

          <div className="space-y-4 p-6">

            {Array.from({ length: 8 }).map((_, index) => (

              <div

                key={index}

                className="flex items-center gap-4 rounded-xl border border-slate-100 p-4"

              >

                <div className="h-12 w-12 rounded-xl bg-slate-200"></div>

                <div className="flex-1">

                  <div className="h-4 w-52 rounded bg-slate-200"></div>

                  <div className="mt-2 h-3 w-28 rounded bg-slate-100"></div>

                </div>

                <div className="h-6 w-20 rounded bg-slate-200"></div>

                <div className="h-6 w-20 rounded bg-slate-100"></div>

                <div className="h-10 w-28 rounded-xl bg-slate-200"></div>

              </div>

            ))}

          </div>

        </div>

      </div>

    );

  }

  /* =========================================================
     EMPTY
  ========================================================= */

  if (!accounts.length) {

    return (

      <div className="rounded-3xl border border-slate-200 bg-white p-20 text-center shadow-sm">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">

          <Landmark

            size={40}

            className="text-blue-600"

          />

        </div>

        <h3 className="mt-6 text-2xl font-bold text-slate-900">

          No Accounts Found

        </h3>

        <p className="mt-3 text-slate-500">

          Create your first account to manage your finances.

        </p>

        {

          onAdd && (

            <button

              onClick={onAdd}

              className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"

            >

              Add Account

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

          Accounts

        </h2>

        <p className="mt-1 text-sm text-slate-500">

          Manage your cash, bank, wallet and credit card accounts.

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

                Account

              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

                Type

              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

                Balance

              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

                Status

              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

                Default

              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">

                Actions

              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100">
                        {accounts.map((account) => (

              <tr

                key={account.id}

                className="transition hover:bg-slate-50"

              >

                {/* ==========================================
                    ACCOUNT
                ========================================== */}

                <td className="px-6 py-5">

                  <div>

                    <h4 className="font-semibold text-slate-800">

                      {account.name}

                    </h4>

                    <p className="mt-1 text-sm text-slate-500">

                      {

                        account.account_number ||

                        "No Account Number"

                      }

                    </p>

                  </div>

                </td>

                {/* ==========================================
                    TYPE
                ========================================== */}

                <td className="px-6 py-5">

                  <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">

                    {account.type}

                  </span>

                </td>

                {/* ==========================================
                    BALANCE
                ========================================== */}

                <td className="px-6 py-5">

                  <span className="font-semibold text-green-600">

                    ₹

                    {Number(

                      account.current_balance || 0

                    ).toLocaleString("en-IN")}

                  </span>

                </td>

                {/* ==========================================
                    STATUS
                ========================================== */}

                <td className="px-6 py-5">

                  {

                    account.is_active ? (

                      <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                        <CheckCircle2 size={14} />

                        Active

                      </span>

                    ) : (

                      <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">

                        <XCircle size={14} />

                        Inactive

                      </span>

                    )

                  }

                </td>

                {/* ==========================================
                    DEFAULT
                ========================================== */}

                <td className="px-6 py-5">

                  {

                    account.is_default ? (

                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">

                        Default

                      </span>

                    ) : (

                      <span className="text-slate-400">

                        —

                      </span>

                    )

                  }

                </td>

                {/* ==========================================
                    ACTIONS
                ========================================== */}

                <td className="px-6 py-5">

                  <div className="flex justify-center gap-2">

                    <button

                      onClick={() =>

                        onView(account)

                      }

                      className="rounded-xl bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"

                    >

                      <Eye size={18} />

                    </button>

                    <button

                      onClick={() =>

                        onEdit(account)

                      }

                      className="rounded-xl bg-amber-50 p-2 text-amber-600 transition hover:bg-amber-100"

                    >

                      <Pencil size={18} />

                    </button>

                    <button

                      onClick={() =>

                        onDelete(account)

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

      {/* ==========================================
          PAGINATION
      ========================================== */}

      {

        pagination && (

          <div className="flex flex-col gap-4 border-t border-slate-200 px-6 py-4 md:flex-row md:items-center md:justify-between">

            <p className="text-sm text-slate-500">

              Showing

              <span className="mx-1 font-semibold text-slate-800">

                {

                  Math.min(

                    (pagination.page - 1) *

                      pagination.limit +

                      1,

                    pagination.total

                  )

                }

              </span>

              -

              <span className="mx-1 font-semibold text-slate-800">

                {

                  Math.min(

                    pagination.page *

                      pagination.limit,

                    pagination.total

                  )

                }

              </span>

              of

              <span className="mx-1 font-semibold text-slate-800">

                {

                  pagination.total

                }

              </span>

            </p>

            <div className="flex items-center gap-3">

              <select

                value={pagination.limit}

                onChange={(e) =>

                  onLimitChange(

                    Number(

                      e.target.value

                    )

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

                disabled={

                  pagination.page === 1

                }

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

                {

                  pagination.page

                }

                /

                {

                  pagination.totalPages

                }

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

        )

      }

    </div>

  );

};

export default AccountTable;