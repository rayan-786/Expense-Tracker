import { useState } from "react";

import {

  Plus,
  RefreshCw,
  AlertCircle

} from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";

import useTransactions from "../../hooks/useTransactions";

import TransactionStats from "../../components/transactions/TransactionStats";
import TransactionFilters from "../../components/transactions/TransactionFilters";
import TransactionTable from "../../components/transactions/TransactionTable";
import TransactionDrawer from "../../components/transactions/TransactionDrawer";
import TransactionView from "../../components/transactions/TransactionView";
import DeleteTransactionModal from "../../components/transactions/DeleteTransactionModal";

const Transactions = () => {

  /* =========================================================
     UI STATE
  ========================================================= */

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [viewOpen, setViewOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  /* =========================================================
     HOOK
  ========================================================= */

  const {

    transactions,

    loading,

    error,

    filters,

    pagination,

    fetchTransactions,

    updateFilters,

    resetFilters,

    changePage,

    changeLimit

  } = useTransactions();

  /* =========================================================
     HANDLERS
  ========================================================= */

  const handleAdd = () => {

    setSelectedTransaction(null);

    setDrawerOpen(true);

  };

  const handleEdit = (transaction) => {

    setSelectedTransaction(transaction);

    setDrawerOpen(true);

  };

  const handleView = (transaction) => {

    setSelectedTransaction(transaction);

    setViewOpen(true);

  };

  const handleDelete = (transaction) => {

    setSelectedTransaction(transaction);

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

          <h2 className="text-xl font-bold">

            Failed to Load Transactions

          </h2>

          <p className="mt-2 text-slate-600">

            {error}

          </p>

          <button

            onClick={fetchTransactions}

            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-white"

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

      <PageHeader

        title="Transactions"

        subtitle="Manage your income and expense transactions."

        action={

          <div className="flex items-center gap-3">

            <button

              onClick={fetchTransactions}

              className="rounded-xl border border-slate-300 bg-white p-3 transition hover:bg-slate-100"

            >

              <RefreshCw size={18} />

            </button>

            <button

              onClick={handleAdd}

              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"

            >

              <Plus size={18} />

              Add Transaction

            </button>

          </div>

        }

      />

      {/* Stats */}

      <TransactionStats

        transactions={transactions}

      />

      {/* Filters */}

      <TransactionFilters

        filters={filters}

        onFilterChange={updateFilters}

        onReset={resetFilters}

      />

      {/* Table */}

      <TransactionTable

        transactions={transactions}

        loading={loading}

        pagination={pagination}

        onPageChange={changePage}

        onLimitChange={changeLimit}

        onAdd={handleAdd}

        onView={handleView}

        onEdit={handleEdit}

        onDelete={handleDelete}

      />

      {/* Drawer */}

      <TransactionDrawer

        open={drawerOpen}

        transaction={selectedTransaction}

        onClose={() => {

          setDrawerOpen(false);

          setSelectedTransaction(null);

        }}

        onSuccess={() => {

          setDrawerOpen(false);

          fetchTransactions();

        }}

      />

      {/* View */}

      <TransactionView

        open={viewOpen}

        transaction={selectedTransaction}

        onClose={() => {

          setViewOpen(false);

          setSelectedTransaction(null);

        }}

      />

      {/* Delete */}

      <DeleteTransactionModal

        open={deleteOpen}

        transaction={selectedTransaction}

        onClose={() => {

          setDeleteOpen(false);

          setSelectedTransaction(null);

        }}

        onSuccess={() => {

          setDeleteOpen(false);

          fetchTransactions();

        }}

      />

    </div>

  );

};

export default Transactions;