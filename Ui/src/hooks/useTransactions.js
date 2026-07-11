import { useCallback, useEffect, useState } from "react";

import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
} from "../services/transaction.service";

const DEFAULT_FILTERS = {
  search: "",
  type: "",
  category_id: "",
  account_id: "",
  start_date: "",
  end_date: ""
};

const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 1
};

const useTransactions = () => {

  /* =========================================================
     STATE
  ========================================================= */

  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

  /* =========================================================
     FETCH
  ========================================================= */

  const fetchTransactions = useCallback(

    async (

      customFilters = filters,

      page = pagination.page,

      limit = pagination.limit

    ) => {

      try {

        setLoading(true);

        setError("");

        const response = await getTransactions({

          ...customFilters,

          page,

          limit

        });

        setTransactions(response.data || []);

        setPagination({

          page: response.pagination?.page ?? page,

          limit: response.pagination?.limit ?? limit,

          total: response.pagination?.total ?? 0,

          totalPages: response.pagination?.totalPages ?? 1

        });

      }

      catch (err) {

        console.error(err);

        setError(

          err.response?.data?.message ||

          "Unable to load transactions."

        );

      }

      finally {

        setLoading(false);

      }

    },

    [filters, pagination.page, pagination.limit]

  );

    /* =========================================================
     CREATE
  ========================================================= */

  const addTransaction = async (payload) => {

    await createTransaction(payload);

    await fetchTransactions(

      filters,

      pagination.page,

      pagination.limit

    );

  };

  /* =========================================================
     UPDATE
  ========================================================= */

  const editTransaction = async (

    id,

    payload

  ) => {

    await updateTransaction(

      id,

      payload

    );

    await fetchTransactions(

      filters,

      pagination.page,

      pagination.limit

    );

  };

  /* =========================================================
     DELETE
  ========================================================= */

  const removeTransaction = async (id) => {

    await deleteTransaction(id);

    await fetchTransactions(

      filters,

      pagination.page,

      pagination.limit

    );

  };

  /* =========================================================
     FILTERS
  ========================================================= */

  const updateFilters = (values) => {

    const updatedFilters = {

      ...filters,

      ...values

    };

    setFilters(updatedFilters);

    fetchTransactions(

      updatedFilters,

      1,

      pagination.limit

    );

  };

  /* =========================================================
     RESET FILTERS
  ========================================================= */

  const resetFilters = () => {

    setFilters(DEFAULT_FILTERS);

    fetchTransactions(

      DEFAULT_FILTERS,

      1,

      pagination.limit

    );

  };

  /* =========================================================
     PAGINATION
  ========================================================= */

  const changePage = (page) => {

    fetchTransactions(

      filters,

      page,

      pagination.limit

    );

  };

  const changeLimit = (limit) => {

    fetchTransactions(

      filters,

      1,

      limit

    );

  };

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {

    fetchTransactions(

      DEFAULT_FILTERS,

      1,

      DEFAULT_PAGINATION.limit

    );

  }, [fetchTransactions]);

  /* =========================================================
     RETURN
  ========================================================= */

  return {

    transactions,

    loading,

    error,

    filters,

    pagination,

    fetchTransactions,

    addTransaction,

    editTransaction,

    removeTransaction,

    updateFilters,

    resetFilters,

    changePage,

    changeLimit

  };

};

export default useTransactions;









// import { useCallback, useEffect, useState } from "react";

// import {

//   getTransactions,

//   createTransaction,

//   updateTransaction,

//   deleteTransaction

// } from "../services/transaction.service";

// const useTransactions = () => {

//   /* =========================================================
//      STATES
//   ========================================================= */

//   const [transactions, setTransactions] = useState([]);

//   const [loading, setLoading] = useState(false);

//   const [error, setError] = useState("");

//   const [pagination, setPagination] = useState({

//     page: 1,

//     limit: 10,

//     total: 0,

//     totalPages: 1

//   });

//   const [filters, setFilters] = useState({

//     search: "",

//     type: "",

//     category_id: "",

//     account_id: "",

//     start_date: "",

//     end_date: ""

//   });

//   /* =========================================================
//      FETCH
//   ========================================================= */

//   const fetchTransactions = useCallback(

//     async (

//       customFilters = filters,

//       page = pagination.page,

//       limit = pagination.limit

//     ) => {

//       try {

//         setLoading(true);

//         setError("");

//         const response = await getTransactions({

//           ...customFilters,

//           page,

//           limit

//         });

//         setTransactions(

//           response.data || []

//         );

//         if (response.pagination) {

//           setPagination(

//             response.pagination

//           );

//         }

//       }

//       catch (err) {

//         console.error(err);

//         setError(

//           err.response?.data?.message ||

//           "Unable to load transactions."

//         );

//       }

//       finally {

//         setLoading(false);

//       }

//     },

//     [filters, pagination.page, pagination.limit]

//   );

//   /* =========================================================
//      CREATE
//   ========================================================= */

//   const addTransaction = async (payload) => {

//     await createTransaction(payload);

//     fetchTransactions();

//   };

//   /* =========================================================
//      UPDATE
//   ========================================================= */

//   const editTransaction = async (

//     id,

//     payload

//   ) => {

//     await updateTransaction(

//       id,

//       payload

//     );

//     fetchTransactions();

//   };

//   /* =========================================================
//      DELETE
//   ========================================================= */

//   const removeTransaction = async (id) => {

//     await deleteTransaction(id);

//     fetchTransactions();

//   };

//   /* =========================================================
//      FILTER
//   ========================================================= */

//   const updateFilters = (values) => {

//     const updated = {

//       ...filters,

//       ...values

//     };

//     setFilters(updated);

//     fetchTransactions(updated, 1);

//   };

//   /* =========================================================
//      PAGE
//   ========================================================= */

//   const changePage = (page) => {

//     fetchTransactions(

//       filters,

//       page,

//       pagination.limit

//     );

//   };

//   /* =========================================================
//      LIMIT
//   ========================================================= */

//   const changeLimit = (limit) => {

//     fetchTransactions(

//       filters,

//       1,

//       limit

//     );

//   };

//   /* =========================================================
//      RESET
//   ========================================================= */

//   const resetFilters = () => {

//     const reset = {

//       search: "",

//       type: "",

//       category_id: "",

//       account_id: "",

//       start_date: "",

//       end_date: ""

//     };

//     setFilters(reset);

//     fetchTransactions(reset, 1);

//   };

//   /* =========================================================
//      INITIAL LOAD
//   ========================================================= */

//   useEffect(() => {

//     fetchTransactions();

//   }, []);

//   /* =========================================================
//      RETURN
//   ========================================================= */

//   return {

//     transactions,

//     loading,

//     error,

//     filters,

//     pagination,

//     fetchTransactions,

//     addTransaction,

//     editTransaction,

//     removeTransaction,

//     updateFilters,

//     resetFilters,

//     changePage,

//     changeLimit

//   };

// };

// export default useTransactions;