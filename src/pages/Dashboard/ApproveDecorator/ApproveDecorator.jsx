import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useDemoAccount from "../../../hooks/useDemoAccount";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ApproveDecorator = () => {
  const axiosSecure = useAxiosSecure();
  const { isDemoAccount } = useDemoAccount();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { refetch, data: decorators = [] } = useQuery({
    queryKey: ["decorators", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorators");
      return res.data;
    },
  });

  const totalItems = decorators.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDecorators = decorators.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const updateDecoratorStatus = (decorator, status) => {
    // ✅ Block demo accounts
    if (isDemoAccount) {
      toast.warning(
        "Demo accounts cannot change decorator status. Please register for full access.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      return;
    }

    const emailToSend = decorator.decoratorEmail || decorator.email;
    const updatedInfo = { status: status, email: emailToSend };
    axiosSecure
      .patch(`/decorators/${decorator._id}`, updatedInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Decorator has been ${status}`,
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
    // ✅ Block demo accounts
    if (isDemoAccount) {
      toast.warning(
        "Demo accounts cannot delete decorators. Please register for full access.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      return;
    }

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
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Decorator has been deleted.",
              icon: "success",
            });
          }
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
              You cannot approve, reject, or delete decorators with a demo account.
              All management features are disabled.
            </div>
          </div>
        </div>
      )}

      <h2 className="text-3xl font-bold text-primary text-center mb-6">
        Decorator Pending Approval: {decorators.length}
      </h2>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow-lg border border-base-300">
        <table className="table">
          <thead className="bg-base-200">
            <tr className="text-base-content">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Work Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentDecorators.length > 0 ? (
              currentDecorators.map((decorator, index) => {
                const globalIndex = indexOfFirstItem + index + 1;

                return (
                  <tr
                    key={decorator._id}
                    className="hover:bg-base-200 transition-colors"
                  >
                    <th className="text-base-content/80">{globalIndex}</th>
                    <td className="font-semibold text-base-content">
                      {decorator.decoratorName}
                    </td>
                    <td className="text-base-content/80">
                      {decorator.decoratorEmail}
                    </td>
                    <td>
                      <span
                        className={`badge badge-sm ${
                          decorator.status === "approved"
                            ? "badge-success"
                            : decorator.status === "rejected"
                            ? "badge-error"
                            : "badge-warning"
                        }`}
                      >
                        {decorator.status}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-ghost badge-sm">
                        {decorator.workStatus}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApproval(decorator)}
                          disabled={isDemoAccount}
                          className={`btn btn-sm btn-success text-white ${
                            isDemoAccount ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                          title={
                            isDemoAccount
                              ? "Demo accounts cannot approve"
                              : "Approve Decorator"
                          }
                        >
                          <FaUserCheck />
                        </button>
                        <button
                          onClick={() => handleRejection(decorator)}
                          disabled={isDemoAccount}
                          className={`btn btn-sm btn-warning text-white ${
                            isDemoAccount ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                          title={
                            isDemoAccount
                              ? "Demo accounts cannot reject"
                              : "Reject Decorator"
                          }
                        >
                          <IoPersonRemoveSharp />
                        </button>
                        <button
                          onClick={() => handleDelete(decorator._id)}
                          disabled={isDemoAccount}
                          className={`btn btn-sm btn-error text-white ${
                            isDemoAccount ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                          title={
                            isDemoAccount
                              ? "Demo accounts cannot delete"
                              : "Delete Decorator"
                          }
                        >
                          <FaTrashCan />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-8 text-base-content/70">
                  No decorators pending approval.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 mb-8">
          <div className="join">
            <button
              className="join-item btn btn-sm"
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`join-item btn btn-sm ${
                  currentPage === i + 1 ? "btn-active btn-primary" : ""
                }`}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="join-item btn btn-sm"
              disabled={currentPage === totalPages}
              onClick={() => paginate(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApproveDecorator;
