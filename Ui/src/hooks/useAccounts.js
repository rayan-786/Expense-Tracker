import { useCallback, useEffect, useState } from "react";

import {

  getAccounts,

  createAccount,

  updateAccount,

  deleteAccount

} from "../services/account.service";

/* =========================================================
   DEFAULT FILTERS
========================================================= */

const DEFAULT_FILTERS = {

  search: "",

  type: "",

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

const useAccounts = () => {

  /* =========================================================
     STATES
  ========================================================= */

  const [accounts, setAccounts] = useState([]);

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

  const fetchAccounts = useCallback(

    async (

      customFilters = filters,

      page = pagination.page,

      limit = pagination.limit

    ) => {

      try {

        setLoading(true);

        setError("");

        const response = await getAccounts({

          ...customFilters,

          page,

          limit

        });

        setAccounts(

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

          "Unable to load accounts."

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

  const addAccount = async (payload) => {

    await createAccount(payload);

    await fetchAccounts();

  };

  /* =========================================================
     UPDATE
  ========================================================= */

  const editAccount = async (

    id,

    payload

  ) => {

    await updateAccount(

      id,

      payload

    );

    await fetchAccounts();

  };

  /* =========================================================
     DELETE
  ========================================================= */

  const removeAccount = async (id) => {

    await deleteAccount(id);

    await fetchAccounts();

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

    fetchAccounts(

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

    fetchAccounts(

      DEFAULT_FILTERS,

      1,

      pagination.limit

    );

  };

  /* =========================================================
     PAGE
  ========================================================= */

  const changePage = (page) => {

    fetchAccounts(

      filters,

      page,

      pagination.limit

    );

  };

  /* =========================================================
     LIMIT
  ========================================================= */

  const changeLimit = (limit) => {

    fetchAccounts(

      filters,

      1,

      limit

    );

  };

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {

    fetchAccounts(

      DEFAULT_FILTERS,

      1,

      DEFAULT_PAGINATION.limit

    );

  }, [fetchAccounts]);

  /* =========================================================
     RETURN
  ========================================================= */

  return {

    accounts,

    loading,

    error,

    filters,

    pagination,

    fetchAccounts,

    addAccount,

    editAccount,

    removeAccount,

    updateFilters,

    resetFilters,

    changePage,

    changeLimit

  };

};

export default useAccounts;