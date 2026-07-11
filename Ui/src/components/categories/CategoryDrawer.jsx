import { useEffect, useState } from "react";

import { X } from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

import {

  createCategory,

  updateCategory

} from "../../services/category.service";

const COLORS = [

  "#3B82F6",

  "#10B981",

  "#EF4444",

  "#F59E0B",

  "#8B5CF6",

  "#EC4899",

  "#14B8A6",

  "#64748B"

];

const CategoryDrawer = ({

  open,

  onClose,

  category = null,

  mode = "add",

  onSuccess

}) => {

  /* =========================================================
     STATES
  ========================================================= */

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    name: "",

    type: "expense",

    color: COLORS[0]

  });

  const readOnly = mode === "view";

  /* =========================================================
     EDIT MODE
  ========================================================= */

  useEffect(() => {

    if (!category) {

      setForm({

        name: "",

        type: "expense",

        color: COLORS[0]

      });

      return;

    }

    setForm({

      name: category.name || "",

      type: category.type || "expense",

      color:

        category.color ||

        COLORS[0]

    });

  }, [category]);

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
     COLOR
  ========================================================= */

  const handleColor = (color) => {

    setForm((prev) => ({

      ...prev,

      color

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

      if (category?.id) {

        await updateCategory(

          category.id,

          form

        );

      }

      else {

        await createCategory(

          form

        );

      }

      onSuccess?.();

      onClose?.();

    }

    catch (err) {

      console.error(

        "Category Error:",

        err

      );

    }

    finally {

      setLoading(false);

    }

  };

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

            duration: 0.25

          }}

          onClick={(e) =>

            e.stopPropagation()

          }

          className="absolute right-0 top-0 flex h-full w-full flex-col bg-white shadow-2xl sm:w-[500px] lg:w-[560px]"

        >

          {/* ==========================================
              HEADER
          ========================================== */}

          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

            <div>

              <h2 className="text-2xl font-bold">

                {

                  mode === "add"

                    ? "Add Category"

                    : mode === "edit"

                    ? "Edit Category"

                    : "Category Details"

                }

              </h2>

              <p className="mt-1 text-sm text-slate-500">

                {

                  mode === "view"

                    ? "View category details."

                    : "Create income or expense category."

                }

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
              BODY
          ========================================== */}

          <form

            onSubmit={handleSubmit}

            className="flex flex-1 flex-col"

          >

            <div className="flex-1 space-y-6 overflow-y-auto p-6">

              {/* ======================================
                  NAME
              ====================================== */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">

                  Category Name

                </label>

                <input

                  type="text"

                  name="name"

                  value={form.name}

                  onChange={handleChange}

                  disabled={readOnly}

                  placeholder="Food"

                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 disabled:bg-slate-100"

                />

              </div>

              {/* ======================================
                  TYPE
              ====================================== */}

              <div>

                <label className="mb-3 block text-sm font-semibold text-slate-700">

                  Category Type

                </label>

                <div className="grid grid-cols-2 gap-4">

                  <label

                    className={`cursor-pointer rounded-xl border p-4 text-center transition

                    ${

                      form.type === "income"

                        ? "border-green-500 bg-green-50"

                        : "border-slate-300"

                    }`}

                  >

                    <input

                      type="radio"

                      name="type"

                      value="income"

                      checked={

                        form.type === "income"

                      }

                      onChange={handleChange}

                      disabled={readOnly}

                      className="hidden"

                    />

                    <span className="font-semibold text-green-600">

                      Income

                    </span>

                  </label>

                  <label

                    className={`cursor-pointer rounded-xl border p-4 text-center transition

                    ${

                      form.type === "expense"

                        ? "border-red-500 bg-red-50"

                        : "border-slate-300"

                    }`}

                  >

                    <input

                      type="radio"

                      name="type"

                      value="expense"

                      checked={

                        form.type === "expense"

                      }

                      onChange={handleChange}

                      disabled={readOnly}

                      className="hidden"

                    />

                    <span className="font-semibold text-red-600">

                      Expense

                    </span>

                  </label>

                </div>

              </div>
                            {/* ======================================
                  COLOR
              ====================================== */}

              <div>

                <label className="mb-3 block text-sm font-semibold text-slate-700">

                  Category Color

                </label>

                <div className="flex flex-wrap gap-3">

                  {COLORS.map((color) => (

                    <button

                      key={color}

                      type="button"

                      disabled={readOnly}

                      onClick={() => handleColor(color)}

                      className={`

                        h-11 w-11 rounded-xl border-2 transition

                        ${

                          form.color === color

                            ? "scale-110 border-slate-900"

                            : "border-slate-200"

                        }

                      `}

                      style={{

                        backgroundColor: color

                      }}

                    />

                  ))}

                </div>

              </div>

              {/* ======================================
                  PREVIEW
              ====================================== */}

              <div>

                <label className="mb-3 block text-sm font-semibold text-slate-700">

                  Preview

                </label>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                  <div className="flex items-center gap-4">

                    <div

                      className="h-5 w-5 rounded-full border"

                      style={{

                        backgroundColor: form.color

                      }}

                    />

                    <div>

                      <h3 className="font-semibold text-slate-800">

                        {form.name || "Category Name"}

                      </h3>

                      <span

                        className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold

                        ${

                          form.type === "income"

                            ? "bg-green-100 text-green-700"

                            : "bg-red-100 text-red-700"

                        }`}

                      >

                        {form.type}

                      </span>

                    </div>

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

                        : category

                        ? "Update Category"

                        : "Save Category"

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

export default CategoryDrawer;