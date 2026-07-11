import { Wallet, Star } from "lucide-react";

import SectionCard from "../ui/SectionCard";

const AccountsSummary = ({

  accountsSummary = {}

}) => {

  const {

    totalAccounts = 0,

    totalBalance = 0,

    defaultAccount = "",

    accounts = []

  } = accountsSummary;

  return (

    <SectionCard

      title="Accounts"

      subtitle="Your account balances"

    >

      {/* ==========================================
          TOP SUMMARY
      ========================================== */}

      <div className="mb-6 grid grid-cols-2 gap-4">

        <div className="rounded-2xl bg-blue-50 p-4">

          <p className="text-sm text-slate-500">

            Total Accounts

          </p>

          <h3 className="mt-2 text-3xl font-bold text-blue-700">

            {totalAccounts}

          </h3>

        </div>

        <div className="rounded-2xl bg-green-50 p-4">

          <p className="text-sm text-slate-500">

            Total Balance

          </p>

          <h3 className="mt-2 text-2xl font-bold text-green-600">

            ₹

            {Number(totalBalance).toLocaleString("en-IN")}

          </h3>

        </div>

      </div>

      {/* ==========================================
          ACCOUNTS
      ========================================== */}

      {

        accounts.length === 0 ? (

          <div className="flex h-44 items-center justify-center text-gray-500">

            No accounts available.

          </div>

        ) : (

          <div className="space-y-4">

            {

              accounts.map((account) => (

                <div

                  key={account.id}

                  className="flex items-center justify-between rounded-2xl border border-slate-200 p-4"

                >

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-blue-100 p-3">

                      <Wallet

                        className="text-blue-600"

                        size={20}

                      />

                    </div>

                    <div>

                      <div className="flex items-center gap-2">

                        <h4 className="font-semibold text-slate-800">

                          {account.name}

                        </h4>

                        {

                          account.name === defaultAccount && (

                            <Star

                              size={15}

                              className="fill-yellow-400 text-yellow-400"

                            />

                          )

                        }

                      </div>

                      <p className="text-sm text-slate-500">

                        {account.type}

                      </p>

                    </div>

                  </div>

                  <h4 className="text-lg font-bold text-slate-900">

                    ₹

                    {Number(account.balance).toLocaleString("en-IN")}

                  </h4>

                </div>

              ))

            }

          </div>

        )

      }

    </SectionCard>

  );

};

export default AccountsSummary;