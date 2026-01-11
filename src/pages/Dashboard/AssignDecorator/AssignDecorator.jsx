import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useDemoAccount from "../../../hooks/useDemoAccount";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AssignDecorator = () => {
  const [selectedDecoration, setSelectedDecoration] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { isDemoAccount } = useDemoAccount();
  const decoratorModalRef = useRef();

  const { data: decorations = [], refetch: decorationRefetch } = useQuery({
    queryKey: ["decorations", "assigned-decorator"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/decorations?decorationStatus=assigned-decorator"
      );
      return res.data;
    },
  });

  const { data: decorators = [] } = useQuery({
    queryKey: ["decorators", "available"],
    enabled: !!selectedDecoration,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/decorators?status=approved&workStatus=available`
      );
      return res.data;
    },
  });

  const openAssignDecoratorModal = (decoration) => {
    // ✅ Block demo accounts
    if (isDemoAccount) {
      toast.warning(
        "Demo accounts cannot assign decorators. Please register for full access.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      return;
    }

    setSelectedDecoration(decoration);
    decoratorModalRef.current.showModal();
  };

  const handleAssignDecorator = (decorator) => {
    // ✅ Block demo accounts
    if (isDemoAccount) {
      toast.warning(
        "Demo accounts cannot assign decorators. Please register for full access.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      return;
    }

    const decoratorAssignInfo = {
      decoratorId: decorator._id,
      decoratorEmail: decorator.decoratorEmail,
      decoratorName: decorator.decoratorName,
      decorationId: selectedDecoration._id,
    };
    axiosSecure
      .patch(`/decorations/${selectedDecoration._id}`, decoratorAssignInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          decoratorModalRef.current.close();
          decorationRefetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Decorator assigned and on the way`,
            showConfirmButton: false,
            timer: 1500,
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
              You cannot assign decorators with a demo account. All assignment
              features are disabled.
            </div>
          </div>
        </div>
      )}

      <div className="text-3xl font-bold text-primary text-center mb-6">
        Assign Decorator: {decorations.length}
      </div>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow-lg border border-base-300">
        <table className="table">
          {/* head */}
          <thead className="bg-base-200">
            <tr className="text-base-content">
              <th>#</th>
              <th>Service Name</th>
              <th>Cost (BDT)</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {decorations.length > 0 ? (
              decorations.map((decoration, index) => (
                <tr
                  key={decoration._id}
                  className="hover:bg-base-200 transition-colors"
                >
                  <th className="text-base-content/80">{index + 1}</th>
                  <td className="font-semibold text-base-content">
                    {decoration.serviceName}
                  </td>
                  <td className="text-base-content/80">{decoration.cost}</td>
                  <td className="text-base-content/80">
                    {new Date(decoration.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      onClick={() => openAssignDecoratorModal(decoration)}
                      disabled={isDemoAccount}
                      className={`btn btn-primary btn-sm text-white ${
                        isDemoAccount ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      title={
                        isDemoAccount
                          ? "Demo accounts cannot assign decorators"
                          : "Find Decorators"
                      }
                    >
                      {isDemoAccount ? "Demo - View Only" : "Find Decorators"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-8 text-base-content/70">
                  No decorations pending assignment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Decorator Assignment Modal */}
      <dialog
        ref={decoratorModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box bg-base-200 border border-base-300">
          <h3 className="font-bold text-2xl text-primary mb-4">
            Available Decorators: {decorators.length}
          </h3>

          {decorators.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead className="bg-base-300">
                  <tr className="text-base-content">
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {decorators.map((decorator, index) => (
                    <tr
                      key={decorator._id}
                      className="hover:bg-base-300 transition-colors"
                    >
                      <th className="text-base-content/80">{index + 1}</th>
                      <td className="font-semibold text-base-content">
                        {decorator.decoratorName}
                      </td>
                      <td className="text-base-content/80">
                        {decorator.decoratorEmail}
                      </td>
                      <td>
                        <button
                          onClick={() => handleAssignDecorator(decorator)}
                          disabled={isDemoAccount}
                          className={`btn btn-success btn-sm text-white ${
                            isDemoAccount ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                          title={
                            isDemoAccount
                              ? "Demo accounts cannot assign"
                              : "Assign this decorator"
                          }
                        >
                          {isDemoAccount ? "Demo" : "Assign"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-base-content/70">
              <p className="text-lg mb-2">No decorators available</p>
              <p className="text-sm">
                All decorators are currently assigned or unavailable.
              </p>
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-ghost">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignDecorator;
