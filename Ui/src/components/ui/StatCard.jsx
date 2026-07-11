import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

const StatCard = ({

  title,

  value,

  icon: Icon,

  color = "blue",

  change,

  changeType = "up",

  prefix = "₹"

}) => {

  const colors = {

    blue: {

      bg: "bg-blue-50",

      icon: "bg-blue-600",

      text: "text-blue-600"

    },

    green: {

      bg: "bg-green-50",

      icon: "bg-green-600",

      text: "text-green-600"

    },

    red: {

      bg: "bg-red-50",

      icon: "bg-red-600",

      text: "text-red-600"

    },

    orange: {

      bg: "bg-orange-50",

      icon: "bg-orange-500",

      text: "text-orange-500"

    },

    purple: {

      bg: "bg-purple-50",

      icon: "bg-purple-600",

      text: "text-purple-600"

    }

  };

  const theme = colors[color] || colors.blue;

  return (

    <motion.div

      whileHover={{

        y: -5

      }}

      transition={{

        duration: 0.25

      }}

      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"

    >

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">

            {title}

          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900">

            {prefix}

            {Number(value || 0).toLocaleString("en-IN")}

          </h2>

        </div>

        <div

          className={`

            flex

            h-14

            w-14

            items-center

            justify-center

            rounded-2xl

            ${theme.icon}

            text-white

          `}

        >

          {Icon && <Icon size={26} />}

        </div>

      </div>

      {/* ==========================================
          FOOTER
      ========================================== */}

      <div className="mt-6 flex items-center justify-between">

        {change !== undefined ? (

          <div

            className={`

              flex

              items-center

              gap-1

              rounded-full

              px-3

              py-1

              text-xs

              font-semibold

              ${theme.bg}

              ${theme.text}

            `}

          >

            {changeType === "up"

              ? <TrendingUp size={15} />

              : <TrendingDown size={15} />}

            {change}%

          </div>

        ) : (

          <span></span>

        )}

        <span className="text-xs text-slate-400">

          Updated Today

        </span>

      </div>

    </motion.div>

  );

};

export default StatCard;