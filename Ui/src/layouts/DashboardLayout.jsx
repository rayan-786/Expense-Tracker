import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import MobileSidebar from "../components/layout/MobileSidebar";

const DashboardLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

    <div className="h-screen overflow-hidden bg-slate-100">

      <div className="flex h-full">

        {/* ==========================================
            DESKTOP SIDEBAR
        ========================================== */}

        <Sidebar />

        {/* ==========================================
            MOBILE SIDEBAR
        ========================================== */}

        <MobileSidebar

          open={sidebarOpen}

          setOpen={setSidebarOpen}

        />

        {/* ==========================================
            RIGHT SIDE
        ========================================== */}

        <div className="flex min-w-0 flex-1 flex-col">

          {/* HEADER */}

          <Header

            onMenuClick={() =>

              setSidebarOpen(true)

            }

          />

          {/* PAGE */}

          <main className="flex-1 overflow-y-auto p-6">

            <div className="mx-auto max-w-7xl">

              <Outlet />

            </div>

          </main>

        </div>

      </div>

    </div>

  );

};

export default DashboardLayout;