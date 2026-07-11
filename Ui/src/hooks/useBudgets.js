import { useCallback, useEffect, useState } from "react";

import {

  getBudgets,

  createBudget,

  updateBudget,

  deleteBudget

} from "../services/budget.service";

/* =========================================================
   DEFAULT FILTERS
========================================================= */

const DEFAULT_FILTERS = {

  search: "",

  month: "",

  status: ""

};

/* =========================================================
   DEFAULT PAGINATION
========================================================= */

const DEFAULT_PAGINATION = {

  page: 1,

  limit: 10,

  total: 0,

  totalPages: 1

};

const useBudgets = () => {

  /* =========================================================
     STATES
  ========================================================= */

  const [budgets, setBudgets] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [filters, setFilters] = useState(

    DEFAULT_FILTERS

  );

  const [pagination, setPagination] = useState(

    DEFAULT_PAGINATION

  );

  /* =========================================================
     FETCH
  ========================================================= */

  const fetchBudgets = useCallback(

    async (

      customFilters = filters,

      page = pagination.page,

      limit = pagination.limit

    ) => {

      try {

        setLoading(true);

        setError("");

        const response = await getBudgets({

          ...customFilters,

          page,

          limit

        });

        setBudgets(

          response.data || []

        );

        if (response.pagination) {

          setPagination({

            page:

              response.pagination.page,

            limit:

              response.pagination.limit,

            total:

              response.pagination.total,

            totalPages:

              response.pagination.totalPages

          });

        }

      }

      catch (err) {

        console.error(err);

        setError(

          err.response?.data?.message ||

          "Unable to load budgets."

        );

      }

      finally {

        setLoading(false);

      }

    },

    [

      filters,

      pagination.page,

      pagination.limit

    ]

  );

  /* =========================================================
     CREATE
  ========================================================= */

  const addBudget = async (payload) => {

    await createBudget(payload);

    await fetchBudgets();

  };

  /* =========================================================
     UPDATE
  ========================================================= */

  const editBudget = async (

    id,

    payload

  ) => {

    await updateBudget(

      id,

      payload

    );

    await fetchBudgets();

  };

  /* =========================================================
     DELETE
  ========================================================= */

  const removeBudget = async (id) => {

    await deleteBudget(id);

    await fetchBudgets();

  };

  /* =========================================================
     FILTER
  ========================================================= */

  const updateFilters = (values) => {

    const updated = {

      ...filters,

      ...values

    };

    setFilters(updated);

    fetchBudgets(

      updated,

      1,

      pagination.limit

    );

  };

  /* =========================================================
     RESET
  ========================================================= */

  const resetFilters = () => {

    setFilters(

      DEFAULT_FILTERS

    );

    fetchBudgets(

      DEFAULT_FILTERS,

      1,

      pagination.limit

    );

  };

  /* =========================================================
     PAGE
  ========================================================= */

  const changePage = (page) => {

    fetchBudgets(

      filters,

      page,

      pagination.limit

    );

  };

  /* =========================================================
     LIMIT
  ========================================================= */

  const changeLimit = (limit) => {

    fetchBudgets(

      filters,

      1,

      limit

    );

  };

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {

    fetchBudgets(

      DEFAULT_FILTERS,

      1,

      DEFAULT_PAGINATION.limit

    );

  }, [fetchBudgets]);

  /* =========================================================
     RETURN
  ========================================================= */

  return {

    budgets,

    loading,

    error,

    filters,

    pagination,

    fetchBudgets,

    addBudget,

    editBudget,

    removeBudget,

    updateFilters,

    resetFilters,

    changePage,

    changeLimit

  };

};

export default useBudgets;