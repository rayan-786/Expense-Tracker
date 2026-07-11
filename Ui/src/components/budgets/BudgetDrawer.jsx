import { useEffect, useState } from "react";

import { X } from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

import {

  createBudget,

  updateBudget

} from "../../services/budget.service";

import { getCategories } from "../../services/category.service";

const BudgetDrawer = ({

  open,

  onClose,

  budget = null,

  mode = "add",

  onSuccess

}) => {

  /* =========================================================
     STATES
  ========================================================= */

  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({

    category_id: "",

    month: "",

    amount: ""

  });

  const readOnly = mode === "view";

  /* =========================================================
     LOAD CATEGORIES
  ========================================================= */

  useEffect(() => {

    if (!open) return;

    loadCategories();

  }, [open]);

  const loadCategories = async () => {

    try {

      const response = await getCategories({

        type: "expense"

      });

      setCategories(

        response.data || []

      );

    }

    catch (err) {

      console.error(err);

    }

  };

  /* =========================================================
     EDIT
  ========================================================= */

  useEffect(() => {

    if (!budget) {

      setForm({

        category_id: "",

        month: "",

        amount: ""

      });

      return;

    }

    setForm({

  category_id: budget.category_id || "",

  month:

    budget.year && budget.month

      ? `${budget.year}-${String(

          budget.month

        ).padStart(2, "0")}`

      : "",

  amount: budget.amount || ""

});

  }, [budget]);

  /* =========================================================
     CHANGE
  ========================================================= */

  const handleChange = (e) => {

    const {

      name,

      value

    } = e.target;

    setForm((prev) => ({

      ...prev,

      [name]: value

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

    const [year, month] = form.month.split("-");

    const payload = {

      category_id: Number(form.category_id),

      month: Number(month),

      year: Number(year),

      amount: Number(form.amount)

    };

    if (budget?.id) {

      await updateBudget(

        budget.id,

        payload

      );

    }

    else {

      await createBudget(

        payload

      );

    }

    onSuccess?.();

    onClose?.();

  }

  catch (err) {

    console.error(err);

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

        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"

        onClick={onClose}

      >

        <motion.div

          initial={{ x: "100%" }}

          animate={{ x: 0 }}

          exit={{ x: "100%" }}

          transition={{ duration: .25 }}

          onClick={(e) =>

            e.stopPropagation()

          }

          className="absolute right-0 top-0 flex h-full w-full flex-col bg-white shadow-2xl sm:w-[520px] lg:w-[620px]"

        >

          {/* ==========================================
              HEADER
          ========================================== */}

          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

            <div>

              <h2 className="text-2xl font-bold">

                {

                  mode === "add"

                    ? "Add Budget"

                    : mode === "edit"

                    ? "Edit Budget"

                    : "Budget Details"

                }

              </h2>

              <p className="mt-1 text-sm text-slate-500">

                Monthly spending budget.

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

            className="flex flex-1 flex-col"

          >

            <div className="flex-1 space-y-6 overflow-y-auto p-6">

              {/* CATEGORY */}

              <div>

                <label className="mb-2 block text-sm font-semibold">

                  Category

                </label>

                <select

                  name="category_id"

                  value={form.category_id}

                  onChange={handleChange}

                  disabled={readOnly}

                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"

                >

                  <option value="">

                    Select Category

                  </option>

                  {

                    categories.map((category) => (

                      <option

                        key={category.id}

                        value={category.id}

                      >

                        {category.name}

                      </option>

                    ))

                  }

                </select>

              </div>

              {/* MONTH */}

              <div>

                <label className="mb-2 block text-sm font-semibold">

                  Month

                </label>

                <input

                  type="month"

                  name="month"

                  value={

  form.month

    ? new Date(

        form.month + "-01"

      ).toLocaleDateString(

        "en-IN",

        {

          month: "long",

          year: "numeric"

        }

      )

    : "Month"

}

                  onChange={handleChange}

                  disabled={readOnly}

                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"

                />

              </div>

              {/* BUDGET */}

              <div>

                <label className="mb-2 block text-sm font-semibold">

                  Budget Amount

                </label>

                <input

                  type="number"

                  name="amount"

                  value={form.amount}

                  onChange={handleChange}

                  disabled={readOnly}

                  placeholder="10000"

                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"

                />

              </div>
                            {/* ======================================
                  PREVIEW
              ====================================== */}

              <div>

                <label className="mb-3 block text-sm font-semibold">

                  Budget Preview

                </label>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="text-lg font-bold text-slate-800">

                        {

                          categories.find(

                            (item) =>

                              Number(item.id) ===

                              Number(form.category_id)

                          )?.name ||

                          "Category"

                        }

                      </h3>

                      <p className="mt-1 text-sm text-slate-500">

                        {

                          form.month ||

                          "Month"

                        }

                      </p>

                    </div>

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">

                      Budget

                    </span>

                  </div>

                  <div className="mt-6">

                    <p className="text-sm text-slate-500">

                      Monthly Budget

                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-blue-600">

                      ₹

                      {

                        Number(

                          form.amount || 0

                        ).toLocaleString("en-IN")

                      }

                    </h2>

                  </div>

                </div>

              </div>

            </div>

            {/* ======================================
                FOOTER
            ====================================== */}

            <div className="flex items-center justify-end gap-3 border-t border-slate-200 p-6">

              <button

                type="button"

                onClick={onClose}

                className="rounded-xl border border-slate-300 px-5 py-3 font-medium transition hover:bg-slate-100"

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

                        : budget

                        ? "Update Budget"

                        : "Save Budget"

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

export default BudgetDrawer;