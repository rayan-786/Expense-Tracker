import { useNavigate } from "react-router-dom";

import {

    Plus,

    Wallet,

    PiggyBank,

    FileText

} from "lucide-react";

import SectionCard from "../ui/SectionCard";

const QuickActions = () => {

    const navigate = useNavigate();

    const actions = [

        {

            title: "Add Transaction",

            icon: Plus,

            color: "bg-blue-600",

            path: "/transactions"

        },

        {

            title: "Accounts",

            icon: Wallet,

            color: "bg-green-600",

            path: "/accounts"

        },

        {

            title: "Budgets",

            icon: PiggyBank,

            color: "bg-orange-500",

            path: "/budgets"

        },

        {

            title: "Reports",

            icon: FileText,

            color: "bg-purple-600",

            path: "/reports"

        }

    ];

    return (

        <SectionCard

            title="Quick Actions"

            subtitle="Frequently used shortcuts"

        >

            <div className="grid grid-cols-2 gap-4">

                {

                    actions.map((item) => {

                        const Icon = item.icon;

                        return (

                            <button

                                key={item.title}

                                onClick={() => navigate(item.path)}

                                className="flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"

                            >

                                <div

                                    className={`${item.color} mb-3 rounded-2xl p-3 text-white`}

                                >

                                    <Icon size={24} />

                                </div>

                                <span className="text-sm font-semibold">

                                    {item.title}

                                </span>

                            </button>

                        );

                    })

                }

            </div>

        </SectionCard>

    );

};

export default QuickActions;