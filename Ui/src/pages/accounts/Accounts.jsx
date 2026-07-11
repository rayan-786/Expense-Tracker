import { useState } from "react";

import {
  Plus,
  RefreshCw,
  AlertCircle
} from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";

import AccountStats from "../../components/accounts/AccountStats";
import AccountFilters from "../../components/accounts/AccountFilters";
import AccountTable from "../../components/accounts/AccountTable";
import AccountDrawer from "../../components/accounts/AccountDrawer";
import DeleteAccountModal from "../../components/accounts/DeleteAccountModal";

import useAccounts from "../../hooks/useAccounts";

const Accounts = () => {

  /* =========================================================
     UI STATES
  ========================================================= */

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [drawerMode, setDrawerMode] = useState("add");

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedAccount, setSelectedAccount] = useState(null);

  /* =========================================================
     HOOK
  ========================================================= */

  const {

    accounts,

    loading,

    error,

    filters,

    pagination,

    fetchAccounts,

    updateFilters,

    resetFilters,

    changePage,

    changeLimit

  } = useAccounts();

  /* =========================================================
     HANDLERS
  ========================================================= */

  const handleAdd = () => {

    setSelectedAccount(null);

    setDrawerMode("add");

    setDrawerOpen(true);

  };

  const handleView = (account) => {

    setSelectedAccount(account);

    setDrawerMode("view");

    setDrawerOpen(true);

  };

  const handleEdit = (account) => {

    setSelectedAccount(account);

    setDrawerMode("edit");

    setDrawerOpen(true);

  };

  const handleDelete = (account) => {

    setSelectedAccount(account);

    setDeleteOpen(true);

  };

  /* =========================================================
     ERROR UI
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

            Failed to Load Accounts

          </h2>

          <p className="mt-3 text-slate-600">

            {error}

          </p>

          <button

            onClick={fetchAccounts}

            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"

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

        title="Accounts"

        subtitle="Manage all your cash, bank, wallet and credit card accounts."

        action={

          <div className="flex items-center gap-3">

            <button

              onClick={() =>

                fetchAccounts()

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

              Add Account

            </button>

          </div>

        }

      />

      {/* ==========================================
          STATS
      ========================================== */}

      <AccountStats

        accounts={accounts}

      />

      {/* ==========================================
          FILTERS
      ========================================== */}

      <AccountFilters

        filters={filters}

        onFilterChange={updateFilters}

        onReset={resetFilters}

      />

      {/* ==========================================
          TABLE
      ========================================== */}

      <AccountTable

        accounts={accounts}

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
          ACCOUNT DRAWER
      ========================================== */}

      <AccountDrawer

        open={drawerOpen}

        mode={drawerMode}

        account={selectedAccount}

        onClose={() => {

          setDrawerOpen(false);

          setSelectedAccount(null);

        }}

        onSuccess={() => {

          setDrawerOpen(false);

          setSelectedAccount(null);

          fetchAccounts();

        }}

      />

      {/* ==========================================
          DELETE MODAL
      ========================================== */}

      <DeleteAccountModal

        open={deleteOpen}

        account={selectedAccount}

        onClose={() => {

          setDeleteOpen(false);

          setSelectedAccount(null);

        }}

        onSuccess={() => {

          setDeleteOpen(false);

          setSelectedAccount(null);

          fetchAccounts();

        }}

      />

    </div>

  );

};

export default Accounts;