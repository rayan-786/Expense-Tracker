import axios from "axios";

/* =========================================================
   AXIOS INSTANCE
========================================================= */

const api = axios.create({

  baseURL: import.meta.env.VITE_API_URL,

  timeout: 30000,

  headers: {

    "Content-Type": "application/json"

  }

});

/* =========================================================
   REQUEST INTERCEPTOR
========================================================= */

api.interceptors.request.use(

  (config) => {

    const token = localStorage.getItem("token");

    if (token) {

      config.headers.Authorization = `Bearer ${token}`;

    }

    console.log(
      "%c🚀 API Request",
      "color:#2563EB;font-weight:bold"
    );

    console.log({

      method: config.method?.toUpperCase(),

      url: config.baseURL + config.url,

      data: config.data,

      params: config.params

    });

    return config;

  },

  (error) => Promise.reject(error)

);

/* =========================================================
   RESPONSE INTERCEPTOR
========================================================= */

api.interceptors.response.use(

  (response) => {

    console.log(
      "%c✅ API Response",
      "color:#22C55E;font-weight:bold"
    );

    console.log({

      status: response.status,

      url: response.config.url,

      data: response.data

    });

    return response;

  },

  (error) => {

    console.error(
      "%c❌ API Error",
      "color:#EF4444;font-weight:bold"
    );

    console.error({

      status: error.response?.status,

      url: error.config?.url,

      message:
        error.response?.data?.message ||
        error.message

    });

    /* ==============================================
       AUTO LOGOUT
    ============================================== */

    const currentPath = window.location.pathname;

    const isAuthPage =
      currentPath.includes("/login") ||
      currentPath.includes("/register") ||
      currentPath.includes("/forgot-password") ||
      currentPath.includes("/reset-password");

    if (
      error.response?.status === 401 &&
      !isAuthPage
    ) {

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.replace("/login");

    }

    return Promise.reject(error);

  }

);

export default api;