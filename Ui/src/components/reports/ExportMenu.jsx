import {

  FileText,

  FileSpreadsheet,

  Printer,

  Loader2

} from "lucide-react";

const ExportMenu = ({

  loading = false,

  onExportPdf,

  onExportExcel,

  onPrint

}) => {

  return (

    <div className="flex flex-wrap items-center gap-3">

      {/* ==========================================
          PDF
      ========================================== */}

      <button

        onClick={onExportPdf}

        disabled={loading}

        className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"

      >

        {

          loading

            ? (

              <Loader2

                size={18}

                className="animate-spin"

              />

            )

            : (

              <FileText size={18} />

            )

        }

        Export PDF

      </button>

      {/* ==========================================
          EXCEL
      ========================================== */}

      <button

        onClick={onExportExcel}

        disabled={loading}

        className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"

      >

        {

          loading

            ? (

              <Loader2

                size={18}

                className="animate-spin"

              />

            )

            : (

              <FileSpreadsheet size={18} />

            )

        }

        Export Excel

      </button>

      {/* ==========================================
          PRINT
      ========================================== */}

      <button

        onClick={onPrint}

        className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"

      >

        <Printer size={18} />

        Print

      </button>

    </div>

  );

};

export default ExportMenu;