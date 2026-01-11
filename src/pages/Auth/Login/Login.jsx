// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import useAuth from "../../../hooks/useAuth";
// import { Link, useLocation, useNavigate } from "react-router";
// import SocialLogin from "../SocialLogin/SocialLogin";
// import { toast } from "react-toastify";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     mode: "onTouched", // Show errors after field is touched
//   });
//   const { signInUser } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = async (data) => {
//     setIsLoading(true);

//     try {
//       const result = await signInUser(data.email, data.password);
//       console.log(result.user);

//       toast.success("Login successful! Welcome back!", {
//         position: "top-right",
//         autoClose: 3000,
//       });

//       navigate(location?.state || "/");
//     } catch (error) {
//       console.error(error);
//       const errorMessage =
//         error.code === "auth/wrong-password" || error.code === "auth/user-not-found"
//           ? "Invalid email or password"
//           : error.message || "Login failed. Please try again.";

//       toast.error(errorMessage, {
//         position: "top-right",
//         autoClose: 4000,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="card bg-base-200 w-full mx-auto max-w-sm shrink-0 shadow-2xl border border-base-300">
//       <h3 className="text-3xl text-center pt-6 font-bold text-base-content">
//         Welcome Back
//       </h3>
//       <p className="text-center text-base-content/70">Please Login</p>
//       <div className="card-body">
//         <form onSubmit={handleSubmit(handleLogin)}>
//           <fieldset className="fieldset" disabled={isLoading}>
//             {/* Email field */}
//             <label className="label">
//               <span className="label-text text-base-content font-semibold">
//                 Email
//               </span>
//             </label>
//             <input
//               type="email"
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                   message: "Please enter a valid email address",
//                 },
//               })}
//               className="input input-bordered w-full bg-base-100 text-base-content"
//               placeholder="Email"
//             />
//             {errors.email && (
//               <p className="text-error text-sm mt-1">{errors.email.message}</p>
//             )}

//             {/* Password field with toggle */}
//             <label className="label mt-2">
//               <span className="label-text text-base-content font-semibold">
//                 Password
//               </span>
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: {
//                     value: 8,
//                     message: "Password must be at least 8 characters long",
//                   },
//                 })}
//                 className="input input-bordered w-full bg-base-100 text-base-content pr-12"
//                 placeholder="Password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content transition-colors"
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 {showPassword ? (
//                   <AiOutlineEyeInvisible className="h-5 w-5" />
//                 ) : (
//                   <AiOutlineEye className="h-5 w-5" />
//                 )}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="text-error text-sm mt-1">
//                 {errors.password.message}
//               </p>
//             )}

//             <div className="mt-2">
//               <a className="link link-hover text-base-content/70 text-sm">
//                 Forgot password?
//               </a>
//             </div>

//             <button
//               type="submit"
//               className="btn btn-primary mt-4 w-full text-white"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <span className="loading loading-spinner loading-sm"></span>
//                   Logging in...
//                 </>
//               ) : (
//                 "Login"
//               )}
//             </button>
//           </fieldset>
//           <p className="mt-4 text-center text-base-content/80">
//             New to HomeDecor?{" "}
//             <Link
//               state={location.state}
//               className="text-primary font-semibold underline"
//               to="/register"
//             >
//               Register
//             </Link>
//           </p>
//         </form>
//         <SocialLogin />
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import useAuth from "../../../hooks/useAuth";
// import { Link, useLocation, useNavigate } from "react-router";
// import SocialLogin from "../SocialLogin/SocialLogin";
// import { toast } from "react-toastify";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { FaUserCircle, FaUserShield, FaPaintBrush } from "react-icons/fa";

// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     mode: "onTouched",
//   });
//   const { signInUser } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   // Demo credentials
//   const demoAccounts = {
//     user: {
//       email: "iron@man.com",
//       password: "Iron@123",
//       role: "Regular User",
//     },
//     admin: {
//       email: "admin@gmail.com",
//       password: "Admin@123",
//       role: "Administrator",
//     },
//     decorator: {
//       email: "flash@speed.com",
//       password: "Flash@123",
//       role: "Decorator",
//     },
//   };

//   const handleDemoLogin = (accountType) => {
//     const account = demoAccounts[accountType];
//     setValue("email", account.email);
//     setValue("password", account.password);
    
//     toast.info(`Demo ${account.role} credentials loaded!`, {
//       position: "top-right",
//       autoClose: 2000,
//     });
//   };

//   const handleLogin = async (data) => {
//     setIsLoading(true);

//     try {
//       const result = await signInUser(data.email, data.password);
//       console.log(result.user);

//       toast.success("Login successful! Welcome back!", {
//         position: "top-right",
//         autoClose: 3000,
//       });

//       navigate(location?.state || "/");
//     } catch (error) {
//       console.error(error);
//       const errorMessage =
//         error.code === "auth/wrong-password" ||
//         error.code === "auth/user-not-found"
//           ? "Invalid email or password"
//           : error.message || "Login failed. Please try again.";

//       toast.error(errorMessage, {
//         position: "top-right",
//         autoClose: 4000,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center py-12 px-4">
//       <div className="card bg-base-200 w-full max-w-md shrink-0 shadow-2xl border border-base-300">
//         <h3 className="text-3xl text-center pt-6 font-bold text-base-content">
//           Welcome Back
//         </h3>
//         <p className="text-center text-base-content/70">Please Login</p>

//         {/* Demo Credentials Section */}
//         <div className="px-8 pt-6">
//           <div className="bg-info/10 border border-info/30 rounded-lg p-4 mb-4">
//             <p className="text-sm font-semibold text-base-content mb-3 flex items-center gap-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 text-info"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//               Try Demo Accounts
//             </p>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
//               <button
//                 type="button"
//                 onClick={() => handleDemoLogin("user")}
//                 className="btn btn-sm btn-outline btn-info gap-2"
//               >
//                 <FaUserCircle className="h-4 w-4" />
//                 User
//               </button>
//               <button
//                 type="button"
//                 onClick={() => handleDemoLogin("decorator")}
//                 className="btn btn-sm btn-outline btn-info gap-2"
//               >
//                 <FaPaintBrush className="h-4 w-4" />
//                 Decorator
//               </button>
//               <button
//                 type="button"
//                 onClick={() => handleDemoLogin("admin")}
//                 className="btn btn-sm btn-outline btn-info gap-2"
//               >
//                 <FaUserShield className="h-4 w-4" />
//                 Admin
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="card-body pt-4">
//           <form onSubmit={handleSubmit(handleLogin)}>
//             <fieldset className="fieldset" disabled={isLoading}>
//               {/* Email field */}
//               <label className="label">
//                 <span className="label-text text-base-content font-semibold">
//                   Email
//                 </span>
//               </label>
//               <input
//                 type="email"
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                     message: "Please enter a valid email address",
//                   },
//                 })}
//                 className="input input-bordered w-full bg-base-100 text-base-content"
//                 placeholder="Email"
//               />
//               {errors.email && (
//                 <p className="text-error text-sm mt-1">{errors.email.message}</p>
//               )}

//               {/* Password field with toggle */}
//               <label className="label mt-2">
//                 <span className="label-text text-base-content font-semibold">
//                   Password
//                 </span>
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   {...register("password", {
//                     required: "Password is required",
//                     minLength: {
//                       value: 8,
//                       message: "Password must be at least 8 characters long",
//                     },
//                   })}
//                   className="input input-bordered w-full bg-base-100 text-base-content pr-12"
//                   placeholder="Password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content transition-colors"
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? (
//                     <AiOutlineEyeInvisible className="h-5 w-5" />
//                   ) : (
//                     <AiOutlineEye className="h-5 w-5" />
//                   )}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="text-error text-sm mt-1">
//                   {errors.password.message}
//                 </p>
//               )}

//               <div className="mt-2">
//                 <a className="link link-hover text-base-content/70 text-sm">
//                   Forgot password?
//                 </a>
//               </div>

//               <button
//                 type="submit"
//                 className="btn btn-primary mt-4 w-full text-white"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <>
//                     <span className="loading loading-spinner loading-sm"></span>
//                     Logging in...
//                   </>
//                 ) : (
//                   "Login"
//                 )}
//               </button>
//             </fieldset>
//             <p className="mt-4 text-center text-base-content/80">
//               New to HomeDecor?{" "}
//               <Link
//                 state={location.state}
//                 className="text-primary font-semibold underline"
//                 to="/register"
//               >
//                 Register
//               </Link>
//             </p>
//           </form>
//           <SocialLogin />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaUserCircle, FaUserShield, FaPaintBrush } from "react-icons/fa";

const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Demo credentials
  const demoAccounts = {
    user: {
      email: "iron@man.com",
      password: "Iron@123",
      role: "Regular User",
    },
    admin: {
      email: "admin@gmail.com",
      password: "Admin@123",
      role: "Administrator",
    },
    decorator: {
      email: "flash@speed.com",
      password: "Flash@123",
      role: "Decorator",
    },
  };

  // Check if email is a demo account
  const isDemoEmail = (email) => {
    const demoEmails = ['iron@man.com', 'admin@gmail.com', 'flash@speed.com'];
    return demoEmails.includes(email.toLowerCase());
  };

  const handleDemoLogin = (accountType) => {
    const account = demoAccounts[accountType];
    setValue("email", account.email);
    setValue("password", account.password);
    
    toast.info(`Demo ${account.role} credentials loaded!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleLogin = async (data) => {
    setIsLoading(true);

    try {
      const result = await signInUser(data.email, data.password);
      console.log(result.user);

      // Set demo account flag in localStorage
      if (isDemoEmail(data.email)) {
        localStorage.setItem('isDemoAccount', 'true');
        toast.warning("You're logged in as a demo account. All modification features are disabled.", {
          position: "top-right",
          autoClose: 4000,
        });
      } else {
        localStorage.removeItem('isDemoAccount');
      }

      toast.success("Login successful! Welcome back!", {
        position: "top-right",
        autoClose: 3000,
      });

      navigate(location?.state || "/");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
          ? "Invalid email or password"
          : error.message || "Login failed. Please try again.";

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="card bg-base-200 w-full max-w-md shrink-0 shadow-2xl border border-base-300">
        <h3 className="text-3xl text-center pt-6 font-bold text-base-content">
          Welcome Back
        </h3>
        <p className="text-center text-base-content/70">Please Login</p>

        {/* Demo Credentials Section */}
        <div className="px-8 pt-6">
          <div className="bg-info/10 border border-info/30 rounded-lg p-4 mb-4">
            <p className="text-sm font-semibold text-base-content mb-3 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-info"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Try Demo Accounts (Read-Only)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin("user")}
                className="btn btn-sm btn-outline btn-info gap-2"
              >
                <FaUserCircle className="h-4 w-4" />
                User
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("decorator")}
                className="btn btn-sm btn-outline btn-info gap-2"
              >
                <FaPaintBrush className="h-4 w-4" />
                Decorator
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("admin")}
                className="btn btn-sm btn-outline btn-info gap-2"
              >
                <FaUserShield className="h-4 w-4" />
                Admin
              </button>
            </div>
          </div>
        </div>

        <div className="card-body pt-4">
          <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset" disabled={isLoading}>
              {/* Email field */}
              <label className="label">
                <span className="label-text text-base-content font-semibold">
                  Email
                </span>
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

              {/* Password field with toggle */}
              <label className="label mt-2">
                <span className="label-text text-base-content font-semibold">
                  Password
                </span>
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
                <p className="text-error text-sm mt-1">
                  {errors.password.message}
                </p>
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
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </fieldset>
            <p className="mt-4 text-center text-base-content/80">
              New to HomeDecor?{" "}
              <Link
                state={location.state}
                className="text-primary font-semibold underline"
                to="/register"
              >
                Register
              </Link>
            </p>
          </form>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
