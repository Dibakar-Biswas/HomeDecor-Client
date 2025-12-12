import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AssignDecorator = () => {
  const axiosSecure = useAxiosSecure();
  const { data: decorations = [] } = useQuery({
    queryKey: ["decorations", "assigned-decorator"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/decorations?decorationStatus=assigned-decorator"
      );
      return res.data;
    },
  });
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
            {
                decorations.map((decoration, index) => <tr key={decoration._id}>
              <th>{index + 1}</th>
              <td>{decoration.serviceName}</td>
              <td>{decoration.cost}</td>
              <td>{decoration.createdAt}</td>
              <td>
                <button className="btn btn-primary">Assign Decorator</button>
              </td>
            </tr>)
            }
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignDecorator;
