import { useEffect, useState } from "react";
import { User, Mail, Crown, Pencil } from "lucide-react";
import useAuth from "../hooks/useAuth";
import api from "../api/axios";
import { toast } from "react-hot-toast";

const Profile = () => {
 const { user, setUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.name || "");
    }
  }, [user]);

  const handleCancel = () => {
    setUsername(user?.name || "");
    setIsEditing(false);
  };

  const handleSave = async () => {

  try {

    const { data } = await api.put("/auth/profile", {

      username

    });

    setUser(data.user);

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    toast.success(data.message);

    setIsEditing(false);

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Something went wrong"
    );

  }

};

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-gray-900">
          Profile
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your account information.
        </p>

      </div>

      {/* Layout */}

      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">

        {/* Left Card */}

        <div className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

          <div className="flex flex-1 flex-col items-center justify-center">

            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-blue-600 text-5xl font-bold text-white shadow-md">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <h2 className="mt-5 text-3xl font-bold text-gray-900">
              {username}
            </h2>

            <p className="mt-2 text-gray-500">
              {user?.email}
            </p>

            <span className="mt-4 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              🟢 Free Plan
            </span>

          </div>

        </div>

        {/* Right Card */}

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm lg:col-span-2">

          <div className="mb-8 flex items-center justify-between">

            <h2 className="text-2xl font-bold text-gray-900">
              Personal Information
            </h2>

            {!isEditing ? (

              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
              >
                <Pencil size={18} />
                Edit Profile
              </button>

            ) : (

              <div className="flex gap-3">

                <button
                  onClick={handleCancel}
                  className="rounded-xl border border-gray-300 px-5 py-3 font-medium hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
                >
                  Save Changes
                </button>

              </div>

            )}

          </div>

          <div className="space-y-8">

            {/* Username */}

            <div>

              <div className="mb-2 flex items-center gap-2 text-gray-500">

                <User size={18} />

                <span>Username</span>

              </div>

              {isEditing ? (

                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                />

              ) : (

                <p className="text-xl font-semibold text-gray-900">
                  {username}
                </p>

              )}

            </div>

            {/* Email */}

            <div>

              <div className="mb-2 flex items-center gap-2 text-gray-500">

                <Mail size={18} />

                <span>Email</span>

              </div>

              <p className="text-xl font-semibold text-gray-900">
                {user?.email}
              </p>

            </div>

            {/* Plan */}

            <div>

              <div className="mb-2 flex items-center gap-2 text-gray-500">

                <Crown size={18} />

                <span>Current Plan</span>

              </div>

              <p className="text-xl font-semibold text-green-600">
                Free Plan
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;