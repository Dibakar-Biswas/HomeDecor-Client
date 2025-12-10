import React from "react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading";

const Payment = () => {
  const { decorationId } = useParams();
  const axiosSecure = useAxiosSecure();

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

  const handlePayment = async(decoration) => {
    const paymentInfo = {
      cost: decoration.cost,
      decorationId: decoration._id,
      adminEmail: decoration.adminEmail,
      serviceName: decoration.serviceName,
    }

    const res = await axiosSecure.post('/payment-checkout-session', paymentInfo)
    window.location.assign(res.data.url);
    // console.log(res.data.url);
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div>
      <h2 className="text-2xl">
        Please Pay {decoration.cost} Taka for {decoration.serviceName}
      </h2>
      {decoration.paymentStatus === "paid" ? (
        <span className="text-pink-600">Paid</span>
      ) : (
        <button
          onClick={() => handlePayment(decoration)}
          // onClick={handlePayment}
          className="btn btn-primary btn-sm"
        >
          Pay
        </button>
      )}
      {/* <button onClick={handlePayment} className="btn btn-primary">
        Pay
      </button> */}
    </div>
  );
};

export default Payment;
