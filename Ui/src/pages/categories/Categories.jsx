import { useState } from "react";

import {
  Plus,
  RefreshCw,
  AlertCircle
} from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";

import CategoryStats from "../../components/categories/CategoryStats";
import CategoryFilters from "../../components/categories/CategoryFilters";
import CategoryTable from "../../components/categories/CategoryTable";
import CategoryDrawer from "../../components/categories/CategoryDrawer";
import DeleteCategoryModal from "../../components/categories/DeleteCategoryModal";
import useCategories from "../../hooks/useCategories";

const Categories = () => {

  /* =========================================================
     UI STATES
  ========================================================= */

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [drawerMode, setDrawerMode] = useState("add");

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  /* =========================================================
     HOOK
  ========================================================= */

  const {

    categories,

    loading,

    error,

    filters,

    pagination,

    fetchCategories,

    updateFilters,

    resetFilters,

    changePage,

    changeLimit

  } = useCategories();

  /* =========================================================
     HANDLERS
  ========================================================= */

  const handleAdd = () => {

    setSelectedCategory(null);

    setDrawerMode("add");

    setDrawerOpen(true);

  };

  const handleView = (category) => {

    setSelectedCategory(category);

    setDrawerMode("view");

    setDrawerOpen(true);

  };

  const handleEdit = (category) => {

    setSelectedCategory(category);

    setDrawerMode("edit");

    setDrawerOpen(true);

  };

  const handleDelete = (category) => {

  setSelectedCategory(category);

  setDeleteOpen(true);

};

  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {

    return (

      <div className="flex h-[70vh] items-center justify-center">

        <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center">

          <AlertCircle

            size={48}

            className="mx-auto mb-4 text-red-600"

          />

          <h2 className="text-2xl font-bold">

            Failed to Load Categories

          </h2>

          <p className="mt-3 text-slate-600">

            {error}

          </p>

          <button

            onClick={fetchCategories}

            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"

          >

            Retry

          </button>

        </div>

      </div>

    );

  }

  /* =========================================================
     UI
  ========================================================= */

  return (

    <div className="space-y-6">

      {/* ==========================================
          PAGE HEADER
      ========================================== */}

      <PageHeader

        title="Categories"

        subtitle="Manage your income and expense categories."

        action={

          <div className="flex items-center gap-3">

            <button

              onClick={() => fetchCategories()}

              className="rounded-xl border border-slate-300 bg-white p-3 transition hover:bg-slate-100"

            >

              <RefreshCw size={18} />

            </button>

            <button

              onClick={handleAdd}

              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"

            >

              <Plus size={18} />

              Add Category

            </button>

          </div>

        }

      />

      {/* ==========================================
          STATS
      ========================================== */}

      <CategoryStats

        categories={categories}

      />

      {/* ==========================================
          FILTERS
      ========================================== */}

      <CategoryFilters

        filters={filters}

        onFilterChange={updateFilters}

        onReset={resetFilters}

      />

      {/* ==========================================
          TABLE
      ========================================== */}

      <CategoryTable

        categories={categories}

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
          DRAWER
      ========================================== */}

      <CategoryDrawer

        open={drawerOpen}

        mode={drawerMode}

        category={selectedCategory}

        onClose={() => {

          setDrawerOpen(false);

          setSelectedCategory(null);

        }}

        onSuccess={() => {

          setDrawerOpen(false);

          setSelectedCategory(null);

          fetchCategories();

        }}

      />


      <DeleteCategoryModal

  open={deleteOpen}

  category={selectedCategory}

  onClose={() => {

    setDeleteOpen(false);

    setSelectedCategory(null);

  }}

  onSuccess={() => {

    setDeleteOpen(false);

    setSelectedCategory(null);

    fetchCategories();

  }}

/>

    </div>

  );

};

export default Categories;