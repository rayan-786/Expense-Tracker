import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import {

  User,

  Mail,

  Lock,

  Eye,

  EyeOff

} from "lucide-react";

import { toast } from "react-hot-toast";

import {

  register as registerUser

} from "../../services/auth.service";

const RegisterForm = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {

    register,

    handleSubmit,

    watch,

    formState: {

      errors

    }

  } = useForm({

    defaultValues: {

      name: "",

      email: "",

      password: "",

      confirmPassword: ""

    }

  });

  const password = watch("password");

  /* =========================================================
     SUBMIT
  ========================================================= */

  const onSubmit = async (data) => {

    try {

      setLoading(true);

      const payload = {

        name: data.name,

        email: data.email,

        password: data.password

      };

      const response = await registerUser(payload);

      toast.success(

        response.message ||

        "Registration Successful"

      );

      navigate("/login");

    }

    catch (error) {

      toast.error(

        error.response?.data?.message ||

        error.message ||

        "Registration failed"

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <form

      onSubmit={handleSubmit(onSubmit)}

      className="space-y-5"

    >

      {/* =====================================================
          FULL NAME
      ===================================================== */}

      <div>

        <label className="mb-2 block text-sm font-medium text-gray-700">

          Full Name

        </label>

        <div className="relative">

          <User

            size={18}

            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"

          />

          <input

            type="text"

            placeholder="Enter full name"

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

              ${errors.name

                ? "border-red-500"

                : "border-gray-300"}

            `}

            {...register("name", {

              required: "Full name is required",

              minLength: {

                value: 3,

                message:

                  "Minimum 3 characters"

              }

            })}

          />

        </div>

        {errors.name && (

          <p className="mt-1 text-sm text-red-500">

            {errors.name.message}

          </p>

        )}

      </div>

      {/* =====================================================
          EMAIL
      ===================================================== */}

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

                message:

                  "Invalid email address"

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

            {/* =====================================================
          PASSWORD
      ===================================================== */}

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

            type={showPassword ? "text" : "password"}

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

              required: "Password is required",

              minLength: {

                value: 6,

                message: "Minimum 6 characters"

              }

            })}

          />

          <button

            type="button"

            onClick={() =>

              setShowPassword(!showPassword)

            }

            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"

          >

            {showPassword

              ? <EyeOff size={18} />

              : <Eye size={18} />}

          </button>

        </div>

        {errors.password && (

          <p className="mt-1 text-sm text-red-500">

            {errors.password.message}

          </p>

        )}

      </div>

      {/* =====================================================
          CONFIRM PASSWORD
      ===================================================== */}

      <div>

        <label className="mb-2 block text-sm font-medium text-gray-700">

          Confirm Password

        </label>

        <div className="relative">

          <Lock
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input

            type={

              showConfirmPassword

                ? "text"

                : "password"

            }

            placeholder="Confirm password"

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

              ${errors.confirmPassword

                ? "border-red-500"

                : "border-gray-300"}

            `}

            {...register(

              "confirmPassword",

              {

                required:

                  "Confirm Password is required",

                validate: (value) =>

                  value === password ||

                  "Passwords do not match"

              }

            )}

          />

          <button

            type="button"

            onClick={() =>

              setShowConfirmPassword(

                !showConfirmPassword

              )

            }

            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"

          >

            {showConfirmPassword

              ? <EyeOff size={18} />

              : <Eye size={18} />}

          </button>

        </div>

        {errors.confirmPassword && (

          <p className="mt-1 text-sm text-red-500">

            {errors.confirmPassword.message}

          </p>

        )}

      </div>

      {/* =====================================================
          REGISTER BUTTON
      ===================================================== */}

      <button

        type="submit"

        disabled={loading}

        className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"

      >

        {loading ? (

          <>

            <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>

            Creating Account...

          </>

        ) : (

          "Create Account"

        )}

      </button>

      {/* =====================================================
          LOGIN LINK
      ===================================================== */}

      <p className="text-center text-sm text-gray-600">

        Already have an account?{" "}

        <Link

          to="/login"

          className="font-semibold text-blue-600 hover:underline"

        >

          Sign In

        </Link>

      </p>

    </form>

  );

};

export default RegisterForm;