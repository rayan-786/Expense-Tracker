import { useEffect, useState } from "react";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import TransactionForm from "./TransactionForm";

import { getCategories } from "../../services/category.service";
import { getAccounts } from "../../services/account.service";

const TransactionDrawer = ({

  open,

  onClose,

  transaction = null,

  onSuccess

}) => {

  /* =========================================================
     STATES
  ========================================================= */

  const [categories, setCategories] = useState([]);

  const [accounts, setAccounts] = useState([]);

  const [loading, setLoading] = useState(false);

  /* =========================================================
     LOAD DROPDOWNS
  ========================================================= */

useEffect(() => {

  if (!open) return;

  const loadData = async () => {

    try {

      const [

        categoryResponse,

        accountResponse

      ] = await Promise.all([

        getCategories(),

        getAccounts()

      ]);

      console.log("Categories:", categoryResponse);
      console.log("Accounts:", accountResponse);

      setCategories(categoryResponse.data || []);
      setAccounts(accountResponse.data || []);

    } catch (err) {

      console.error(err);

    }

  };

  loadData();

}, [open]);

  /* =========================================================
     CLOSE
  ========================================================= */

  if (!open) return null;

  /* =========================================================
     UI
  ========================================================= */

  return (

    <AnimatePresence>

      <motion.div

        initial={{ opacity: 0 }}

        animate={{ opacity: 1 }}

        exit={{ opacity: 0 }}

        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"

        onClick={onClose}

      >

        <motion.div

          initial={{ x: "100%" }}

          animate={{ x: 0 }}

          exit={{ x: "100%" }}

          transition={{

            duration: 0.25,

            ease: "easeOut"

          }}

          onClick={(e) => e.stopPropagation()}

          className="absolute right-0 top-0 flex h-full w-full flex-col bg-white shadow-2xl sm:w-[540px] lg:w-[650px]"

        >

          {/* ==========================================
              HEADER
          ========================================== */}

          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

            <div>

              <h2 className="text-2xl font-bold text-slate-900">

                {

                  transaction

                    ? "Edit Transaction"

                    : "Add Transaction"

                }

              </h2>

              <p className="mt-1 text-sm text-slate-500">

                {

                  transaction

                    ? "Update transaction details."

                    : "Create a new income or expense transaction."

                }

              </p>

            </div>

            <button

              onClick={onClose}

              className="rounded-xl p-2 transition hover:bg-slate-100"

            >

              <X size={22} />

            </button>

          </div>

          {/* ==========================================
              BODY
          ========================================== */}

          <div className="flex-1 overflow-y-auto p-6">

            {

              loading ? (

                <div className="flex h-full min-h-[400px] items-center justify-center">

                  <div className="flex flex-col items-center gap-4">

                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

                    <p className="text-sm text-slate-500">

                      Loading data...

                    </p>

                  </div>

                </div>

              ) : (

                <TransactionForm

                  transaction={transaction}

                  categories={categories}

                  accounts={accounts}

                  onSuccess={onSuccess}

                  onClose={onClose}

                />

              )

            }

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>

  );

};

export default TransactionDrawer;