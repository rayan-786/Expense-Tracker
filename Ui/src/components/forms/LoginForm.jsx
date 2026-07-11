import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { toast } from "react-hot-toast";

import useAuth from "../../hooks/useAuth";

const LoginForm = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

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

        error.message ||

        "Invalid email or password."

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

        <button

          type="button"

          className="text-sm font-medium text-blue-600 hover:underline"

        >

          Forgot Password?

        </button>

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