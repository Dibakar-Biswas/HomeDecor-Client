import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useDemoAccount from "../../../hooks/useDemoAccount";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const EarningSummer = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isDemoAccount } = useDemoAccount();

  const { data: decorations = [] } = useQuery({
    queryKey: ["decorations", user.email, "setup_completed"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/decorations/decorator?decoratorEmail=${user.email}&workStatus=setup_completed`
      );
      return res.data;
    },
  });

  const totalEarnings = decorations.reduce((sum, item) => {
    const earning = parseFloat(item.cost) * 0.6;
    return sum + earning;
  }, 0);

  const handleCashOut = () => {
    // ✅ Block demo accounts
    if (isDemoAccount) {
      toast.warning(
        "Demo accounts cannot cash out earnings. Please register for full access.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      return;
    }

    if (totalEarnings < 100) {
      Swal.fire(
        "Insufficient Balance",
        "You need at least 100 BDT to cash out.",
        "warning"
      );
      return;
    }

    Swal.fire({
      title: "Confirm Cashout?",
      text: `Withdraw ${totalEarnings.toFixed(2)} BDT to your account?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Withdraw!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success!", "Withdrawal request sent.", "success");
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
              You cannot cash out earnings with a demo account. This is for
              viewing purposes only.
            </div>
          </div>
        </div>
      )}

      {/* Earnings Summary Card */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-base-200 shadow-xl rounded-2xl p-6 mb-8 border border-base-300">
        <div className="stats shadow bg-primary text-primary-content w-auto">
          <div className="stat">
            <div className="stat-title text-white/90 font-semibold">
              Total Earnings
            </div>
            <div className="stat-value text-3xl font-extrabold">
              {totalEarnings.toFixed(2)} BDT
            </div>
            <div className="stat-desc text-white/80">
              From {decorations.length} completed project
              {decorations.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-0">
          <button
            onClick={handleCashOut}
            className={`btn btn-lg btn-warning shadow-lg px-8 text-white font-bold ${
              isDemoAccount || totalEarnings === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={isDemoAccount || totalEarnings === 0}
            title={
              isDemoAccount
                ? "Demo accounts cannot cash out"
                : totalEarnings === 0
                ? "No earnings to withdraw"
                : totalEarnings < 100
                ? "Minimum 100 BDT required"
                : "Withdraw earnings"
            }
          >
            {isDemoAccount ? "Demo - Cannot Cash Out" : "Cash Out"}
          </button>
        </div>
      </div>

      {/* Earnings Table */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow-lg border border-base-300">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr className="text-base-content">
              <th>#</th>
              <th>Service Name</th>
              <th>Total Cost</th>
              <th>My Earning (60%)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {decorations.length > 0 ? (
              decorations.map((decoration, index) => {
                const myEarning = (parseFloat(decoration.cost) * 0.6).toFixed(
                  2
                );

                return (
                  <tr
                    key={decoration._id}
                    className="hover:bg-base-200 transition-colors"
                  >
                    <th className="text-base-content/80">{index + 1}</th>
                    <td className="font-semibold text-base-content">
                      {decoration.serviceName}
                    </td>
                    <td className="text-base-content/80">
                      {decoration.cost} BDT
                    </td>
                    <td className="font-bold text-success">{myEarning} BDT</td>
                    <td className="text-base-content/80">
                      {new Date(decoration.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 text-base-content/70"
                >
                  <div className="flex flex-col items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-base-content/30"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-lg font-medium">
                      No completed projects yet
                    </p>
                    <p className="text-sm">
                      Complete projects to start earning!
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Earnings Info Card */}
      {decorations.length > 0 && (
        <div className="alert bg-base-200 border border-base-300 shadow-lg mt-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="font-semibold text-base-content">
              Minimum withdrawal: 100 BDT
            </p>
            <p className="text-sm text-base-content/70">
              You earn 60% commission on each completed project. The remaining
              40% goes to platform fees.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EarningSummer;
