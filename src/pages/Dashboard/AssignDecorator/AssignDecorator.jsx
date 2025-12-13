import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AssignDecorator = () => {
  const [selectedDecoration, setSelectedDecoration] = useState(null);
  const axiosSecure = useAxiosSecure();
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
    setSelectedDecoration(decoration);
    decoratorModalRef.current.showModal();
  };

  const handleAssignDecorator = (decorator) => {
    const decoratorAssignInfo = {
      decoratorId: decorator._id,
      decoratorEmail: decorator.decoratorEmail,
      decoratorName: decorator.decoratorName,
      decorationId: selectedDecoration._id,
      // trackingId: selectedDecoration.trackingId
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
    <div>
      <div className="text-3xl">Assign Decorator: {decorations.length} </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>Created At</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {decorations.map((decoration, index) => (
              <tr key={decoration._id}>
                <th>{index + 1}</th>
                <td>{decoration.serviceName}</td>
                <td>{decoration.cost}</td>
                <td>{decoration.createdAt}</td>
                <td>
                  <button
                    onClick={() => openAssignDecoratorModal(decoration)}
                    className="btn btn-primary"
                  >
                    Find Decorators
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog
        ref={decoratorModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Decorators: {decorators.length}</h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                </tr>
              </thead>
              <tbody>
                {decorators.map((decorator, index) => (
                  <tr key={decorator._id}>
                    <th>{index + 1}</th>
                    <td>{decorator.decoratorName}</td>
                    <td>{decorator.decoratorEmail}</td>
                    <td>
                      <button
                        onClick={() => handleAssignDecorator(decorator)}
                        className="btn btn-primary"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="modal-action">
            <form method="dialog">
              
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignDecorator;
