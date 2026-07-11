import { Menu, Search, Bell, User } from "lucide-react";

import { useLocation } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const Header = ({ onMenuClick }) => {

  const { user } = useAuth();

  const location = useLocation();

  /* =========================================================
     PAGE TITLE
  ========================================================= */

  const getPageTitle = () => {

    const path = location.pathname;

    switch (path) {

      case "/dashboard":
        return "Dashboard";

      case "/transactions":
        return "Transactions";

      case "/categories":
        return "Categories";

      case "/accounts":
        return "Accounts";

      case "/budgets":
        return "Budgets";

      case "/reports":
        return "Reports";

      case "/profile":
        return "Profile";

      default:
        return "Expense Tracker";

    }

  };

  /* =========================================================
     DATE
  ========================================================= */

  const currentDate = new Date().toLocaleDateString(

    "en-IN",

    {

      weekday: "long",

      day: "numeric",

      month: "long",

      year: "numeric"

    }

  );

  return (

    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">

      <div className="flex h-20 items-center justify-between px-6">

        {/* ==========================================
            LEFT
        ========================================== */}

        <div className="flex items-center gap-4">

          <button

            onClick={onMenuClick}

            className="rounded-xl p-2 hover:bg-gray-100 lg:hidden"

          >

            <Menu size={24} />

          </button>

          <div>

            <h1 className="text-2xl font-bold text-gray-900">

              {getPageTitle()}

            </h1>

            <p className="text-sm text-gray-500">

              {currentDate}

            </p>

          </div>

        </div>

        {/* ==========================================
            RIGHT
        ========================================== */}

        <div className="flex items-center gap-4">

          {/* Search */}

          <div className="relative hidden md:block">

            <Search

              size={18}

              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"

            />

            <input

              type="text"

              placeholder="Search..."

              className="w-72 rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:bg-white"

            />

          </div>

          {/* Notification */}

          <button

            className="relative rounded-xl border border-gray-200 p-3 transition hover:bg-gray-100"

          >

            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>

          </button>

          {/* User */}

          <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-2">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">

              <User size={18} />

            </div>

            <div className="hidden text-left md:block">

              <h4 className="text-sm font-semibold text-gray-800">

                {user?.name || "User"}

              </h4>

              <p className="text-xs text-gray-500">

                {user?.email || ""}

              </p>

            </div>

          </div>

        </div>

      </div>

    </header>

  );

};

export default Header;