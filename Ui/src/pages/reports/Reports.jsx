import { useEffect, useState } from "react";

import {
  RefreshCw,
  AlertCircle
} from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";

import ReportStats from "../../components/reports/ReportStats";
import ReportFilters from "../../components/reports/ReportFilters";
import ReportCharts from "../../components/reports/ReportCharts";
import TopExpensesTable from "../../components/reports/TopExpensesTable";
import ExportMenu from "../../components/reports/ExportMenu";

import useReports from "../../hooks/useReports";

import { getCategories } from "../../services/category.service";
import { getAccounts } from "../../services/account.service";

const Reports = () => {

  /* =========================================================
     STATES
  ========================================================= */

  const [categories, setCategories] = useState([]);

  const [accounts, setAccounts] = useState([]);

  const [exportLoading, setExportLoading] = useState(false);

  /* =========================================================
     REPORT HOOK
  ========================================================= */

  const {

    report,

    loading,

    error,

    filters,

    updateFilters,

    applyFilters,

    resetFilters,

    fetchReports,

    exportPdf,

    exportExcel

  } = useReports();

  /* =========================================================
     LOAD FILTER DATA
  ========================================================= */

  useEffect(() => {

    loadMasterData();

  }, []);

  const loadMasterData = async () => {

    try {

      const [

        categoryRes,

        accountRes

      ] = await Promise.all([

        getCategories(),

        getAccounts()

      ]);

      setCategories(

        categoryRes.data || []

      );

      setAccounts(

        accountRes.data || []

      );

    }

    catch (err) {

      console.error(

        "Report Master Data Error",

        err

      );

    }

  };

  /* =========================================================
     EXPORT PDF
  ========================================================= */

  const handleExportPdf = async () => {

    try {

      setExportLoading(true);

      await exportPdf();

    }

    finally {

      setExportLoading(false);

    }

  };

  /* =========================================================
     EXPORT EXCEL
  ========================================================= */

  const handleExportExcel = async () => {

    try {

      setExportLoading(true);

      await exportExcel();

    }

    finally {

      setExportLoading(false);

    }

  };

  /* =========================================================
     PRINT
  ========================================================= */

  const handlePrint = () => {

    window.print();

  };

  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {

    return (

      <div className="flex h-[70vh] items-center justify-center">

        <div className="w-full max-w-lg rounded-3xl border border-red-200 bg-red-50 p-10 text-center shadow-sm">

          <AlertCircle

            size={52}

            className="mx-auto mb-5 text-red-600"

          />

          <h2 className="text-2xl font-bold text-slate-900">

            Failed to Load Reports

          </h2>

          <p className="mt-3 text-slate-600">

            {error}

          </p>

          <button

            onClick={fetchReports}

            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"

          >

            Retry

          </button>

        </div>

      </div>

    );

  }

  return (

    <div className="space-y-6">

      {/* ==========================================
          PAGE HEADER
      ========================================== */}

      <PageHeader

        title="Reports"

        subtitle="Analyze your financial performance with interactive reports."

        action={

          <div className="flex flex-wrap items-center gap-3">

            <button

              onClick={fetchReports}

              className="rounded-xl border border-slate-300 bg-white p-3 transition hover:bg-slate-100"

            >

              <RefreshCw size={18} />

            </button>

            <ExportMenu

              loading={exportLoading}

              onExportPdf={handleExportPdf}

              onExportExcel={handleExportExcel}

              onPrint={handlePrint}

            />

          </div>

        }

      />

      {/* ==========================================
          REPORT SUMMARY
      ========================================== */}

      <ReportStats

        summary={report.summary}

      />

      {/* ==========================================
          FILTERS
      ========================================== */}

      <ReportFilters

        filters={filters}

        categories={categories}

        accounts={accounts}

        onFilterChange={updateFilters}

        onApply={applyFilters}

        onReset={resetFilters}

      />

            {/* ==========================================
          LOADING
      ========================================== */}

      {

        loading ? (

          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

            <div className="animate-pulse p-8">

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                {

                  Array.from({

                    length: 4

                  }).map((_, index) => (

                    <div

                      key={index}

                      className="h-[320px] rounded-2xl bg-slate-100"

                    />

                  ))

                }

              </div>

              <div className="mt-6 h-[420px] rounded-2xl bg-slate-100" />

            </div>

          </div>

        ) : (

          <>

            {/* ==========================================
                CHARTS
            ========================================== */}

            <ReportCharts

              monthlySummary={

                report.monthlySummary || []

              }

              expenseByCategory={

                report.expenseByCategory || []

              }

              cashFlow={

                report.cashFlow || {}

              }

            />

            {/* ==========================================
                TOP EXPENSES
            ========================================== */}

            <TopExpensesTable

              expenses={

                report.topExpenses || []

              }

            />

          </>

        )

      }

      {/* ==========================================
          REPORT FOOTER
      ========================================== */}

      <div className="rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm">

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

          <div>

            <h3 className="text-lg font-semibold text-slate-900">

              Financial Report Summary

            </h3>

            <p className="mt-1 text-sm text-slate-500">

              Reports are generated using your selected filters and include
              income, expenses, cash flow, and category-wise analytics.

            </p>

          </div>

          <div className="flex items-center gap-3">

            <button

              onClick={handlePrint}

              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"

            >

              Print Report

            </button>

            <button

              onClick={handleExportPdf}

              disabled={exportLoading}

              className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"

            >

              Export PDF

            </button>

            <button

              onClick={handleExportExcel}

              disabled={exportLoading}

              className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"

            >

              Export Excel

            </button>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Reports;