import {
  PiggyBank,
  Wallet,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";

import SectionCard from "../ui/SectionCard";

const BudgetProgress = ({ budget = {} }) => {

  const {

    totalBudget = 0,

    spent = 0,

    remaining = 0,

    usage = 0,

    status = "Safe"

  } = budget;

  /* =========================================================
     STATUS
  ========================================================= */

  const statusConfig = {

    Safe: {

      color: "text-green-600",

      bg: "bg-green-100",

      icon: CheckCircle

    },

    Warning: {

      color: "text-yellow-600",

      bg: "bg-yellow-100",

      icon: AlertTriangle

    },

    "Over Budget": {

      color: "text-red-600",

      bg: "bg-red-100",

      icon: XCircle

    }

  };

  const config =

    statusConfig[status] ||

    statusConfig.Safe;

  const StatusIcon = config.icon;

  return (

    <SectionCard

      title="Budget Progress"

      subtitle="Current month budget overview"

    >

      {/* ==========================================
          STATUS
      ========================================== */}

      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-blue-100 p-3">

            <PiggyBank

              className="text-blue-600"

              size={24}

            />

          </div>

          <div>

            <p className="text-sm text-gray-500">

              Budget Status

            </p>

            <h3 className="font-semibold text-gray-800">

              {status}

            </h3>

          </div>

        </div>

        <div

          className={`

            flex items-center gap-2

            rounded-full px-3 py-2

            text-sm font-semibold

            ${config.bg}

            ${config.color}

          `}

        >

          <StatusIcon size={16} />

          {status}

        </div>

      </div>

      {/* ==========================================
          PROGRESS BAR
      ========================================== */}

      <div>

        <div className="mb-2 flex justify-between text-sm">

          <span className="text-gray-600">

            Budget Used

          </span>

          <span className="font-semibold">

            {usage}%

          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-gray-200">

          <div

            className={`

              h-full rounded-full transition-all duration-500

              ${

                usage >= 100

                  ? "bg-red-500"

                  : usage >= 80

                  ? "bg-yellow-500"

                  : "bg-green-500"

              }

            `}

            style={{

              width: `${Math.min(usage, 100)}%`

            }}

          />

        </div>

      </div>

      {/* ==========================================
          DETAILS
      ========================================== */}

      <div className="mt-8 grid grid-cols-3 gap-4">

        <div className="rounded-2xl bg-slate-50 p-4 text-center">

          <Wallet

            className="mx-auto mb-2 text-blue-600"

            size={24}

          />

          <p className="text-xs text-gray-500">

            Total Budget

          </p>

          <h4 className="mt-2 font-bold text-gray-900">

            ₹{Number(totalBudget).toLocaleString("en-IN")}

          </h4>

        </div>

        <div className="rounded-2xl bg-red-50 p-4 text-center">

          <p className="text-xs text-gray-500">

            Spent

          </p>

          <h4 className="mt-2 font-bold text-red-600">

            ₹{Number(spent).toLocaleString("en-IN")}

          </h4>

        </div>

        <div className="rounded-2xl bg-green-50 p-4 text-center">

          <p className="text-xs text-gray-500">

            Remaining

          </p>

          <h4 className="mt-2 font-bold text-green-600">

            ₹{Number(remaining).toLocaleString("en-IN")}

          </h4>

        </div>

      </div>

    </SectionCard>

  );

};

export default BudgetProgress;