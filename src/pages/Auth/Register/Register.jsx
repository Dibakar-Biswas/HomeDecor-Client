import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched", 
  });
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegistration = async (data) => {
    setIsLoading(true);
    const profileImg = data.photo[0];

    try {
      await registerUser(data.email, data.password);

      const formData = new FormData();
      formData.append("image", profileImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      const imageRes = await axios.post(image_API_URL, formData);
      const photoURL = imageRes.data.data.url;

      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL: photoURL,
      };

      const dbRes = await axiosSecure.post("/users", userInfo);

      if (dbRes.data.insertedId) {
        console.log("user created in the database");
      }

      const userProfile = {
        displayName: data.name,
        photoURL: photoURL,
      };

      await updateUserProfile(userProfile);

      toast.success("Registration successful! Welcome aboard!", {
        position: "top-right",
        autoClose: 3000,
      });

      navigate(location?.state || "/");
    } catch (error) {
      console.error(error);
      const errorMessage = error.message || "Registration failed. Please try again.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card bg-base-200 w-full mx-auto max-w-sm shrink-0 shadow-2xl border border-base-300">
      <h3 className="text-3xl text-center pt-6 font-bold text-base-content">
        Welcome to <span className='text-pink-600 ml-1'>Style</span>Decor
      </h3>
      <p className="text-center text-base-content/70">Please Register</p>
      <div className="card-body">
        <form onSubmit={handleSubmit(handleRegistration)}>
          <fieldset className="fieldset" disabled={isLoading}>
            {/* Name Field */}
            <label className="label">
              <span className="label-text text-base-content font-semibold">Name</span>
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 4,
                  message: "Name must be at least 4 characters long",
                },
              })}
              className="input input-bordered w-full bg-base-100 text-base-content"
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="text-error text-sm mt-1">{errors.name.message}</p>
            )}

            {/* Photo Image Field */}
            <label className="label mt-2">
              <span className="label-text text-base-content font-semibold">Photo</span>
            </label>
            <input
              type="file"
              {...register("photo", {
                required: "Photo is required",
                validate: {
                  fileType: (files) => {
                    const file = files[0];
                    if (!file) return true;
                    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
                    return (
                      allowedTypes.includes(file.type) ||
                      "Only JPG, JPEG, and PNG files are allowed"
                    );
                  },
                  fileSize: (files) => {
                    const file = files[0];
                    if (!file) return true;
                    return (
                      file.size <= 5000000 || "File size must be less than 5MB"
                    );
                  },
                },
              })}
              className="file-input file-input-bordered w-full bg-base-100 text-base-content"
              accept="image/jpeg,image/png,image/jpg"
            />
            {errors.photo && (
              <p className="text-error text-sm mt-1">{errors.photo.message}</p>
            )}

            {/* Email Field */}
            <label className="label mt-2">
              <span className="label-text text-base-content font-semibold">Email</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              })}
              className="input input-bordered w-full bg-base-100 text-base-content"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email.message}</p>
            )}

            {/* Password with Toggle */}
            <label className="label mt-2">
              <span className="label-text text-base-content font-semibold">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                  },
                })}
                className="input input-bordered w-full bg-base-100 text-base-content pr-12"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="h-5 w-5" />
                ) : (
                  <AiOutlineEye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-error text-sm mt-1">{errors.password.message}</p>
            )}

            <div className="mt-2">
              <a className="link link-hover text-base-content/70 text-sm">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-4 w-full text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>
          </fieldset>
          <p className="mt-4 text-center text-base-content/80">
            Already have an account?{" "}
            <Link
              state={location.state}
              className="text-primary font-semibold underline"
              to="/login"
            >
              Login
            </Link>
          </p>
        </form>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
