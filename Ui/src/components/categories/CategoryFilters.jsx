import {
  Search,
  RotateCcw
} from "lucide-react";

const CategoryFilters = ({

  filters,

  onFilterChange,

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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        {/* ==========================================
            SEARCH
        ========================================== */}

        <div className="relative">

          <Search

            size={18}

            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"

          />

          <input

            type="text"

            name="search"

            value={filters.search}

            onChange={handleChange}

            placeholder="Search category..."

            className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none transition focus:border-blue-600"

          />

        </div>

        {/* ==========================================
            TYPE
        ========================================== */}

        <select

          name="type"

          value={filters.type}

          onChange={handleChange}

          className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"

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
            RESET
        ========================================== */}

        <button

          onClick={onReset}

          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"

        >

          <RotateCcw size={18} />

          Reset Filters

        </button>

      </div>

    </div>

  );

};

export default CategoryFilters;