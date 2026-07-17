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
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import DashboardLayout from "./layouts/DashboardLayout";

import Transactions from "./pages/transactions/Transactions"
import Categories from "./pages/categories/Categories";
import Accounts from "./pages/accounts/Accounts";
import Budgets from "./pages/budgets/Budgets";
import Reports from "./pages/reports/Reports";
import Profile from "../src/profile/Profile";
import Settings from "./pages/settings/Settings";
import EmailSettings from "./pages/settings/EmailSettings";
import PasswordSettings from "./pages/settings/PasswordSettings";
import LanguageSettings from "./pages/settings/LanguageSettings";
import DangerZone from "./pages/settings/DangerZone";
import AuthSuccess from "./pages/AuthSuccess";

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

                    <Route
              path="/forgot-password"
              element={<ForgotPassword />}
            />

            <Route
              path="/reset-password/:token"
              element={<ResetPassword />}
            />
            <Route
  path="/auth/success"
  element={<AuthSuccess />}
/>

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
        <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/settings"
            element={<Settings />}
          />
          <Route
          path="/settings/email"
          element={<EmailSettings />}
        />

        <Route
          path="/settings/password"
          element={<PasswordSettings />}
        />

        <Route
          path="/settings/language"
          element={<LanguageSettings />}
        />

        <Route
          path="/settings/danger"
          element={<DangerZone />}
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