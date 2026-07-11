import api from "../api/axios";

/* =========================================================
   GET ALL CATEGORIES
========================================================= */

export const getCategories = async (params = {}) => {

  const { data } = await api.get(

    "/categories",

    {
      params
    }

  );

  return data;

};

/* =========================================================
   GET CATEGORY
========================================================= */

export const getCategoryById = async (id) => {

  const { data } = await api.get(

    `/categories/${id}`

  );

  return data;

};

/* =========================================================
   CREATE CATEGORY
========================================================= */

export const createCategory = async (payload) => {

  const { data } = await api.post(

    "/categories",

    payload

  );

  return data;

};

/* =========================================================
   UPDATE CATEGORY
========================================================= */

export const updateCategory = async (

  id,

  payload

) => {

  const { data } = await api.put(

    `/categories/${id}`,

    payload

  );

  return data;

};

/* =========================================================
   DELETE CATEGORY
========================================================= */

export const deleteCategory = async (id) => {

  const { data } = await api.delete(

    `/categories/${id}`

  );

  return data;

};