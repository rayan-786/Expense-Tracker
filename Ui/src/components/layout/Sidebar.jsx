import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  ArrowLeftRight,
  Tags,
  Wallet,
  PiggyBank,
  FileText,
  User,
  LogOut,
  Settings
} from "lucide-react";

import useAuth from "../../hooks/useAuth";

const Sidebar = () => {

  const navigate = useNavigate();

  const { logout, user } = useAuth();

  /* =========================================================
     MENU
  ========================================================= */

  const menus = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard
    },

    {
      name: "Transactions",
      path: "/transactions",
      icon: ArrowLeftRight
    },

    {
      name: "Categories",
      path: "/categories",
      icon: Tags
    },

    {
      name: "Accounts",
      path: "/accounts",
      icon: Wallet
    },

    {
      name: "Budgets",
      path: "/budgets",
      icon: PiggyBank
    },

    {
      name: "Reports",
      path: "/reports",
      icon: FileText
    },
    {
    name: "Profile",
    path: "/profile",
    icon: User
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings
    }

  ];

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {

    logout();

    navigate("/login", {

      replace: true

    });

  };

  return (

    <aside className="hidden h-screen w-72 shrink-0 border-r border-gray-200 bg-white lg:flex lg:flex-col">

      {/* =====================================================
          LOGO
      ===================================================== */}

      <div className="border-b border-gray-100 px-8 py-6">

        <h1 className="text-2xl font-bold text-blue-600">

          Expense Tracker

        </h1>

        <p className="mt-1 text-sm text-gray-500">

          Personal Finance

        </p>

      </div>

      {/* =====================================================
          MENU
      ===================================================== */}

      <nav className="flex-1 space-y-2 overflow-y-auto p-5">

        {menus.map((menu) => {

          const Icon = menu.icon;

          return (

            <NavLink

              key={menu.path}

              to={menu.path}

              className={({ isActive }) =>

                `flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition-all

                ${
                  isActive

                    ? "bg-blue-600 text-white shadow-md"

                    : "text-gray-700 hover:bg-gray-100"
                }`

              }

            >

              <Icon size={20} />

              {menu.name}

            </NavLink>

          );

        })}

      </nav>

      {/* =====================================================
          USER
      ===================================================== */}

      <div className="border-t border-gray-200 p-5">

        <div className="mb-4 flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">

            <User size={22} />

          </div>

          <div>

            <h4 className="font-semibold text-gray-800">

              {user?.name || "User"}

            </h4>

            <p className="text-sm text-gray-500">

              {user?.email}

            </p>

          </div>

        </div>

        <button

          onClick={handleLogout}

          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-3 font-medium text-red-600 transition hover:bg-red-100"

        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </aside>

  );

};

export default Sidebar;