import {
  Search,
  RotateCcw
} from "lucide-react";

const AccountFilters = ({

  filters,

  onFilterChange,

  onReset

}) => {

  /* =========================================================
     HANDLE CHANGE
  ========================================================= */

  const handleChange = (e) => {

    onFilterChange({

      [e.target.name]: e.target.value

    });

  };

  return (

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

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

            placeholder="Search account..."

            className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none transition focus:border-blue-600"

          />

        </div>

        {/* ==========================================
            ACCOUNT TYPE
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

          <option value="Cash">

            Cash

          </option>

          <option value="Bank">

            Bank

          </option>

          <option value="Wallet">

            Wallet

          </option>

          <option value="Credit Card">

            Credit Card

          </option>

        </select>

        {/* ==========================================
            STATUS
        ========================================== */}

        <select

          name="status"

          value={filters.status}

          onChange={handleChange}

          className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"

        >

          <option value="">

            All Status

          </option>

          <option value="1">

            Active

          </option>

          <option value="0">

            Inactive

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

export default AccountFilters;