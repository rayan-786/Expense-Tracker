import {
  Landmark,
  Wallet,
  CreditCard,
  IndianRupee,
  PiggyBank,
  Building2
} from "lucide-react";

import StatCard from "../ui/StatCard";

const AccountStats = ({

  accounts = []

}) => {

  /* =========================================================
     CALCULATIONS
  ========================================================= */

  const totalAccounts = accounts.length;

  const totalBalance = accounts.reduce(

    (total, account) =>

      total +

      Number(

        account.current_balance || 0

      ),

    0

  );

  const cashAccounts = accounts.filter(

    (account) =>

      account.type === "Cash"

  ).length;

  const bankAccounts = accounts.filter(

    (account) =>

      account.type === "Bank"

  ).length;

  const walletAccounts = accounts.filter(

    (account) =>

      account.type === "Wallet"

  ).length;

  const creditCards = accounts.filter(

    (account) =>

      account.type === "Credit Card"

  ).length;

  return (

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">

      {/* ==========================================
          TOTAL BALANCE
      ========================================== */}

      <StatCard

        title="Total Balance"

        value={totalBalance}

        icon={IndianRupee}

        color="green"

      />

      {/* ==========================================
          TOTAL ACCOUNTS
      ========================================== */}

      <StatCard

        title="Total Accounts"

        value={totalAccounts}

        icon={Landmark}

        color="blue"
         prefix=""

      />

      {/* ==========================================
          CASH
      ========================================== */}

      <StatCard

        title="Cash"

        value={cashAccounts}

        icon={Wallet}

        color="amber"
         prefix=""

      />

      {/* ==========================================
          BANK
      ========================================== */}

      <StatCard

        title="Bank"

        value={bankAccounts}

        icon={Building2}

        color="indigo"
         prefix=""

      />

      {/* ==========================================
          WALLET
      ========================================== */}

      <StatCard

        title="Wallet"

        value={walletAccounts}

        icon={PiggyBank}

        color="purple"
         prefix=""

      />

      {/* ==========================================
          CREDIT CARD
      ========================================== */}

      <StatCard

        title="Credit Cards"

        value={creditCards}

        icon={CreditCard}

        color="red"
         prefix=""

      />

    </div>

  );

};

export default AccountStats;