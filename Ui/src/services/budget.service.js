import api from "../api/axios";

/* =========================================================
   GET ALL BUDGETS
========================================================= */

export const getBudgets = async (params = {}) => {

  const response = await api.get(

    "/budgets",

    {

      params

    }

  );

  return response.data;

};

/* =========================================================
   GET SINGLE BUDGET
========================================================= */

export const getBudgetById = async (id) => {

  const response = await api.get(

    `/budgets/${id}`

  );

  return response.data;

};

/* =========================================================
   CREATE BUDGET
========================================================= */

export const createBudget = async (data) => {

  const response = await api.post(

    "/budgets",

    data

  );

  return response.data;

};

/* =========================================================
   UPDATE BUDGET
========================================================= */

export const updateBudget = async (

  id,

  data

) => {

  const response = await api.put(

    `/budgets/${id}`,

    data

  );

  return response.data;

};

/* =========================================================
   DELETE BUDGET
========================================================= */

export const deleteBudget = async (id) => {

  const response = await api.delete(

    `/budgets/${id}`

  );

  return response.data;

};

/* =========================================================
   EXPORT PDF
========================================================= */

export const exportBudgetPdf = async (params = {}) => {

  const response = await api.get(

    "/budgets/export/pdf",

    {

      params,

      responseType: "blob"

    }

  );

  return response;

};

/* =========================================================
   EXPORT EXCEL
========================================================= */

export const exportBudgetExcel = async (params = {}) => {

  const response = await api.get(

    "/budgets/export/excel",

    {

      params,

      responseType: "blob"

    }

  );

  return response;

};