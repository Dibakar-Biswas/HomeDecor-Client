// import React from "react";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import { FaUserShield } from "react-icons/fa";
// import { FiShieldOff } from "react-icons/fi";
// import Swal from "sweetalert2";

// const UsersManagement = () => {
//   const axiosSecure = useAxiosSecure();

//   const { refetch,data: users = [] } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users`);
//       return res.data;
//     },
//   });

//   const handleMakeAdmin = (user) => {
//     const roleInfo = { role: "admin" };
//     axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
//     .then((res) => {
//         console.log(res.data);
//       if (res.data.modifiedCount) {
//         refetch();
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: `${user.displayName} marked as an Admin`,
//           showConfirmButton: false,
//           timer: 2000,
//         });
//       }
//     });
//   };

//   const handleRemoveAdmin = user => {
//     const roleInfo = { role: "user" };
//     axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
//     .then((res) => {
//       if (res.data.modifiedCount){
//         refetch();
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: `${user.displayName} removed from Admin`,
//           showConfirmButton: false,
//           timer: 2000,
//         });
//       }
//     })
//   }

//   return (
//     <div>
//       <h2 className="text-4xl text-primary font-bold text-center">
//         Manage Users: {users.length}
//       </h2>
//       <div className="overflow-x-auto">
//         <table className="table">
//           {/* head */}
//           <thead>
//             <tr>
//               <th>Sl. No</th>
//               <th>User</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Admin Actions</th>
//               {/* <th>Other Actions</th> */}
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user, index) => (
//               <tr key={user._id}>
//                 <td>{index + 1}</td>

//                 <td>
//                   <div className="flex items-center gap-3">
//                     <div className="avatar">
//                       <div className="mask mask-squircle h-12 w-12">
//                         <img
//                           src={user.photoURL}
//                           alt="Avatar Tailwind CSS Component"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <div className="font-bold">{user.displayName}</div>
//                       {/* <div className="text-sm opacity-50">United States</div> */}
//                     </div>
//                   </div>
//                 </td>

//                 <td>{user.email}</td>
//                 <td>{user.role}</td>
//                 <td>
//                   {user.role === "admin" ? (
//                     <button 
//                     onClick={() => handleRemoveAdmin(user)}
//                     className="btn bg-red-400">
//                       <FiShieldOff></FiShieldOff>
//                     </button>
//                   ) : (
//                     <button 
//                     onClick={() => handleMakeAdmin(user)}
//                     className="btn bg-fuchsia-400">
//                       <FaUserShield></FaUserShield>
//                     </button>
//                   )}
//                 </td>
//                 {/* <th>Actions</th> */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UsersManagement;


import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useDemoAccount from "../../../hooks/useDemoAccount";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { isDemoAccount } = useDemoAccount();

  const {
    refetch,
    data: users = [],
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    // ✅ Block demo accounts
    if (isDemoAccount) {
      toast.warning(
        "Demo accounts cannot change user roles. Please register for full access.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      return;
    }

    const roleInfo = { role: "admin" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} marked as an Admin`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    // ✅ Block demo accounts
    if (isDemoAccount) {
      toast.warning(
        "Demo accounts cannot change user roles. Please register for full access.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      return;
    }

    const roleInfo = { role: "user" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} removed from Admin`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div className="p-6">
      {/* Demo Account Warning Banner */}
      {isDemoAccount && (
        <div className="alert alert-warning mb-6 shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div>
            <h3 className="font-bold">Demo Account - Read Only Mode</h3>
            <div className="text-xs">
              You cannot modify user roles with a demo account. All management
              features are disabled.
            </div>
          </div>
        </div>
      )}

      <h2 className="text-4xl text-primary font-bold text-center mb-6">
        Manage Users: {users.length}
      </h2>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow-lg border border-base-300">
        <table className="table">
          {/* head */}
          <thead className="bg-base-200">
            <tr className="text-base-content">
              <th>Sl. No</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-base-200 transition-colors">
                <td className="text-base-content/80">{index + 1}</td>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12 ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={user.photoURL}
                          alt={user.displayName}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-base-content">
                        {user.displayName}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="text-base-content/80">{user.email}</td>
                <td>
                  <span
                    className={`badge ${
                      user.role === "admin"
                        ? "badge-primary"
                        : "badge-ghost"
                    } badge-sm`}
                  >
                    {user.role || "user"}
                  </span>
                </td>
                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      disabled={isDemoAccount}
                      className={`btn btn-error btn-sm text-white ${
                        isDemoAccount ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      title={
                        isDemoAccount
                          ? "Demo accounts cannot modify roles"
                          : "Remove Admin Role"
                      }
                    >
                      <FiShieldOff />
                      {!isDemoAccount && "Remove Admin"}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      disabled={isDemoAccount}
                      className={`btn btn-primary btn-sm text-white ${
                        isDemoAccount ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      title={
                        isDemoAccount
                          ? "Demo accounts cannot modify roles"
                          : "Make Admin"
                      }
                    >
                      <FaUserShield />
                      {!isDemoAccount && "Make Admin"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {users.length === 0 && (
        <div className="text-center py-10 text-base-content/70">
          <p className="text-lg">No users found.</p>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;
