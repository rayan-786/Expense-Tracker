const TransactionSkeleton = () => {

  return (

    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="animate-pulse">

        {/* Header */}

        <div className="border-b border-slate-200 p-6">

          <div className="h-6 w-56 rounded bg-slate-200"></div>

          <div className="mt-3 h-4 w-72 rounded bg-slate-100"></div>

        </div>

        {/* Rows */}

        <div className="p-6 space-y-4">

          {

            Array.from({

              length: 8

            }).map((_, index) => (

              <div

                key={index}

                className="flex items-center gap-4 rounded-xl border border-slate-100 p-4"

              >

                <div className="h-12 w-12 rounded-2xl bg-slate-200"></div>

                <div className="flex-1">

                  <div className="h-4 w-52 rounded bg-slate-200"></div>

                  <div className="mt-3 h-3 w-36 rounded bg-slate-100"></div>

                </div>

                <div className="h-5 w-24 rounded bg-slate-200"></div>

                <div className="h-5 w-20 rounded bg-slate-100"></div>

                <div className="h-5 w-20 rounded bg-slate-200"></div>

                <div className="h-10 w-28 rounded-xl bg-slate-100"></div>

              </div>

            ))

          }

        </div>

      </div>

    </div>

  );

};

export default TransactionSkeleton;