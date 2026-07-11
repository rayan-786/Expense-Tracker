import { motion } from "framer-motion";

const PageHeader = ({

  title,

  subtitle,

  action,

  className = ""

}) => {

  return (

    <motion.div

      initial={{

        opacity: 0,

        y: -20

      }}

      animate={{

        opacity: 1,

        y: 0

      }}

      transition={{

        duration: 0.35

      }}

      className={`

        mb-8

        flex

        flex-col

        gap-4

        rounded-3xl

        border

        border-slate-200

        bg-white

        p-6

        shadow-sm

        md:flex-row

        md:items-center

        md:justify-between

        ${className}

      `}

    >

      {/* ==========================================
          TITLE
      ========================================== */}

      <div>

        <h1 className="text-3xl font-bold text-slate-900">

          {title}

        </h1>

        {subtitle && (

          <p className="mt-2 text-sm text-slate-500">

            {subtitle}

          </p>

        )}

      </div>

      {/* ==========================================
          ACTION
      ========================================== */}

      {action && (

        <div className="flex items-center gap-3">

          {action}

        </div>

      )}

    </motion.div>

  );

};

export default PageHeader;