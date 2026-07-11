import {
  Eye,
  Pencil,
  Trash2,
  FolderTree,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const CategoryTable = ({

  categories = [],

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

                    <div className="h-4 w-48 rounded bg-slate-200"></div>

                    <div className="mt-2 h-3 w-24 rounded bg-slate-100"></div>

                  </div>

                  <div className="h-6 w-20 rounded bg-slate-200"></div>

                  <div className="h-6 w-16 rounded bg-slate-100"></div>

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

  if (!categories.length) {

    return (

      <div className="rounded-3xl border border-slate-200 bg-white p-20 text-center shadow-sm">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">

          <FolderTree

            size={38}

            className="text-blue-600"

          />

        </div>

        <h3 className="mt-6 text-2xl font-bold text-slate-900">

          No Categories Found

        </h3>

        <p className="mt-3 text-slate-500">

          Create your first category to organize your transactions.

        </p>

        {

          onAdd && (

            <button

              onClick={onAdd}

              className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"

            >

              Add Category

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

      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

        <div>

          <h2 className="text-lg font-semibold text-slate-900">

            Categories

          </h2>

          <p className="mt-1 text-sm text-slate-500">

            Manage your income and expense categories

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

                Name

              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

                Type

              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

                Color

              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

                Created

              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">

                Actions

              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100">
            
                      {categories.map((category) => (

              <tr

                key={category.id}

                className="transition hover:bg-slate-50"

              >

                {/* ==========================================
                    NAME
                ========================================== */}

                <td className="px-6 py-5">

                  <div className="flex items-center gap-4">

                    <div

                      className="h-5 w-5 rounded-full border"

                      style={{

                        backgroundColor:

                          category.color || "#3B82F6"

                      }}

                    />

                    <div>

                      <h4 className="font-semibold text-slate-800">

                        {category.name}

                      </h4>

                    </div>

                  </div>

                </td>

                {/* ==========================================
                    TYPE
                ========================================== */}

                <td className="px-6 py-5">

                  <span

                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold

                    ${

                      category.type === "income"

                        ? "bg-green-100 text-green-700"

                        : "bg-red-100 text-red-700"

                    }`}

                  >

                    {category.type}

                  </span>

                </td>

                {/* ==========================================
                    COLOR
                ========================================== */}

                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    <div

                      className="h-6 w-6 rounded-lg border"

                      style={{

                        backgroundColor:

                          category.color || "#3B82F6"

                      }}

                    />

                    <span className="text-sm text-slate-500">

                      {category.color || "--"}

                    </span>

                  </div>

                </td>

                {/* ==========================================
                    CREATED
                ========================================== */}

                <td className="px-6 py-5 text-slate-600">

                  {

                    category.created_at

                      ? new Date(

                          category.created_at

                        ).toLocaleDateString("en-IN")

                      : "-"

                  }

                </td>

                {/* ==========================================
                    ACTIONS
                ========================================== */}

                <td className="px-6 py-5">

                  <div className="flex justify-center gap-2">

                    <button

                      onClick={() =>

                        onView(category)

                      }

                      className="rounded-xl bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"

                    >

                      <Eye size={18} />

                    </button>

                    <button

                      onClick={() =>

                        onEdit(category)

                      }

                      className="rounded-xl bg-amber-50 p-2 text-amber-600 transition hover:bg-amber-100"

                    >

                      <Pencil size={18} />

                    </button>

                    <button

                      onClick={() =>

                        onDelete(category)

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

export default CategoryTable;