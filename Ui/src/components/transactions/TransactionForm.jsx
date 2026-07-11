import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Calendar,
  DollarSign,
  FileText,
  Save,
  X,
  Upload
} from "lucide-react";

import {
  createTransaction,
  updateTransaction
} from "../../services/transaction.service";

const TransactionForm = ({

  transaction = null,

  categories = [],

  accounts = [],

  onSuccess,

  onClose

}) => {

  /* =========================================================
     FORM
  ========================================================= */

  const {

    register,

    handleSubmit,

    reset,

    watch,

    formState: {

      errors,

      isSubmitting

    }

  } = useForm({

    defaultValues: {

      title: "",

      amount: "",

      type: "expense",

      category_id: "",

      account_id: "",

      payment_method: "Cash",

      transaction_date: new Date()

        .toISOString()

        .split("T")[0],

      reference_no: "",

      notes: ""

    }

  });

  /* =========================================================
     LOCAL STATE
  ========================================================= */

  const [receipt, setReceipt] = useState(null);

  const [preview, setPreview] = useState("");

  const transactionType = watch("type");

  /* =========================================================
     EDIT MODE
  ========================================================= */

  useEffect(() => {

    if (!transaction) {

      reset({

        title: "",

        amount: "",

        type: "expense",

        category_id: "",

        account_id: "",

        payment_method: "Cash",

        transaction_date: new Date()

          .toISOString()

          .split("T")[0],

        reference_no: "",

        notes: ""

      });

      setReceipt(null);

      setPreview("");

      return;

    }

    reset({

      title: transaction.title || "",

      amount: transaction.amount || "",

      type: transaction.type || "expense",

      category_id: transaction.category_id || "",

      account_id: transaction.account_id || "",

      payment_method:

        transaction.payment_method || "Cash",

      transaction_date:

        transaction.transaction_date

          ?.split("T")[0] ||

        "",

      reference_no:

        transaction.reference_no || "",

      notes:

        transaction.notes || ""

    });

    if (transaction.receipt_url) {

      setPreview(transaction.receipt_url);

    }

  }, [

    transaction,

    reset

  ]);

  /* =========================================================
     RECEIPT
  ========================================================= */

  const handleReceiptChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setReceipt(file);

    if (file.type.startsWith("image/")) {

      setPreview(

        URL.createObjectURL(file)

      );

    } else {

      setPreview("");

    }

  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const onSubmit = async (values) => {

    try {

      const formData = new FormData();

      Object.entries(values).forEach(

        ([key, value]) => {

          formData.append(

            key,

            value ?? ""

          );

        }

      );

      if (receipt) {

        formData.append(

          "receipt",

          receipt

        );

      }

      if (transaction?.id) {

        await updateTransaction(

          transaction.id,

          formData

        );

      } else {

        await createTransaction(

          formData

        );

      }

      onSuccess?.();

      onClose?.();

    }

    catch (err) {

      console.error(

        "Transaction Error:",

        err

      );

      alert(

        err.response?.data?.message ||

        "Unable to save transaction."

      );

    }

  };

  /* =========================================================
     UI
  ========================================================= */

  return (

    <form

      onSubmit={handleSubmit(onSubmit)}

      className="space-y-6"
    >
              {/* =========================================================
          TITLE
      ========================================================= */}

      <div>

        <label className="mb-2 block text-sm font-semibold text-slate-700">

          Title

        </label>

        <input

          type="text"

          placeholder="e.g. Salary, Grocery, Electricity Bill"

          {...register("title", {

            required: "Title is required"

          })}

          className={`w-full rounded-xl border px-4 py-3 outline-none transition

          ${

            errors.title

              ? "border-red-500"

              : "border-slate-300 focus:border-blue-600"

          }`}

        />

        {

          errors.title && (

            <p className="mt-2 text-sm text-red-500">

              {errors.title.message}

            </p>

          )

        }

      </div>

      {/* =========================================================
          AMOUNT
      ========================================================= */}

      <div>

        <label className="mb-2 block text-sm font-semibold text-slate-700">

          Amount

        </label>

        <div className="relative">

          <DollarSign

            size={18}

            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"

          />

          <input

            type="number"

            step="0.01"

            placeholder="0.00"

            {...register("amount", {

              required: "Amount is required",

              min: {

                value: 1,

                message: "Amount must be greater than 0"

              }

            })}

            className={`w-full rounded-xl border py-3 pl-11 pr-4 outline-none transition

            ${

              errors.amount

                ? "border-red-500"

                : "border-slate-300 focus:border-blue-600"

            }`}

          />

        </div>

        {

          errors.amount && (

            <p className="mt-2 text-sm text-red-500">

              {errors.amount.message}

            </p>

          )

        }

      </div>

      {/* =========================================================
          TYPE
      ========================================================= */}

      <div>

        <label className="mb-3 block text-sm font-semibold text-slate-700">

          Transaction Type

        </label>

        <div className="grid grid-cols-2 gap-4">

          <label

            className={`cursor-pointer rounded-xl border p-4 text-center transition

            ${

              transactionType === "income"

                ? "border-green-500 bg-green-50"

                : "border-slate-300"

            }`}

          >

            <input

              type="radio"

              value="income"

              {...register("type")}

              className="hidden"

            />

            <span className="font-semibold text-green-600">

              Income

            </span>

          </label>

          <label

            className={`cursor-pointer rounded-xl border p-4 text-center transition

            ${

              transactionType === "expense"

                ? "border-red-500 bg-red-50"

                : "border-slate-300"

            }`}

          >

            <input

              type="radio"

              value="expense"

              {...register("type")}

              className="hidden"

            />

            <span className="font-semibold text-red-600">

              Expense

            </span>

          </label>

        </div>

      </div>

      {/* =========================================================
          CATEGORY + ACCOUNT
      ========================================================= */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">

            Category

          </label>

          <select

            {...register("category_id", {

              required: "Category is required"

            })}

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

          {

            errors.category_id && (

              <p className="mt-2 text-sm text-red-500">

                {errors.category_id.message}

              </p>

            )

          }

        </div>

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">

            Account

          </label>

          <select

            {...register("account_id", {

              required: "Account is required"

            })}

            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"

          >

            <option value="">

              Select Account

            </option>

            {

              accounts.map((account) => (

                <option

                  key={account.id}

                  value={account.id}

                >

                  {account.name}

                </option>

              ))

            }

          </select>

          {

            errors.account_id && (

              <p className="mt-2 text-sm text-red-500">

                {errors.account_id.message}

              </p>

            )

          }

        </div>

      </div>

      {/* =========================================================
          PAYMENT METHOD
      ========================================================= */}

      <div>

        <label className="mb-2 block text-sm font-semibold text-slate-700">

          Payment Method

        </label>

        <select

          {...register("payment_method")}

          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"

        >

          <option value="Cash">Cash</option>

          <option value="UPI">UPI</option>

          <option value="Card">Card</option>

          <option value="Bank Transfer">

            Bank Transfer

          </option>

        </select>

      </div>
            {/* =========================================================
          TRANSACTION DATE + REFERENCE
      ========================================================= */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">

            Transaction Date

          </label>

          <div className="relative">

            <Calendar
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input

              type="date"

              {...register("transaction_date", {

                required: "Transaction date is required"

              })}

              className={`

                w-full rounded-xl border py-3 pl-11 pr-4 outline-none transition

                ${

                  errors.transaction_date

                    ? "border-red-500"

                    : "border-slate-300 focus:border-blue-600"

                }

              `}

            />

          </div>

          {

            errors.transaction_date && (

              <p className="mt-2 text-sm text-red-500">

                {errors.transaction_date.message}

              </p>

            )

          }

        </div>

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">

            Reference No.

          </label>

          <input

            type="text"

            placeholder="Optional"

            {...register("reference_no")}

            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"

          />

        </div>

      </div>

      {/* =========================================================
          NOTES
      ========================================================= */}

      <div>

        <label className="mb-2 block text-sm font-semibold text-slate-700">

          Notes

        </label>

        <textarea

          rows={4}

          placeholder="Additional notes..."

          {...register("notes")}

          className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"

        />

      </div>

      {/* =========================================================
          RECEIPT
      ========================================================= */}

      <div>

        <label className="mb-2 block text-sm font-semibold text-slate-700">

          Receipt

        </label>

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 transition hover:border-blue-500 hover:bg-blue-50">

          <input

            type="file"

            accept="image/*,.pdf"

            className="hidden"

            onChange={handleReceiptChange}

          />

          <Upload

            size={36}

            className="mb-3 text-blue-600"

          />

          <p className="font-medium">

            Click to upload receipt

          </p>

          <p className="mt-1 text-sm text-slate-500">

            PNG, JPG, JPEG or PDF

          </p>

        </label>

      </div>

      {/* =========================================================
          PREVIEW
      ========================================================= */}

      {

        preview && (

          <div>

            <label className="mb-3 block text-sm font-semibold text-slate-700">

              Receipt Preview

            </label>

            <div className="overflow-hidden rounded-2xl border border-slate-200">

              <img

                src={preview}

                alt="Receipt"

                className="max-h-72 w-full object-contain bg-slate-50"

              />

            </div>

          </div>

        )

      }

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-6">

        <button

          type="button"

          onClick={onClose}

          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"

        >

          <X size={18} />

          Cancel

        </button>

        <button

          type="submit"

          disabled={isSubmitting}

          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"

        >

          <Save size={18} />

          {

            isSubmitting

              ? "Saving..."

              : transaction

              ? "Update Transaction"

              : "Save Transaction"

          }

        </button>

      </div>

    </form>

  );

};

export default TransactionForm;