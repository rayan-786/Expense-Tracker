import api from "../api/axios";

/* =========================================================
   GET REPORTS
========================================================= */

export const getReports = async (params = {}) => {

  const response = await api.get(

    "/reports",

    {

      params

    }

  );

  return response.data;

};

/* =========================================================
   EXPORT PDF
========================================================= */

export const exportPdf = async (params = {}) => {

  const response = await api.get(

    "/reports/export/pdf",

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

export const exportExcel = async (params = {}) => {

  const response = await api.get(

    "/reports/export/excel",

    {

      params,

      responseType: "blob"

    }

  );

  return response;

};

/* =========================================================
   DOWNLOAD FILE
========================================================= */

export const downloadFile = (

  response,

  filename

) => {

  const url = window.URL.createObjectURL(

    new Blob([response.data])

  );

  const link = document.createElement("a");

  link.href = url;

  link.download = filename;

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);

};