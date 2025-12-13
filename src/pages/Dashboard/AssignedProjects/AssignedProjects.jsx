import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignedProjects = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: decorations = [], refetch } = useQuery({
    queryKey: ["decorations", user.email, "materials_prepared"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/decorations/decorator?decoratorEmail=${user.email}&workStatus=materials_prepared`
      );
      return res.data;
    },
  });

  const handleSetupStatusUpdate = (decoration, status) => {
    const statusInfo = { decorationStatus: status };

    let message = `Setup status is updated with ${status}`
    // .split('_').join(' ')
    axiosSecure
      .patch(`/decorations/${decoration._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div>
      <h2 className="text-3xl">
        Assigned Pending Projects : {decorations.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Confirm</th>
              <th>Other Actions</th>
            </tr>
          </thead>
          <tbody>
            {decorations.map((decoration, i) => (
              <tr key={decoration._id}>
                <th>{i + 1}</th>
                <td>{decoration.serviceName}</td>
                <td>
                  {decoration.decorationStatus === "materials_prepared" ? (
                    <>
                      <button
                        onClick={() => handleSetupStatusUpdate(decoration)}
                        className="btn btn-primary"
                      >
                        Accept
                      </button>
                      <button className="btn btn-warning ms-2">Reject</button>
                    </>
                  ) : (
                    <span className="">Accepted</span>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleSetupStatusUpdate(decoration, 'setup_in_progress')}
                    className="btn btn-primary"
                  >
                    Setup in Progress
                  </button>
                  <button
                    onClick={() => handleSetupStatusUpdate(decoration, 'setup_completed')}
                    className="btn btn-primary mx-2"
                  >
                    Setup completed
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

export default AssignedProjects;
