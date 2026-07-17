import { useState } from "react";
import { ArrowLeft, AlertTriangle, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { deleteAccount } from "../../services/auth.service";

const DeleteAccount = () => {

  const navigate = useNavigate();
  const { logout } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);

const handleDelete = async () => {

  if (!password.trim()) {
    return toast.error("Enter your password");
  }

  if (confirmText.trim().toUpperCase() !== "DELETE") {
    return toast.error("Type DELETE to confirm");
  }

  try {

    setLoading(true);

    const response = await deleteAccount(password);

    toast.success(response.message);

    logout();

    navigate("/login", {
      replace: true,
    });

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Failed to delete account."
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
          className="rounded-xl border border-gray-200 p-2 hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </button>

        <div>

          <h1 className="text-3xl font-bold text-red-600">
            Delete Account
          </h1>

          <p className="text-gray-500">
            Permanently remove your account.
          </p>

        </div>

      </div>

      {/* Warning */}

      <div className="rounded-2xl border border-red-300 bg-red-50 p-8">

        <div className="flex items-center gap-3">

          <AlertTriangle
            size={34}
            className="text-red-600"
          />

          <div>

            <h2 className="text-xl font-bold text-red-600">
              Warning
            </h2>

            <p className="text-red-500">
              This action cannot be undone.
            </p>

          </div>

        </div>

        <ul className="mt-8 list-disc space-y-3 pl-6 text-red-700">

          <li>Your account will be permanently deleted.</li>

          <li>All transactions will be deleted.</li>

          <li>All categories will be deleted.</li>

          <li>All budgets will be deleted.</li>

          <li>All accounts will be deleted.</li>

          <li>You won't be able to recover your data.</li>

        </ul>

      </div>

      {/* Form */}

      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

        <div className="space-y-6">

          <div>

            <label className="mb-2 block font-medium">

              Current Password

            </label>

            <input

              type="password"

              value={password}

              onChange={(e) =>
                setPassword(e.target.value)
              }

              placeholder="Enter current password"

              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-500"

            />

          </div>

          <div>

            <label className="mb-2 block font-medium">

              Type DELETE to confirm

            </label>

            <input

              value={confirmText}

              onChange={(e) =>
                setConfirmText(e.target.value)
              }

              placeholder="DELETE"

              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-500"

            />

          </div>

          <div className="flex justify-end gap-4">

            <button

              onClick={() => navigate("/settings")}

              className="rounded-xl border border-gray-300 px-6 py-3 font-medium hover:bg-gray-100"

            >

              Cancel

            </button>

            <button

  onClick={handleDelete}

  disabled={
    loading ||
    !password.trim() ||
    confirmText.trim().toUpperCase() !== "DELETE"
  }

  className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"

>

  <Trash2 size={18} />

  {loading ? "Deleting..." : "Delete Account"}

</button>

          </div>

        </div>

      </div>

    </div>

  );

};

export default DeleteAccount;