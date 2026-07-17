import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { toast } from "react-hot-toast";

import useAuth from "../../hooks/useAuth";

const LoginForm = () => {

  const navigate = useNavigate();

  const { login } = useAuth();
  const handleGithubLogin = () => {
  window.location.href =
  `${import.meta.env.VITE_API_URL}/auth/github`;
};

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const {

    register,

    handleSubmit,

    formState: { errors }

  } = useForm({

    defaultValues: {

      email: "",

      password: ""

    }

  });

  /* =========================================================
     SUBMIT
  ========================================================= */

  const onSubmit = async (data) => {

    try {

      setLoading(true);

      const response = await login(data);

      toast.success(

        response.message || "Login Successful"

      );

      navigate("/dashboard", {

        replace: true

      });

    }

    catch (error) {

  toast.error(

    error.response?.data?.message ||

    "Invalid Email or Password"

  );

}

    finally {

      setLoading(false);

    }

  };

  return (

    <form

      onSubmit={handleSubmit(onSubmit)}

      className="space-y-6"

    >

      {/* ================= EMAIL ================= */}

      <div>

        <label className="mb-2 block text-sm font-medium text-gray-700">

          Email Address

        </label>

        <div className="relative">

          <Mail

            size={18}

            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"

          />

          <input

            type="email"

            placeholder="Enter your email"

            className={`

              w-full

              rounded-xl

              border

              py-3

              pl-11

              pr-4

              outline-none

              transition

              focus:border-blue-600

              ${errors.email

                ? "border-red-500"

                : "border-gray-300"}

            `}

            {...register("email", {

              required: "Email is required",

              pattern: {

                value:

                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

                message: "Invalid email"

              }

            })}

          />

        </div>

        {errors.email && (

          <p className="mt-1 text-sm text-red-500">

            {errors.email.message}

          </p>

        )}

      </div>

      {/* ================= PASSWORD ================= */}

      <div>

        <label className="mb-2 block text-sm font-medium text-gray-700">

          Password

        </label>

        <div className="relative">

          <Lock

            size={18}

            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"

          />

          <input

            type={

              showPassword

                ? "text"

                : "password"

            }

            placeholder="Enter password"

            className={`

              w-full

              rounded-xl

              border

              py-3

              pl-11

              pr-12

              outline-none

              transition

              focus:border-blue-600

              ${errors.password

                ? "border-red-500"

                : "border-gray-300"}

            `}

            {...register("password", {

              required:

                "Password is required",

              minLength: {

                value: 6,

                message:

                  "Minimum 6 characters"

              }

            })}

          />

          <button

            type="button"

            onClick={() =>

              setShowPassword(

                !showPassword

              )

            }

            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"

          >

            {showPassword ? (

              <EyeOff size={18} />

            ) : (

              <Eye size={18} />

            )}

          </button>

        </div>

        {errors.password && (

          <p className="mt-1 text-sm text-red-500">

            {errors.password.message}

          </p>

        )}

      </div>

      {/* ================= REMEMBER ================= */}

      <div className="flex items-center justify-between">

        <label className="flex items-center gap-2 text-sm text-gray-600">

          <input

            type="checkbox"

            className="rounded border-gray-300"

          />

          Remember Me

        </label>

        <Link
  to="/forgot-password"
  className="text-sm font-medium text-blue-600 hover:underline"
>
  Forgot Password?
</Link>

      </div>

      {/* ================= BUTTON ================= */}

      <button

        disabled={loading}

        className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"

      >

        {loading ? (

          <>

            <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>

            Signing In...

          </>

        ) : (

          "Sign In"

        )}
        

      </button>
      {/* ================= GITHUB LOGIN ================= */}

<div className="relative my-6">

  <div className="absolute inset-0 flex items-center">
    <div className="w-full border-t border-gray-200"></div>
  </div>

  <div className="relative flex justify-center">
    <span className="bg-white px-4 text-sm text-gray-500">
      OR CONTINUE WITH
    </span>
  </div>

</div>

<button
  type="button"
  onClick={handleGithubLogin}
  className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-3 font-semibold text-gray-700 transition hover:bg-gray-50 hover:shadow-sm"
>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="currentColor"
  >
    <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.93c.58.1.79-.25.79-.56v-2.18c-3.2.7-3.88-1.36-3.88-1.36-.53-1.33-1.29-1.69-1.29-1.69-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.72-1.56-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.2-3.09-.12-.3-.52-1.5.11-3.12 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.62.23 2.82.11 3.12.75.81 1.2 1.83 1.2 3.09 0 4.41-2.7 5.39-5.27 5.67.42.37.79 1.09.79 2.21v3.28c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/>
  </svg>

  Continue with GitHub

</button>
      

      {/* ================= REGISTER ================= */}

      <p className="text-center text-sm text-gray-600">

        Don't have an account?{" "}

        <Link

          to="/register"

          className="font-semibold text-blue-600 hover:underline"

        >

          Register

        </Link>

      </p>

    </form>

  );

};

export default LoginForm;