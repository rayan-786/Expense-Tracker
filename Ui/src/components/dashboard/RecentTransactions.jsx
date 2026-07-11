import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import SectionCard from "../ui/SectionCard";

const RecentTransactions = ({ transactions = [] }) => {

  const navigate = useNavigate();

  /* =========================================================
     FORMAT DATE
  ========================================================= */

  const formatDate = (date) => {

    return new Date(date).toLocaleDateString("en-IN", {

      day: "2-digit",

      month: "short",

      year: "numeric"

    });

  };

  return (

    <SectionCard

      title="Recent Transactions"

      subtitle="Latest financial activity"

      action={

        <button

          onClick={() => navigate("/transactions")}

          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"

        >

          View All

        </button>

      }

    >

      {transactions.length === 0 ? (

        <div className="flex h-52 items-center justify-center text-gray-500">

          No transactions found.

        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-200 text-left">

                <th className="pb-3 text-sm font-semibold text-slate-600">

                  Title

                </th>

                <th className="pb-3 text-sm font-semibold text-slate-600">

                  Category

                </th>

                <th className="pb-3 text-sm font-semibold text-slate-600">

                  Date

                </th>

                <th className="pb-3 text-right text-sm font-semibold text-slate-600">

                  Amount

                </th>

              </tr>

            </thead>

            <tbody>

              {transactions.map((item) => (

                <tr

                  key={item.id}

                  className="border-b border-slate-100 hover:bg-slate-50"

                >

                  {/* ================= TITLE ================= */}

                  <td className="py-4">

                    <div className="flex items-center gap-3">

                      <div

                        className={`

                          flex h-10 w-10 items-center justify-center rounded-xl

                          ${

                            item.type === "income"

                              ? "bg-green-100"

                              : "bg-red-100"

                          }

                        `}

                      >

                        {item.type === "income"

                          ? (

                            <ArrowDownLeft

                              size={18}

                              className="text-green-600"

                            />

                          )

                          : (

                            <ArrowUpRight

                              size={18}

                              className="text-red-600"

                            />

                          )}

                      </div>

                      <span className="font-medium text-slate-800">

                        {item.title}

                      </span>

                    </div>

                  </td>

                  {/* ================= CATEGORY ================= */}

                  <td className="py-4 text-slate-600">

                    {item.category}

                  </td>

                  {/* ================= DATE ================= */}

                  <td className="py-4 text-slate-600">

                    {formatDate(item.transaction_date)}

                  </td>

                  {/* ================= AMOUNT ================= */}

                  <td

                    className={`

                      py-4 text-right font-bold

                      ${

                        item.type === "income"

                          ? "text-green-600"

                          : "text-red-600"

                      }

                    `}

                  >

                    {item.type === "income" ? "+" : "-"}

                    ₹

                    {Number(item.amount).toLocaleString("en-IN")}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </SectionCard>

  );

};

export default RecentTransactions;