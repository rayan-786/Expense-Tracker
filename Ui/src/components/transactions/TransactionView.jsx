import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const TransactionView = ({

  open,

  onClose,

  transaction

}) => {

  if (!open || !transaction) return null;

  const isIncome =

    transaction.type === "income";

  return (

    <AnimatePresence>

      {/* ==========================================
          BACKDROP
      ========================================== */}

      <motion.div

        initial={{ opacity: 0 }}

        animate={{ opacity: 1 }}

        exit={{ opacity: 0 }}

        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"

        onClick={onClose}

      >

        {/* ==========================================
            DRAWER
        ========================================== */}

        <motion.div

          initial={{ x: "100%" }}

          animate={{ x: 0 }}

          exit={{ x: "100%" }}

          transition={{

            duration: .25

          }}

          onClick={(e) =>

            e.stopPropagation()

          }

          className="absolute right-0 top-0 flex h-full w-full flex-col bg-white shadow-2xl sm:w-[520px] lg:w-[600px]"

        >

          {/* ======================================
              HEADER
          ====================================== */}

          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

            <div>

              <h2 className="text-2xl font-bold">

                Transaction Details

              </h2>

              <p className="text-sm text-slate-500 mt-1">

                View transaction information

              </p>

            </div>

            <button

              onClick={onClose}

              className="rounded-xl p-2 hover:bg-slate-100"

            >

              <X size={22} />

            </button>

          </div>

          {/* ======================================
              BODY
          ====================================== */}

          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            {/* Type */}

            <div className="rounded-2xl border p-5">

              <p className="text-sm text-slate-500">

                Transaction Type

              </p>

              <span

                className={`mt-3 inline-flex rounded-full px-4 py-2 text-sm font-semibold

                ${

                  isIncome

                  ? "bg-green-100 text-green-700"

                  : "bg-red-100 text-red-700"

                }`}

              >

                {transaction.type}

              </span>

            </div>

            {/* Details */}

            <div className="grid gap-5">

              <Info

                label="Title"

                value={transaction.title}

              />

              <Info

                label="Amount"

                value={`₹ ${Number(

                  transaction.amount

                ).toLocaleString("en-IN")}`}

              />

              <Info

                label="Category"

                value={transaction.category_name}

              />

              <Info

                label="Account"

                value={transaction.account_name}

              />

              <Info

                label="Payment"

                value={transaction.payment_method}

              />

              <Info

                label="Reference"

                value={

                  transaction.reference_no ||

                  "-"

                }

              />

              <Info

                label="Transaction Date"

                value={new Date(

                  transaction.transaction_date

                ).toLocaleDateString("en-IN")}

              />

              <Info

                label="Notes"

                value={

                  transaction.notes ||

                  "-"

                }

              />

            </div>

            {/* Receipt */}

            {

              transaction.receipt_url && (

                <div>

                  <h3 className="mb-3 text-sm font-semibold">

                    Receipt

                  </h3>

                  <img

                    src={transaction.receipt_url}

                    alt="Receipt"

                    className="rounded-2xl border"

                  />

                </div>

              )

            }

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>

  );

};

/* =========================================================
   INFO ITEM
========================================================= */

const Info = ({

  label,

  value

}) => (

  <div className="rounded-xl border border-slate-200 p-4">

    <p className="text-xs uppercase tracking-wide text-slate-500">

      {label}

    </p>

    <p className="mt-2 text-base font-semibold text-slate-800">

      {value}

    </p>

  </div>

);

export default TransactionView;