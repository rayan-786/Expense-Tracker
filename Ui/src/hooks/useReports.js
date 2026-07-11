import {

  useCallback,

  useEffect,

  useState

} from "react";

import {

  getReports,

  exportPdf,

  exportExcel,

  downloadFile

} from "../services/report.service";

/* =========================================================
   DEFAULT FILTERS
========================================================= */

const DEFAULT_FILTERS = {

  start_date: "",

  end_date: "",

  category_id: "",

  account_id: ""

};

const useReports = () => {

  /* =========================================================
     STATES
  ========================================================= */

  const [report, setReport] = useState({

    summary: {},

    monthlySummary: [],

    expenseByCategory: [],

    cashFlow: {},

    topExpenses: [],

    topCategories: [],

    paymentMethods: []

  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [filters, setFilters] = useState(

    DEFAULT_FILTERS

  );

  /* =========================================================
     FETCH REPORTS
  ========================================================= */

/* =========================================================
   FETCH REPORTS
========================================================= */

const fetchReports = useCallback(

  async (

    customFilters = filters

  ) => {

    try {

      setLoading(true);

      setError("");

      const response = await getReports(

        customFilters

      );

      console.log("Reports Response :", response);

      const reportData =
        response?.data ??
        response?.report ??
        response ??
        {};

      setReport({

        summary: reportData.summary || {},

        monthlySummary:
          reportData.monthlySummary || [],

        expenseByCategory:
          reportData.expenseByCategory || [],

        cashFlow:
          reportData.cashFlow || {},

        topExpenses:
          reportData.topExpenses || [],

        topCategories:
          reportData.topCategories || [],

        paymentMethods:
          reportData.paymentMethods || []

      });

    }

    catch (err) {

      console.error(err);

      setError(

        err.response?.data?.message ||

        "Unable to load reports."

      );

    }

    finally {

      setLoading(false);

    }

  },

  [filters]

);

  /* =========================================================
     FILTER
  ========================================================= */

  const updateFilters = (

    values

  ) => {

    const updated = {

      ...filters,

      ...values

    };

    setFilters(updated);

  };

  /* =========================================================
     APPLY FILTERS
  ========================================================= */

  const applyFilters = () => {

    fetchReports(filters);

  };

  /* =========================================================
     RESET FILTERS
  ========================================================= */

  const resetFilters = () => {

    setFilters(

      DEFAULT_FILTERS

    );

    fetchReports(

      DEFAULT_FILTERS

    );

  };

  /* =========================================================
     EXPORT PDF
  ========================================================= */

  const handleExportPdf = async () => {

    try {

      const response = await exportPdf(

        filters

      );

      downloadFile(

        response,

        "Expense_Report.pdf"

      );

    }

    catch (err) {

      console.error(err);

    }

  };

  /* =========================================================
     EXPORT EXCEL
  ========================================================= */

  const handleExportExcel = async () => {

    try {

      const response = await exportExcel(

        filters

      );

      downloadFile(

        response,

        "Expense_Report.xlsx"

      );

    }

    catch (err) {

      console.error(err);

    }

  };

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {

    fetchReports(

      DEFAULT_FILTERS

    );

  }, [fetchReports]);

  /* =========================================================
     RETURN
  ========================================================= */

  return {

    report,

    loading,

    error,

    filters,

    fetchReports,

    updateFilters,

    applyFilters,

    resetFilters,

    exportPdf:

      handleExportPdf,

    exportExcel:

      handleExportExcel

  };

};

export default useReports;