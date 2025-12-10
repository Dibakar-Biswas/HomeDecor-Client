import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit, FaTrash } from "react-icons/fa";
import { PiMagnifyingGlassDuotone } from "react-icons/pi";
import Swal from "sweetalert2";

const MyDecorations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: decorations = [], refetch } = useQuery({
    queryKey: ["my-decorations", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/decorations?email=${user.email}`);
      return res.data;
    },
  });

  const handleDecorationDelete = (id) => {
    // console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/decorations/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your decoration has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl">All of my decorations: {decorations.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Service Name</th>
              <th>Cost</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {decorations.map((decoration, index) => (
              <tr key={decoration._id}>
                <th>{index + 1}</th>
                <td>{decoration.serviceName}</td>
                <td>{decoration.cost}</td>
                <td>Blue</td>
                <td>
                  <button className="btn btn-square hover:bg-primary">
                    <PiMagnifyingGlassDuotone></PiMagnifyingGlassDuotone>
                  </button>
                  <button className="btn btn-square hover:bg-primary mx-2">
                    <FaEdit></FaEdit>
                  </button>
                  <button
                    onClick={() => handleDecorationDelete(decoration._id)}
                    className="btn btn-square hover:bg-primary"
                  >
                    <FaTrash></FaTrash>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDecorations;
