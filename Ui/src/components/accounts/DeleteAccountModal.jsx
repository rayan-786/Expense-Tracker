import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import {
  AlertTriangle,
  Trash2,
  X
} from "lucide-react";

import { deleteAccount } from "../../services/account.service";

const DeleteAccountModal = ({

  open,

  onClose,

  account,

  onSuccess

}) => {

  const [loading, setLoading] = useState(false);

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = async () => {

    if (!account) return;

    try {

      setLoading(true);

      await deleteAccount(account.id);

      onSuccess?.();

      onClose?.();

    }

    catch (err) {

      console.error(err);

      alert(

        err.response?.data?.message ||

        "Unable to delete account."

      );

    }

    finally {

      setLoading(false);

    }

  };

  if (!open || !account) return null;

  return (

    <AnimatePresence>

      <motion.div

        initial={{ opacity: 0 }}

        animate={{ opacity: 1 }}

        exit={{ opacity: 0 }}

        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"

      >

        <motion.div

          initial={{

            scale: .95,

            opacity: 0

          }}

          animate={{

            scale: 1,

            opacity: 1

          }}

          exit={{

            scale: .95,

            opacity: 0

          }}

          className="w-full max-w-md rounded-3xl bg-white shadow-2xl"

        >

          {/* ==========================================
              HEADER
          ========================================== */}

          <div className="flex items-center justify-between border-b border-slate-200 p-6">

            <div className="flex items-center gap-3">

              <div className="rounded-2xl bg-red-100 p-3">

                <AlertTriangle

                  size={24}

                  className="text-red-600"

                />

              </div>

              <div>

                <h2 className="text-xl font-bold">

                  Delete Account

                </h2>

                <p className="text-sm text-slate-500">

                  This action cannot be undone.

                </p>

              </div>

            </div>

            <button

              onClick={onClose}

              disabled={loading}

              className="rounded-lg p-2 hover:bg-slate-100"

            >

              <X size={20} />

            </button>

          </div>

          {/* ==========================================
              BODY
          ========================================== */}

          <div className="p-6">

            <p className="text-slate-600">

              Are you sure you want to delete this account?

            </p>

            <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-4">

              <h4 className="font-semibold text-slate-900">

                {account.name}

              </h4>

              <p className="mt-1 text-sm text-slate-500">

                {account.type}

              </p>

              <p className="mt-3 text-lg font-bold text-green-600">

                ₹

                {Number(

                  account.current_balance || 0

                ).toLocaleString("en-IN")}

              </p>

            </div>

          </div>

          {/* ==========================================
              FOOTER
          ========================================== */}

          <div className="flex justify-end gap-3 border-t border-slate-200 p-6">

            <button

              onClick={onClose}

              disabled={loading}

              className="rounded-xl border border-slate-300 px-5 py-3 font-medium transition hover:bg-slate-100"

            >

              Cancel

            </button>

            <button

              onClick={handleDelete}

              disabled={loading}

              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700 disabled:opacity-60"

            >

              <Trash2 size={18} />

              {

                loading

                  ? "Deleting..."

                  : "Delete"

              }

            </button>

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>

  );

};

export default DeleteAccountModal;