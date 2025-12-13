import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

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

  return (
    <div>
      <h2 className="text-3xl font-bold text-center my-6">My Earnings</h2>
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
