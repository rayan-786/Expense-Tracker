import { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import useAuth from "../../hooks/useAuth";
import {
  sendEmailOTP,
  updateEmail,
} from "../../services/auth.service";

const EmailSettings = () => {

  const navigate = useNavigate();

  const { user, updateUser } = useAuth();

  const [newEmail, setNewEmail] = useState("");

  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {

    if (!newEmail) {
      return toast.error("Enter new email");
    }

    try {

      setLoading(true);

      const response = await sendEmailOTP(newEmail);

      toast.success(response.message);

      setOtpSent(true);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to send OTP"
      );

    } finally {

      setLoading(false);

    }

  };

  const handleVerify = async () => {

    if (!otp) {
      return toast.error("Enter OTP");
    }

    try {

      setLoading(true);

      const response = await updateEmail(otp);

      updateUser(response.user);

      toast.success(response.message);

      setOtp("");

      setNewEmail("");

      setOtpSent(false);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Invalid OTP"
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

            Email Settings

          </h1>

          <p className="text-gray-500">

            Update your email address.

          </p>

        </div>

      </div>

      {/* Card */}

      <div className="rounded-2xl border bg-white p-8 shadow-sm">

        {/* Current Email */}

        <div className="mb-6">

          <label className="mb-2 block font-medium">

            Current Email

          </label>

          <input

            value={user?.email || ""}

            disabled

            className="w-full rounded-xl border bg-gray-100 px-4 py-3"

          />

        </div>

        {/* New Email */}

        <div className="mb-6">

          <label className="mb-2 block font-medium">

            New Email

          </label>

          <div className="relative">

            <Mail
              size={18}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input

              type="email"

              value={newEmail}

              onChange={(e) =>
                setNewEmail(e.target.value)
              }

              placeholder="Enter new email"

              className="w-full rounded-xl border py-3 pl-11 pr-4 outline-none focus:border-blue-600"

            />

          </div>

        </div>

        {/* Send OTP */}

        {!otpSent && (

          <button

            onClick={handleSendOTP}

            disabled={loading}

            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"

          >

            {loading
              ? "Sending OTP..."
              : "Send OTP"}

          </button>

        )}

        {/* OTP */}

        {otpSent && (

          <>

            <div className="mt-8">

              <label className="mb-2 block font-medium">

                Enter OTP

              </label>

              <input

                value={otp}

                onChange={(e) =>
                  setOtp(e.target.value)
                }

                placeholder="6 digit OTP"

                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-600"

              />

            </div>

            <button

              onClick={handleVerify}

              disabled={loading}

              className="mt-6 w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700"

            >

              {loading
                ? "Verifying..."
                : "Verify & Update Email"}

            </button>

          </>

        )}

      </div>

    </div>

  );

};

export default EmailSettings;