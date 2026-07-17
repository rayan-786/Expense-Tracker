import {
  Mail,
  Globe,
  Lock,
  Trash2,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Settings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your account settings.
        </p>
      </div>

      {/* Cards */}
      <div className="space-y-5">

        {/* Email */}
        <button
          onClick={() => navigate("/settings/email")}
          className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-blue-500 hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-blue-100 p-3">
              <Mail className="text-blue-600" size={24} />
            </div>

            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900">
                Email
              </h3>

              <p className="text-sm text-gray-500">
                Change your email address
              </p>
            </div>
          </div>

          <ChevronRight className="text-gray-400" />
        </button>

        {/* Language */}
        <button
          onClick={() => navigate("/settings/language")}
          className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-green-500 hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-green-100 p-3">
              <Globe className="text-green-600" size={24} />
            </div>

            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900">
                Language
              </h3>

              <p className="text-sm text-gray-500">
                Choose your preferred application language
              </p>
            </div>
          </div>

          <ChevronRight className="text-gray-400" />
        </button>

        {/* Password */}
        <button
          onClick={() => navigate("/settings/password")}
          className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-orange-500 hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-orange-100 p-3">
              <Lock className="text-orange-600" size={24} />
            </div>

            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900">
                Password
              </h3>

              <p className="text-sm text-gray-500">
                Change your account password
              </p>
            </div>
          </div>

          <ChevronRight className="text-gray-400" />
        </button>

        {/* Danger Zone */}
        <button
          onClick={() => navigate("/settings/danger")}
          className="flex w-full items-center justify-between rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm transition hover:border-red-500 hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-red-100 p-3">
              <Trash2 className="text-red-600" size={24} />
            </div>

            <div className="text-left">
              <h3 className="text-lg font-semibold text-red-600">
                Danger Zone
              </h3>

              <p className="text-sm text-red-500">
                Permanently delete your account and all data
              </p>
            </div>
          </div>

          <ChevronRight className="text-red-400" />
        </button>

      </div>
    </div>
  );
};

export default Settings;