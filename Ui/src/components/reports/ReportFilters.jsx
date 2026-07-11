import {
  Search,
  RotateCcw,
  Filter
} from "lucide-react";

const ReportFilters = ({

  filters,

  categories = [],

  accounts = [],

  onFilterChange,

  onApply,

  onReset

}) => {

  /* =========================================================
     CHANGE
  ========================================================= */

  const handleChange = (e) => {

    onFilterChange({

      [e.target.name]: e.target.value

    });

  };

  return (

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">

        {/* ==========================================
            FROM DATE
        ========================================== */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-600">

            From

          </label>

          <input

            type="date"

            name="start_date"

            value={filters.start_date}

            onChange={handleChange}

            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"

          />

        </div>

        {/* ==========================================
            TO DATE
        ========================================== */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-600">

            To

          </label>

          <input

            type="date"

            name="end_date"

            value={filters.end_date}

            onChange={handleChange}

            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"

          />

        </div>

        {/* ==========================================
            CATEGORY
        ========================================== */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-600">

            Category

          </label>

          <select

            name="category_id"

            value={filters.category_id}

            onChange={handleChange}

            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"

          >

            <option value="">

              All Categories

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

        {/* ==========================================
            ACCOUNT
        ========================================== */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-600">

            Account

          </label>

          <select

            name="account_id"

            value={filters.account_id}

            onChange={handleChange}

            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"

          >

            <option value="">

              All Accounts

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

        </div>

        {/* ==========================================
            APPLY
        ========================================== */}

        <button

          onClick={onApply}

          className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"

        >

          <Filter size={18} />

          Apply

        </button>

        {/* ==========================================
            RESET
        ========================================== */}

        <button

          onClick={onReset}

          className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"

        >

          <RotateCcw size={18} />

          Reset

        </button>

      </div>

    </div>

  );

};

export default ReportFilters;