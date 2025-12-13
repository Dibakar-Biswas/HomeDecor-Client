import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const EarningSummer = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: decorations = [] } = useQuery({
    queryKey: ["decorations", user.email, "setup_completed"], // 
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
    if(totalEarnings < 100) { 
        Swal.fire("Insufficient Balance", "You need at least 100 BDT to cash out.", "warning");
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
    <div>
      
      <div className="flex flex-col md:flex-row justify-between items-center bg-base-100 shadow-xl rounded-2xl p-6 mb-8 border border-base-200">
        
        <div className="stats shadow bg-primary text-primary-content w-auto">
          <div className="stat">
            <div className="stat-title text-white/80">Total Earnings</div>
            <div className="stat-value text-3xl font-extrabold">
              {totalEarnings.toFixed(2)} BDT
            </div>
            <div className="stat-desc text-white/70">
              From {decorations.length} completed projects
            </div>
          </div>
        </div>

       
        <div className="mt-4 md:mt-0">
          <button 
            onClick={handleCashOut}
            className="btn btn-lg btn-warning shadow-lg px-8"
            disabled={totalEarnings === 0}
          >
            CashOut
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Service Name</th>
              <th>Total Cost</th>
              <th>My Earning (60%)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {decorations.map((decoration, index) => {
              const myEarning = (parseInt(decoration.cost) * 0.6).toFixed(2);
              
              return (
                <tr key={decoration._id}>
                  <th>{index + 1}</th>
                  <td>{decoration.serviceName}</td>
                  <td>{decoration.cost} BDT</td>
                  <td className="font-bold text-green-600">{myEarning} BDT</td> 
                  <td>{new Date(decoration.createdAt).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EarningSummer;
