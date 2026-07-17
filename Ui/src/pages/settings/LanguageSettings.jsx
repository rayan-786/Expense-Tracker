import { useState } from "react";
import {
  Globe,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import useAuth from "../../hooks/useAuth";
import { updateLanguage } from "../../services/auth.service";

const LanguageSettings = () => {

  const navigate = useNavigate();

  const { user, updateUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const [language, setLanguage] = useState(
    user?.language || "en"
  );

  const handleSave = async () => {

    try {

      setLoading(true);

      const response = await updateLanguage(language);

      updateUser(response.user);

      toast.success(response.message);

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Failed to update language"

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center gap-3">

        <button

          onClick={() => navigate("/settings")}

          className="rounded-xl border border-gray-200 p-2 transition hover:bg-gray-100"

        >

          <ArrowLeft size={20} />

        </button>

        <div>

          <h1 className="text-3xl font-bold text-gray-900">

            🌐 Language Settings

          </h1>

          <p className="mt-1 text-gray-500">

           Select the language you'd like to use throughout the application.

          </p>

        </div>

      </div>

      {/* Card */}

      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-3">

          <div className="mb-8 flex items-center gap-5 rounded-2xl bg-slate-50 p-5">

            <Globe
              size={26}
              className="text-blue-600"
            />

          </div>

          <div>

            <h2 className="text-xl font-bold">

              Application Language

            </h2>

            <p className="text-sm text-gray-500">

              This setting will be used across the app.

            </p>

          </div>

        </div>

        {/* English */}

        <button

          onClick={() => setLanguage("en")}

          className={`mb-5 flex w-full items-center justify-between rounded-2xl border-2 p-6 transition-all duration-200 hover:scale-[1.01] ${
            language === "en"

              ? "border-blue-600 bg-blue-50"

              : "border-gray-200 hover:border-blue-400"

          }`}

        >

          <div className="flex items-center gap-4">

<span className="text-3xl">
🇺🇸
</span>

<div>

<h3 className="text-xl font-bold">
English
</h3>

<p className="text-sm text-slate-500">
Default language
</p>

</div>

</div>
          {language === "en" && (

            <CheckCircle2

              size={28}

              className="text-blue-600"

            />

          )}

        </button>

        {/* Hindi */}

        <button

          onClick={() => setLanguage("hi")}

          className={`flex w-full items-center justify-between rounded-2xl border-2 p-6 transition-all duration-200 hover:scale-[1.01] ${
            language === "hi"

              ? "border-green-600 bg-green-50"

              : "border-gray-200 hover:border-green-400"

          }`}

        >

          <div className="flex items-center gap-4">

<span className="text-3xl">
🇮🇳
</span>

<div>

<h3 className="text-xl font-bold">
हिन्दी
</h3>

<p className="text-sm text-slate-500">
Hindi (भारत)
</p>

</div>

</div>

          {language === "hi" && (

            <CheckCircle2

              size={28}

              className="text-green-600"

            />

          )}

        </button>

        {/* Save */}

        <button

          onClick={handleSave}

          disabled={loading}

          className="mt-10 h-14 w-full rounded-2xl bg-blue-600 text-lg font-semibold text-white shadow-lg transition hover:scale-[1.01] hover:bg-blue-700 disabled:opacity-60 bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"

        >

          {loading

            ? "Saving..."

            : "Save Changes"}

        </button>

      </div>

    </div>

  );

};

export default LanguageSettings;