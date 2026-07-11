import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";

const SectionCard = ({

  title,

  subtitle,

  children,

  action,

  className = "",

  loading = false

}) => {

  return (

    <motion.div

      initial={{

        opacity: 0,

        y: 15

      }}

      animate={{

        opacity: 1,

        y: 0

      }}

      transition={{

        duration: 0.35

      }}

      className={`

        overflow-hidden

        rounded-3xl

        border

        border-slate-200

        bg-white

        shadow-sm

        transition

        hover:shadow-md

        ${className}

      `}

    >

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

        <div>

          <h2 className="text-lg font-semibold text-slate-900">

            {title}

          </h2>

          {subtitle && (

            <p className="mt-1 text-sm text-slate-500">

              {subtitle}

            </p>

          )}

        </div>

        <div className="flex items-center gap-3">

          {action}

          <button

            className="rounded-xl p-2 transition hover:bg-slate-100"

          >

            <MoreHorizontal size={18} />

          </button>

        </div>

      </div>

      {/* ==========================================
          BODY
      ========================================== */}

      <div className="p-6">

        {loading ? (

          <div className="flex h-60 items-center justify-center">

            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

          </div>

        ) : (

          children

        )}

      </div>

    </motion.div>

  );

};

export default SectionCard;