import { useCallback, useEffect, useState } from "react";

import {

  getCategories,

  createCategory,

  updateCategory,

  deleteCategory

} from "../services/category.service";

/* =========================================================
   DEFAULT FILTERS
========================================================= */

const DEFAULT_FILTERS = {

  search: "",

  type: ""

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

const useCategories = () => {

  /* =========================================================
     STATES
  ========================================================= */

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

  /* =========================================================
     FETCH
  ========================================================= */

  const fetchCategories = useCallback(

    async (

      customFilters = filters,

      page = pagination.page,

      limit = pagination.limit

    ) => {

      try {

        setLoading(true);

        setError("");

        const response = await getCategories({

          ...customFilters,

          page,

          limit

        });

        setCategories(

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

          "Unable to load categories."

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

  const addCategory = async (payload) => {

    await createCategory(payload);

    await fetchCategories();

  };

  /* =========================================================
     UPDATE
  ========================================================= */

  const editCategory = async (

    id,

    payload

  ) => {

    await updateCategory(

      id,

      payload

    );

    await fetchCategories();

  };

  /* =========================================================
     DELETE
  ========================================================= */

  const removeCategory = async (id) => {

    await deleteCategory(id);

    await fetchCategories();

  };

  /* =========================================================
     FILTERS
  ========================================================= */

  const updateFilters = (values) => {

    const updated = {

      ...filters,

      ...values

    };

    setFilters(updated);

    fetchCategories(

      updated,

      1,

      pagination.limit

    );

  };

  /* =========================================================
     RESET
  ========================================================= */

  const resetFilters = () => {

    setFilters(DEFAULT_FILTERS);

    fetchCategories(

      DEFAULT_FILTERS,

      1,

      pagination.limit

    );

  };

  /* =========================================================
     PAGE
  ========================================================= */

  const changePage = (page) => {

    fetchCategories(

      filters,

      page,

      pagination.limit

    );

  };

  /* =========================================================
     LIMIT
  ========================================================= */

  const changeLimit = (limit) => {

    fetchCategories(

      filters,

      1,

      limit

    );

  };

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {

    fetchCategories(

      DEFAULT_FILTERS,

      1,

      DEFAULT_PAGINATION.limit

    );

  }, [fetchCategories]);

  /* =========================================================
     RETURN
  ========================================================= */

  return {

    categories,

    loading,

    error,

    filters,

    pagination,

    fetchCategories,

    addCategory,

    editCategory,

    removeCategory,

    updateFilters,

    resetFilters,

    changePage,

    changeLimit

  };

};

export default useCategories;