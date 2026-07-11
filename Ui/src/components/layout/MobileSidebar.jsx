import { NavLink, useNavigate } from "react-router-dom";
import {
  X,
  LayoutDashboard,
  ArrowLeftRight,
  Tags,
  Wallet,
  PiggyBank,
  FileText,
  User,
  LogOut
} from "lucide-react";

import useAuth from "../../hooks/useAuth";

const MobileSidebar = ({ open, setOpen }) => {

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

    <>

      {/* =====================================================
          OVERLAY
      ===================================================== */}

      <div

        onClick={() => setOpen(false)}

        className={`

          fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden

          ${

            open

              ? "opacity-100 visible"

              : "opacity-0 invisible"

          }

        `}

      />

      {/* =====================================================
          DRAWER
      ===================================================== */}

      <aside

        className={`

          fixed left-0 top-0 z-50 flex h-screen w-72 flex-col

          bg-white shadow-2xl transition-transform duration-300

          lg:hidden

          ${

            open

              ? "translate-x-0"

              : "-translate-x-full"

          }

        `}

      >

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

          <div>

            <h2 className="text-xl font-bold text-blue-600">

              Expense Tracker

            </h2>

            <p className="text-xs text-gray-500">

              Personal Finance

            </p>

          </div>

          <button

            onClick={() => setOpen(false)}

            className="rounded-lg p-2 hover:bg-gray-100"

          >

            <X size={22} />

          </button>

        </div>

        {/* ==========================================
            MENU
        ========================================== */}

        <nav className="flex-1 space-y-2 overflow-y-auto p-5">

          {menus.map((menu) => {

            const Icon = menu.icon;

            return (

              <NavLink

                key={menu.path}

                to={menu.path}

                onClick={() => setOpen(false)}

                className={({ isActive }) =>

                  `

                  flex items-center gap-4 rounded-xl px-4 py-3

                  text-sm font-medium transition-all

                  ${

                    isActive

                      ? "bg-blue-600 text-white"

                      : "text-gray-700 hover:bg-gray-100"

                  }

                `

                }

              >

                <Icon size={20} />

                {menu.name}

              </NavLink>

            );

          })}

        </nav>

        {/* ==========================================
            USER
        ========================================== */}

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

    </>

  );

};

export default MobileSidebar;