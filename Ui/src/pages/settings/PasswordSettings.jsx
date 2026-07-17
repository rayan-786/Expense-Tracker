import { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { changePassword } from "../../services/auth.service";

const PasswordSettings = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({

    currentPassword: "",

    newPassword: "",

    confirmPassword: ""

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {

      return toast.error("All fields are required");

    }

    if (formData.newPassword.length < 6) {

      return toast.error(
        "Password must be at least 6 characters"
      );

    }

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {

      return toast.error(
        "Passwords do not match"
      );

    }

    try {

      setLoading(true);

      const response = await changePassword({

        currentPassword:
          formData.currentPassword,

        newPassword:
          formData.newPassword,

      });

      toast.success(response.message);

      setFormData({

        currentPassword: "",

        newPassword: "",

        confirmPassword: ""

      });

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Failed to update password"

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

          className="rounded-xl border p-2 hover:bg-gray-100"

        >

          <ArrowLeft size={20} />

        </button>

        <div>

          <h1 className="text-3xl font-bold">

            Change Password

          </h1>

          <p className="text-gray-500">

            Update your account password.

          </p>

        </div>

      </div>

      {/* Card */}

      <div className="rounded-2xl border bg-white p-8 shadow-sm">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Current */}

          <div>

            <label className="mb-2 block font-medium">

              Current Password

            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input

                type={
                  showCurrent
                    ? "text"
                    : "password"
                }

                name="currentPassword"

                value={
                  formData.currentPassword
                }

                onChange={handleChange}

                className="w-full rounded-xl border py-3 pl-11 pr-12 outline-none focus:border-blue-600"

                placeholder="Current password"

              />

              <button

                type="button"

                onClick={() =>
                  setShowCurrent(
                    !showCurrent
                  )
                }

                className="absolute right-4 top-4"

              >

                {showCurrent ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}

              </button>

            </div>

          </div>

          {/* New */}

          <div>

            <label className="mb-2 block font-medium">

              New Password

            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input

                type={
                  showNew
                    ? "text"
                    : "password"
                }

                name="newPassword"

                value={
                  formData.newPassword
                }

                onChange={handleChange}

                className="w-full rounded-xl border py-3 pl-11 pr-12 outline-none focus:border-blue-600"

                placeholder="New password"

              />

              <button

                type="button"

                onClick={() =>
                  setShowNew(!showNew)
                }

                className="absolute right-4 top-4"

              >

                {showNew ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}

              </button>

            </div>

          </div>

          {/* Confirm */}

          <div>

            <label className="mb-2 block font-medium">

              Confirm Password

            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input

                type={
                  showConfirm
                    ? "text"
                    : "password"
                }

                name="confirmPassword"

                value={
                  formData.confirmPassword
                }

                onChange={handleChange}

                className="w-full rounded-xl border py-3 pl-11 pr-12 outline-none focus:border-blue-600"

                placeholder="Confirm password"

              />

              <button

                type="button"

                onClick={() =>
                  setShowConfirm(
                    !showConfirm
                  )
                }

                className="absolute right-4 top-4"

              >

                {showConfirm ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}

              </button>

            </div>

          </div>

          <button

            disabled={loading}

            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"

          >

            {loading
              ? "Updating..."
              : "Update Password"}

          </button>

        </form>

      </div>

    </div>

  );

};

export default PasswordSettings;