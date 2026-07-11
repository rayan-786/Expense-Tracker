import {

  ChevronLeft,

  ChevronRight

} from "lucide-react";

const TransactionPagination = ({

  pagination,

  onPageChange,

  onLimitChange

}) => {

  if (!pagination) return null;

  const {

    page = 1,

    limit = 10,

    total = 0,

    totalPages = 1

  } = pagination;

  const start = total === 0

    ? 0

    : (page - 1) * limit + 1;

  const end = Math.min(

    page * limit,

    total

  );

  return (

    <div className="flex flex-col gap-4 rounded-b-3xl border-t border-slate-200 bg-white px-6 py-4 md:flex-row md:items-center md:justify-between">

      {/* ==========================================
          INFO
      ========================================== */}

      <p className="text-sm text-slate-500">

        Showing

        <span className="mx-1 font-semibold text-slate-800">

          {start}

        </span>

        -

        <span className="mx-1 font-semibold text-slate-800">

          {end}

        </span>

        of

        <span className="mx-1 font-semibold text-slate-800">

          {total}

        </span>

        transactions

      </p>

      <div className="flex flex-wrap items-center gap-3">

        {/* ==========================================
            LIMIT
        ========================================== */}

        <select

          value={limit}

          onChange={(e) =>

            onLimitChange(

              Number(e.target.value)

            )

          }

          className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-600"

        >

          <option value={10}>10</option>

          <option value={25}>25</option>

          <option value={50}>50</option>

          <option value={100}>100</option>

        </select>

        {/* ==========================================
            PREVIOUS
        ========================================== */}

        <button

          disabled={page === 1}

          onClick={() =>

            onPageChange(page - 1)

          }

          className="rounded-xl border border-slate-300 p-2 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"

        >

          <ChevronLeft size={18} />

        </button>

        {/* ==========================================
            PAGE
        ========================================== */}

        <div className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white">

          {page} / {totalPages}

        </div>

        {/* ==========================================
            NEXT
        ========================================== */}

        <button

          disabled={page >= totalPages}

          onClick={() =>

            onPageChange(page + 1)

          }

          className="rounded-xl border border-slate-300 p-2 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"

        >

          <ChevronRight size={18} />

        </button>

      </div>

    </div>

  );

};

export default TransactionPagination;