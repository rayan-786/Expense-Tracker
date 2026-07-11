import {

  BrowserRouter,

  Routes,

  Route,

  Navigate

} from "react-router-dom";

import Login from "./pages/auth/Login";

import Register from "./pages/auth/Register";

import Dashboard from "./pages/dashboard/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

import PublicRoute from "./routes/PublicRoute";

import DashboardLayout from "./layouts/DashboardLayout";

import Transactions from "./pages/transactions/Transactions"
import Categories from "./pages/categories/Categories";
import Accounts from "./pages/accounts/Accounts";
import Budgets from "./pages/budgets/Budgets";
import Reports from "./pages/reports/Reports";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ==============================
            PUBLIC ROUTES
        ============================== */}

        <Route element={<PublicRoute />}>

          <Route

            path="/login"

            element={<Login />}

          />

          <Route

            path="/register"

            element={<Register />}

          />

        </Route>

        {/* ==============================
            PRIVATE ROUTES
        ============================== */}

       

         <Route element={<ProtectedRoute />}>

    <Route element={<DashboardLayout />}>

        <Route

            path="/dashboard"

            element={<Dashboard />}

        />

        <Route

            path="/transactions"

            element={<Transactions />}

        />

        <Route

            path="/categories"

            element={ <Categories />}

        />

        <Route

            path="/accounts"

            element={<Accounts />}

        />

        <Route

            path="/budgets"

            element={<Budgets />}

        />

        <Route

            path="/reports"

            element={<Reports />}

        />

    </Route> 

  </Route>

        {/* ==============================
            DEFAULT
        ============================== */}

        <Route

          path="*"

          element={<Navigate to="/login" replace />}

        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;