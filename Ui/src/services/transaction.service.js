import api from "../api/axios";

/* =========================================================
   GET ALL TRANSACTIONS
========================================================= */

export const getTransactions = async (params = {}) => {

  const { data } = await api.get("/transactions", {
    params
  });

  return data;

};

/* =========================================================
   GET SINGLE TRANSACTION
========================================================= */

export const getTransactionById = async (id) => {

  const { data } = await api.get(`/transactions/${id}`);

  return data;

};

/* =========================================================
   CREATE TRANSACTION
========================================================= */

export const createTransaction = async (formData) => {

  const { data } = await api.post(

    "/transactions",

    formData,

    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }

  );

  return data;

};

/* =========================================================
   UPDATE TRANSACTION
========================================================= */

export const updateTransaction = async (

  id,

  formData

) => {

  const { data } = await api.put(

    `/transactions/${id}`,

    formData,

    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }

  );

  return data;

};

/* =========================================================
   DELETE TRANSACTION
========================================================= */

export const deleteTransaction = async (id) => {

  const { data } = await api.delete(`/transactions/${id}`);

  return data;

};