import React from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-4xl">Payment History {payments.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Paid Time</th>
              <th>Amount</th>
              <th>TransactionId</th>
            </tr>
          </thead>
          <tbody>
            {
                payments.map((payment, index) => <tr key={payment._id}>
              <th>{index + 1}</th>
              <td>{payment.paidAt}</td>
              <td className="flex items-center gap-1"><FaBangladeshiTakaSign></FaBangladeshiTakaSign> {payment.amount}</td>
              <td>{payment.transactionId}</td>
            </tr>)
            }
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
