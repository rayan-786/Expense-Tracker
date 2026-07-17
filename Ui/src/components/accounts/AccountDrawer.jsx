import { useEffect, useState } from "react";

import { X } from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

import {

  createAccount,

  updateAccount

} from "../../services/account.service";

const ACCOUNT_TYPES = [

  "Cash",

  "Bank",

  "Wallet",

  "Credit Card"

];

const AccountDrawer = ({

  open,

  onClose,

  account = null,

  mode = "add",

  onSuccess

}) => {

  /* =========================================================
     STATES
  ========================================================= */

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    name: "",

    type: "Cash",

    account_number: "",

    opening_balance: "",

    current_balance: "",

    is_default: false,

    is_active: true

  });

  const readOnly = mode === "view";

  /* =========================================================
     EDIT MODE
  ========================================================= */

  useEffect(() => {

    if (!account) {

      setForm({

        name: "",

        type: "Cash",

        account_number: "",

        opening_balance: "",

        current_balance: "",

        is_default: false,

        is_active: true

      });

      return;

    }

    setForm({

      name: account.name || "",

      type: account.type || "Cash",

      account_number:

        account.account_number || "",

      opening_balance:

        account.opening_balance || "",

      current_balance:

        account.current_balance || "",

      is_default:

        Boolean(account.is_default),

      is_active:

        Boolean(account.is_active)

    });

  }, [account]);

  /* =========================================================
     CHANGE
  ========================================================= */

  const handleChange = (e) => {

    const {

      name,

      value,

      type,

      checked

    } = e.target;

    setForm((prev) => ({

      ...prev,

      [name]:

        type === "checkbox"

          ? checked

          : value

    }));

  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (readOnly) return;

    try {

      setLoading(true);

      if (account?.id) {

        await updateAccount(

          account.id,

          form

        );

      }

      else {

        await createAccount(form);

      }

      onSuccess?.();

      onClose?.();

    }

    catch (err) {

      console.error(

        "Account Error:",

        err

      );

    }

    finally {

      setLoading(false);

    }

  };

  if (!open) return null;

  return (

    <AnimatePresence>

      <motion.div

        initial={{ opacity: 0 }}

        animate={{ opacity: 1 }}

        exit={{ opacity: 0 }}

        onClick={onClose}

        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"

      >

        <motion.div

          initial={{ x: "100%" }}

          animate={{ x: 0 }}

          exit={{ x: "100%" }}

          transition={{ duration: .25 }}

          onClick={(e) =>

            e.stopPropagation()

          }

          className="
absolute
right-0
top-0
flex
h-screen
w-full
max-w-[760px]
flex-col
bg-white
shadow-2xl
"

        >

          {/* ==========================================
              HEADER
          ========================================== */}

          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white px-8 py-5">
            <div>

              <h2 className="text-2xl font-bold">

                {

                  mode === "add"

                    ? "Add Account"

                    : mode === "edit"

                    ? "Edit Account"

                    : "Account Details"

                }

              </h2>

              <p className="mt-1 text-sm text-slate-500">

                Manage your financial accounts.

              </p>

            </div>

            <button

              onClick={onClose}

              className="rounded-xl p-2 hover:bg-slate-100"

            >

              <X size={22} />

            </button>

          </div>

          {/* ==========================================
              FORM
          ========================================== */}

          <form
  onSubmit={handleSubmit}
  className="flex h-full min-h-0 flex-1 flex-col overflow-hidden"
>

           <div
  className="flex-1 min-h-0 overflow-y-auto px-8 py-6 space-y-6"
  style={{ WebkitOverflowScrolling: "touch" }}
>
              {/* ACCOUNT NAME */}

              <div>

                <label className="mb-2 block text-sm font-semibold">

                  Account Name

                </label>

                <input

                  type="text"

                  name="name"

                  value={form.name}

                  onChange={handleChange}

                  disabled={readOnly}

                  placeholder="HDFC Savings"

                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 disabled:bg-slate-100"

                />

              </div>

              {/* ACCOUNT TYPE */}

              <div>

                <label className="mb-2 block text-sm font-semibold">

                  Account Type

                </label>

                <select

                  name="type"

                  value={form.type}

                  onChange={handleChange}

                  disabled={readOnly}

                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 disabled:bg-slate-100"

                >

                  {

                    ACCOUNT_TYPES.map((type) => (

                      <option

                        key={type}

                        value={type}

                      >

                        {type}

                      </option>

                    ))

                  }

                </select>

              </div>

              {/* ACCOUNT NUMBER */}

              <div>

                <label className="mb-2 block text-sm font-semibold">

                  Account Number

                </label>

                <input

                  type="text"

                  name="account_number"

                  value={form.account_number}

                  onChange={handleChange}

                  disabled={readOnly}

                  placeholder="Optional"

                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 disabled:bg-slate-100"

                />

              </div>
                            {/* ======================================
                  OPENING BALANCE
              ====================================== */}

              <div>

                <label className="mb-2 block text-sm font-semibold">

                  Opening Balance

                </label>

                <input

                  type="number"

                  name="opening_balance"

                  value={form.opening_balance}

                  onChange={handleChange}

                  disabled={readOnly}

                  placeholder="0.00"

                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 disabled:bg-slate-100"

                />

              </div>

              {/* ======================================
                  CURRENT BALANCE
              ====================================== */}

              <div>

                <label className="mb-2 block text-sm font-semibold">

                  Current Balance

                </label>

                <input

                  type="number"

                  name="current_balance"

                  value={form.current_balance}

                  onChange={handleChange}

                  disabled={readOnly}

                  placeholder="0.00"

                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 disabled:bg-slate-100"

                />

              </div>

              {/* ======================================
                  DEFAULT ACCOUNT
              ====================================== */}

              <label className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">

                <div>

                  <h4 className="font-semibold">

                    Default Account

                  </h4>

                  <p className="text-sm text-slate-500">

                    Use as default account

                  </p>

                </div>

                <input

                  type="checkbox"

                  name="is_default"

                  checked={form.is_default}

                  onChange={handleChange}

                  disabled={readOnly}

                  className="h-5 w-5"

                />

              </label>

              {/* ======================================
                  ACTIVE
              ====================================== */}

              <label className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">

                <div>

                  <h4 className="font-semibold">

                    Active

                  </h4>

                  <p className="text-sm text-slate-500">

                    Enable this account

                  </p>

                </div>

                <input

                  type="checkbox"

                  name="is_active"

                  checked={form.is_active}

                  onChange={handleChange}

                  disabled={readOnly}

                  className="h-5 w-5"

                />

              </label>

              {/* ======================================
                  PREVIEW
              ====================================== */}

              <div>

                <label className="mb-3 block text-sm font-semibold">

                  Preview

                </label>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="text-lg font-bold text-slate-800">

                        {

                          form.name ||

                          "Account Name"

                        }

                      </h3>

                      <p className="mt-1 text-sm text-slate-500">

                        {

                          form.account_number ||

                          "No Account Number"

                        }

                      </p>

                    </div>

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">

                      {form.type}

                    </span>

                  </div>

                  <div className="mt-6 flex items-center justify-between">

                    <div>

                      <p className="text-sm text-slate-500">

                        Current Balance

                      </p>

                      <h2 className="mt-1 text-2xl font-bold text-green-600">

                        ₹

                        {

                          Number(

                            form.current_balance || 0

                          ).toLocaleString("en-IN")

                        }

                      </h2>

                    </div>

                    {

                      form.is_default && (

                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">

                          Default

                        </span>

                      )

                    }

                  </div>

                </div>

              </div>

            </div>

            {/* ======================================
                FOOTER
            ====================================== */}

            <div className="sticky bottom-0 z-20 flex items-center justify-end gap-3 border-t border-slate-200 bg-white px-8 py-5 shadow-[0_-8px_20px_rgba(0,0,0,0.05)]">

              <button

                type="button"

                onClick={onClose}

                className="rounded-xl border border-slate-300 px-5 py-3 font-medium hover:bg-slate-100"

              >

                Cancel

              </button>

              {

                !readOnly && (

                  <button

                    type="submit"

                    disabled={loading}

                    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"

                  >

                    {

                      loading

                        ? "Saving..."

                        : account

                        ? "Update Account"

                        : "Save Account"

                    }

                  </button>

                )

              }

            </div>

          </form>

        </motion.div>

      </motion.div>

    </AnimatePresence>

  );

};

export default AccountDrawer;