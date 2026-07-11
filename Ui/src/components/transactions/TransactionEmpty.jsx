import { Plus, ReceiptText } from "lucide-react";

const TransactionEmpty = ({

  title = "No Transactions Found",

  description =

    "Start tracking your finances by creating your first transaction.",

  onAdd

}) => {

  return (

    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="flex flex-col items-center justify-center px-6 py-20 text-center">

        {/* ==========================================
            ICON
        ========================================== */}

        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">

          <ReceiptText

            size={42}

            className="text-blue-600"

          />

        </div>

        {/* ==========================================
            TITLE
        ========================================== */}

        <h2 className="mt-6 text-2xl font-bold text-slate-900">

          {title}

        </h2>

        {/* ==========================================
            DESCRIPTION
        ========================================== */}

        <p className="mt-3 max-w-md text-slate-500">

          {description}

        </p>

        {/* ==========================================
            ACTION
        ========================================== */}

        {onAdd && (

          <button

            onClick={onAdd}

            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"

          >

            <Plus size={18} />

            Add Transaction

          </button>

        )}

      </div>

    </div>

  );

};

export default TransactionEmpty;