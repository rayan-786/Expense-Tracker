import api from "../api/axios";

/* =========================================================
   GET ALL ACCOUNTS
========================================================= */

export const getAccounts = async (params = {}) => {

  const { data } = await api.get("/accounts", {

    params

  });

  return data;

};

/* =========================================================
   GET ACCOUNT
========================================================= */

export const getAccountById = async (id) => {

  const { data } = await api.get(

    `/accounts/${id}`

  );

  return data;

};

/* =========================================================
   CREATE ACCOUNT
========================================================= */

export const createAccount = async (payload) => {

  const { data } = await api.post(

    "/accounts",

    payload

  );

  return data;

};

/* =========================================================
   UPDATE ACCOUNT
========================================================= */

export const updateAccount = async (

  id,

  payload

) => {

  const { data } = await api.put(

    `/accounts/${id}`,

    payload

  );

  return data;

};

/* =========================================================
   DELETE ACCOUNT
========================================================= */

export const deleteAccount = async (id) => {

  const { data } = await api.delete(

    `/accounts/${id}`

  );

  return data;

};