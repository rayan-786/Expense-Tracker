import {
  Search,
  RotateCcw
} from "lucide-react";

const TransactionFilters = ({

  filters,

  onFilterChange,

  onReset,

  categories = [],

  accounts = []

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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-7">

        {/* ==========================================
            SEARCH
        ========================================== */}

        <div className="relative xl:col-span-2">

          <Search

            size={18}

            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"

          />

          <input

            type="text"

            name="search"

            value={filters.search}

            onChange={handleChange}

            placeholder="Search..."

            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-blue-600"

          />

        </div>

        {/* ==========================================
            TYPE
        ========================================== */}

        <select

          name="type"

          value={filters.type}

          onChange={handleChange}

          className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"

        >

          <option value="">

            All Types

          </option>

          <option value="income">

            Income

          </option>

          <option value="expense">

            Expense

          </option>

        </select>

        {/* ==========================================
            CATEGORY
        ========================================== */}

        <select

          name="category_id"

          value={filters.category_id}

          onChange={handleChange}

          className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"

        >

          <option value="">

            Category

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

        {/* ==========================================
            ACCOUNT
        ========================================== */}

        <select

          name="account_id"

          value={filters.account_id}

          onChange={handleChange}

          className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"

        >

          <option value="">

            Account

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

        {/* ==========================================
            START DATE
        ========================================== */}

        <input

          type="date"

          name="start_date"

          value={filters.start_date}

          onChange={handleChange}

          className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"

        />

        {/* ==========================================
            END DATE
        ========================================== */}

        <input

          type="date"

          name="end_date"

          value={filters.end_date}

          onChange={handleChange}

          className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"

        />

      </div>

      {/* ==========================================
          RESET
      ========================================== */}

      <div className="mt-5 flex justify-end">

        <button

          onClick={onReset}

          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"

        >

          <RotateCcw size={18} />

          Reset Filters

        </button>

      </div>

    </div>

  );

};

export default TransactionFilters;