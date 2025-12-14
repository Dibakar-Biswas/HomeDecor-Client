import React from "react";
import { Link, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading";
import useAuth from "../../../hooks/useAuth";

const Payment = () => {
  const { decorationId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { isLoading, data: decoration } = useQuery({
    queryKey: ["decorations", decorationId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/decorations/${decorationId}`);
      return res.data;
    },
  });

  //   const handlePayment = async () => {
  //     const paymentInfo = {
  //       cost: decoration.cost,
  //       decorationId: decoration._id,
  //       adminEmail: decoration.adminEmail,
  //       serviceName: decoration.serviceName,
  //     };

  //     const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

  //     console.log(res.data);
  //     window.location.href = res.data.url;
  //   };

  const handlePayment = async (decoration) => {
    if (!user || !user.email) {
      alert("Please log in to pay");
      return;
    }

    const paymentInfo = {
      cost: decoration.cost,
      decorationId: decoration._id,
      adminEmail: decoration.adminEmail,
      serviceName: decoration.serviceName,
      customerEmail: user.email,
    };

    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );
    window.location.assign(res.data.url);
    // console.log(res.data.url);
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div>
      <h2 className="text-2xl">
        Please Pay {decoration.cost} Taka for {decoration.serviceName}
      </h2>
      {/* {decoration.paymentStatus === "paid" ? (
        <span className="text-pink-600">Paid</span>
      ) : (
        <button
          onClick={() => handlePayment(decoration)}
        
          className="btn btn-primary btn-sm"
        >
          Pay
        </button>
      )} */}

      {decoration.paymentStatus === "paid" ? (
      <span className="text-pink-600 font-bold">Paid</span>
    ) : (
      <div className="flex gap-2">
        {/* Pay Button */}
        <button
          onClick={() => handlePayment(decoration)}
          className="btn btn-primary btn-sm"
        >
          Pay
        </button>
        <button
          onClick={() => navigate(-1)} // 
          className="btn btn-warning btn-sm"
        >
          Cancel
        </button>
      </div>
    )}
    </div>
  );
};

export default Payment;
