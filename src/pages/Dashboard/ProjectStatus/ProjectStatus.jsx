

import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ProjectStatus = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: decorations = [], isLoading } = useQuery({
    queryKey: ["decorations", user.email, "all-project-status"], 
    queryFn: async () => {
      
      const res = await axiosSecure.get(
        `/decorations/decorator?decoratorEmail=${user.email}` 
      );
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Project Status ({decorations.length})
      </h2>
      
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="table table-zebra w-full">
          
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Service Name</th>
              <th>Cost</th>
              <th>Date</th>
              <th>Current Status</th>
            </tr>
          </thead>
          
          
          <tbody>
            {decorations.map((decoration, index) => (
              <tr key={decoration._id}>
                <th>{index + 1}</th>
                <td className="font-semibold">{decoration.serviceName}</td>
                <td>{decoration.cost} BDT</td>
                <td>{new Date(decoration.createdAt).toLocaleDateString()}</td>
                <td>
                  
                  <span
                    className={`badge badge-lg border-0 text-white ${
                      decoration.decorationStatus === "setup_completed"
                        ? "bg-green-500" 
                        : decoration.decorationStatus === "materials_prepared"
                        ? "bg-blue-500"  
                        : "bg-yellow-500" 
                    }`}
                  >
                    
                    {decoration.decorationStatus
                      ? decoration.decorationStatus.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())
                      : "Assigned"}
                  </span>
                </td>
              </tr>
            ))}
            
           
            {decorations.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No projects assigned yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectStatus;
