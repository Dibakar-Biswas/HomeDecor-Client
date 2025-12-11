import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const ApproveDecorator = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: decorators = [] } = useQuery({
    queryKey: ["decorators", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorators");
      return res.data;
    },
  });

  const updateDecoratorStatus = (decorator, status) => {
    const updatedInfo = { status: status, email: decorator.email };
    axiosSecure
      .patch(`/decorators/${decorator._id}`, updatedInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Decorator have been ${status}`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };

  const handleApproval = (decorator) => {
    updateDecoratorStatus(decorator, "approved");
  };

  const handleRejection = (decorator) => {
    updateDecoratorStatus(decorator, "rejected");
  };

  const handleDelete = (id) => {
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
        axiosSecure.delete(`/decorators/${id}`).then((res) => {
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
    <div className="px-6">
      <h2 className="text-3xl font-bold text-primary text-center">
        Decorator pending Approve : {decorators.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {decorators.map((decorator, index) => (
              <tr key={decorator._id}>
                <th>{index + 1}</th>
                <td>{decorator.decoratorName}</td>
                <td>{decorator.decoratorEmail}</td>
                <td>
                  {
                    <p
                      className={`${
                        decorator.status === "approved"
                          ? "text-green-700"
                          :
                           "text-red-500"

                      }`}
                    >
                      {decorator.status}
                      {/* {typeof decorator.status === 'object' ? decorator.status.status : decorator.status} */}
                    </p>
                  }
                </td>
                <td>
                  <button
                    onClick={() => handleApproval(decorator)}
                    className="btn"
                  >
                    <FaUserCheck></FaUserCheck>
                  </button>
                  <button
                    onClick={() => handleRejection(decorator)}
                    className="btn"
                  >
                    <IoPersonRemoveSharp></IoPersonRemoveSharp>
                  </button>
                  <button
                    onClick={() => handleDelete(decorator._id)}
                    className="btn"
                  >
                    <FaTrashCan></FaTrashCan>
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

export default ApproveDecorator;
