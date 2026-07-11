import {

  Eye,

  Pencil,

  Trash2,

  ArrowDownCircle,

  ArrowUpCircle

} from "lucide-react";

const TransactionRow = ({

  transaction,

  onView,

  onEdit,

  onDelete

}) => {

  const isIncome = transaction.type === "income";

  return (

    <tr className="transition hover:bg-slate-50">

      {/* Transaction */}

      <td className="px-6 py-5">

        <div className="flex items-center gap-4">

          <div

            className={`flex h-11 w-11 items-center justify-center rounded-2xl

            ${

              isIncome

                ? "bg-green-100"

                : "bg-red-100"

            }`}

          >

            {

              isIncome

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

      {/* Category */}

      <td className="px-6 py-5">

        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">

          {transaction.category_name || "-"}

        </span>

      </td>

      {/* Account */}

      <td className="px-6 py-5">

        {transaction.account_name || "-"}

      </td>

      {/* Payment */}

      <td className="px-6 py-5">

        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">

          {transaction.payment_method}

        </span>

      </td>

      {/* Date */}

      <td className="px-6 py-5 text-slate-600">

        {

          new Date(

            transaction.transaction_date

          ).toLocaleDateString("en-IN")

        }

      </td>

      {/* Amount */}

      <td

        className={`px-6 py-5 text-right font-bold

        ${

          isIncome

            ? "text-green-600"

            : "text-red-600"

        }`}

      >

        {

          isIncome

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

      {/* Actions */}

      <td className="px-6 py-5">

        <div className="flex justify-center gap-2">

          <button

            onClick={() =>

              onView(transaction)

            }

            className="rounded-xl bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"

          >

            <Eye size={18} />

          </button>

          <button

            onClick={() =>

              onEdit(transaction)

            }

            className="rounded-xl bg-yellow-50 p-2 text-yellow-600 hover:bg-yellow-100"

          >

            <Pencil size={18} />

          </button>

          <button

            onClick={() =>

              onDelete(transaction)

            }

            className="rounded-xl bg-red-50 p-2 text-red-600 hover:bg-red-100"

          >

            <Trash2 size={18} />

          </button>

        </div>

      </td>

    </tr>

  );

};

export default TransactionRow;