import api from "../api/axios";

/* =========================================================
   GET DASHBOARD
========================================================= */

export const getDashboard = async () => {

  const response = await api.get("/dashboard");

  return response.data;

};