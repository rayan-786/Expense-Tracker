import { useState } from "react";

import {
  Plus,
  RefreshCw,
  AlertCircle
} from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";

import BudgetStats from "../../components/budgets/BudgetStats";
import BudgetFilters from "../../components/budgets/BudgetFilters";
import BudgetTable from "../../components/budgets/BudgetTable";
import BudgetDrawer from "../../components/budgets/BudgetDrawer";
import DeleteBudgetModal from "../../components/budgets/DeleteBudgetModal";

import useBudgets from "../../hooks/useBudgets";

const Budgets = () => {

  /* =========================================================
     UI STATES
  ========================================================= */

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [drawerMode, setDrawerMode] = useState("add");

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedBudget, setSelectedBudget] = useState(null);

  /* =========================================================
     HOOK
  ========================================================= */

  const {

    budgets,

    loading,

    error,

    filters,

    pagination,

    fetchBudgets,

    updateFilters,

    resetFilters,

    changePage,

    changeLimit

  } = useBudgets();

  /* =========================================================
     HANDLERS
  ========================================================= */

  const handleAdd = () => {

    setSelectedBudget(null);

    setDrawerMode("add");

    setDrawerOpen(true);

  };

  const handleView = (budget) => {

    setSelectedBudget(budget);

    setDrawerMode("view");

    setDrawerOpen(true);

  };

  const handleEdit = (budget) => {

    setSelectedBudget(budget);

    setDrawerMode("edit");

    setDrawerOpen(true);

  };

  const handleDelete = (budget) => {

    setSelectedBudget(budget);

    setDeleteOpen(true);

  };

  /* =========================================================
     ERROR UI
  ========================================================= */

  if (error) {

    return (

      <div className="flex h-[70vh] items-center justify-center">

        <div className="w-full max-w-lg rounded-3xl border border-red-200 bg-red-50 p-10 text-center shadow-sm">

          <AlertCircle

            size={50}

            className="mx-auto mb-5 text-red-600"

          />

          <h2 className="text-2xl font-bold text-slate-900">

            Failed to Load Budgets

          </h2>

          <p className="mt-3 text-slate-600">

            {error}

          </p>

          <button

            onClick={fetchBudgets}

            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"

          >

            Retry

          </button>

        </div>

      </div>

    );

  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (

    <div className="space-y-6">

      {/* ==========================================
          PAGE HEADER
      ========================================== */}

      <PageHeader

        title="Budgets"

        subtitle="Manage monthly budgets and monitor your spending."

        action={

          <div className="flex items-center gap-3">

            <button

              onClick={() =>

                fetchBudgets()

              }

              className="rounded-xl border border-slate-300 bg-white p-3 transition hover:bg-slate-100"

            >

              <RefreshCw size={18} />

            </button>

            <button

              onClick={handleAdd}

              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"

            >

              <Plus size={18} />

              Add Budget

            </button>

          </div>

        }

      />

      {/* ==========================================
          STATS
      ========================================== */}

      <BudgetStats

        budgets={budgets}

      />

      {/* ==========================================
          FILTERS
      ========================================== */}

      <BudgetFilters

        filters={filters}

        onFilterChange={updateFilters}

        onReset={resetFilters}

      />

      {/* ==========================================
          TABLE
      ========================================== */}

      <BudgetTable

        budgets={budgets}

        loading={loading}

        pagination={pagination}

        onPageChange={changePage}

        onLimitChange={changeLimit}

        onView={handleView}

        onEdit={handleEdit}

        onDelete={handleDelete}

        onAdd={handleAdd}

      />
            {/* ==========================================
          BUDGET DRAWER
      ========================================== */}

      <BudgetDrawer

        open={drawerOpen}

        mode={drawerMode}

        budget={selectedBudget}

        onClose={() => {

          setDrawerOpen(false);

          setSelectedBudget(null);

        }}

        onSuccess={() => {

          setDrawerOpen(false);

          setSelectedBudget(null);

          fetchBudgets();

        }}

      />

      {/* ==========================================
          DELETE MODAL
      ========================================== */}

      <DeleteBudgetModal

        open={deleteOpen}

        budget={selectedBudget}

        onClose={() => {

          setDeleteOpen(false);

          setSelectedBudget(null);

        }}

        onSuccess={() => {

          setDeleteOpen(false);

          setSelectedBudget(null);

          fetchBudgets();

        }}

      />

    </div>

  );

};

export default Budgets;