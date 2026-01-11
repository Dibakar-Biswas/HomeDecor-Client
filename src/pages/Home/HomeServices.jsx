import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const HomeServices = () => {
  const [services, setServices] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/decorations")
      .then((res) => setServices(res.data.slice(0, 3)))
      .catch((err) => console.error(err));
  }, [axiosSecure]);

  return (
    <section className="py-12 px-6">
      <h2 className="text-3xl font-bold text-primary text-center mb-8">
        Our Premium Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service._id} className="card bg-base-100 shadow-xl">
            <figure className="h-48 overflow-hidden">
              <img
                src={service.image}
                alt={service.serviceName}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{service.serviceName}</h2>
              <p>
                Price:{" "}
                <span className="text-pink-600 font-bold">
                  {service.cost} BDT
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeServices;
