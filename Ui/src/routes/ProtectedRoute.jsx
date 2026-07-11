import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";

/* =========================================================
   PROTECTED ROUTE
========================================================= */

const ProtectedRoute = () => {

  const {

    loading,

    isAuthenticated

  } = useAuth();

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {

    return (

      <div className="flex h-screen items-center justify-center bg-gray-50">

        <div className="flex flex-col items-center gap-4">

          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

          <p className="text-sm text-gray-500">

            Loading...

          </p>

        </div>

      </div>

    );

  }

  /* =====================================================
     AUTH CHECK
  ===================================================== */

  if (!isAuthenticated) {

    return <Navigate to="/login" replace />;

  }

  /* =====================================================
     ALLOW ACCESS
  ===================================================== */

  return <Outlet />;

};

export default ProtectedRoute;