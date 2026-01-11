import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [service, setService] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const BASE_URL = "https://home-decor-server.vercel.app";

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`${BASE_URL}/decorations/${id}`);
        const data = await res.json();
        setService(data);

        // Fetch all decorations to filter related ones
        const allRes = await fetch(`${BASE_URL}/decorations`);
        const allData = await allRes.json();

        // Filter related services: same category, exclude current, max 3 items
        const related = allData
          .filter(
            (item) =>
              item.category === data.category &&
              item._id !== data._id &&
              item.paymentStatus !== "paid"
          )
          .slice(0, 3);

        setRelatedServices(related);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchService();
  }, [id, BASE_URL]);

  const handleBookClick = () => {
    if (!user) {
      Swal.fire({
        title: "Please Login",
        text: "You need to login to book a service.",
        icon: "warning",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) navigate("/login");
      });
      return;
    }
    setIsModalOpen(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const bookingDate = form.bookingDate.value;
    const address = form.address.value;

    const bookingData = {
      userName: user.displayName,
      userEmail: user.email,
      serviceId: service._id,
      serviceName: service.serviceName,
      price: service.cost,
      providerEmail: service.adminEmail,
      bookingDate,
      address,
      status: "pending_payment",
    };

    try {
      const res = await axiosSecure.post("/bookings", bookingData);

      if (res.data.insertedId) {
        setIsModalOpen(false);
        navigate(`/dashboard/payment/${service._id}`);
      }
    } catch (error) {
      console.error("Booking Error:", error);
      Swal.fire("Error", "Failed to create booking", "error");
    }
  };

  if (loading) return <Loading />;
  if (!service)
    return (
      <div className="text-center p-10 text-base-content">
        Service not found
      </div>
    );

  const isPaid = service.paymentStatus === "paid";

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto">
      {/* Main Service Card */}
      <div className="card lg:card-side bg-base-100 shadow-xl border border-base-300">
        <figure className="lg:w-1/2">
          <img
            src={service.image}
            alt={service.serviceName}
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="card-body lg:w-1/2">
          <div className="badge badge-primary badge-outline mb-2">
            {service.category}
          </div>
          <h2 className="card-title text-3xl text-base-content">
            {service.serviceName}
          </h2>
          <p className="py-4 text-base-content/80">{service.description}</p>

          <div className="divider"></div>

          <div className="space-y-2">
            <p className="text-base-content/80">
              <strong className="text-base-content">Category:</strong>{" "}
              {service.category}
            </p>
            <p className="text-base-content/80">
              <strong className="text-base-content">Unit:</strong>{" "}
              {service.unit} per sq-ft
            </p>
            <p>
              <strong className="text-base-content">Price:</strong>{" "}
              <span className="text-2xl font-bold text-primary">
                {service.cost} BDT
              </span>
            </p>
            <p className="text-base-content/70 text-sm">
              <strong className="text-base-content">Provider:</strong>{" "}
              {service.adminEmail}
            </p>
          </div>

          <div className="card-actions justify-end mt-6">
            {isPaid ? (
              <span className="badge badge-success badge-lg gap-2 py-4 px-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Already Booked
              </span>
            ) : (
              <button
                className="btn btn-primary w-full text-white"
                onClick={handleBookClick}
              >
                Book Now
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Related Services Section */}
      {relatedServices.length > 0 && (
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-3xl font-bold text-base-content">
                Similar Services
              </h3>
              <p className="text-base-content/70 mt-2">
                More {service.category} decoration services you might like
              </p>
            </div>
            <button
              onClick={() => navigate("/service")}
              className="btn btn-outline btn-primary btn-sm"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedServices.map((item) => (
              <div
                key={item._id}
                className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <figure className="h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.serviceName}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="card-title text-lg text-base-content">
                      {item.serviceName}
                    </h3>
                    <div className="badge badge-primary badge-sm badge-outline">
                      {item.category}
                    </div>
                  </div>
                  <p className="text-base-content/70 text-sm line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-primary">
                      {item.cost} BDT
                    </span>
                    <span className="text-xs text-base-content/50">
                      {item.unit}/sq-ft
                    </span>
                  </div>
                  <div className="card-actions mt-4">
                    <button
                      className="btn btn-outline btn-primary btn-sm flex-1"
                      onClick={() => navigate(`/service/${item._id}`)}
                    >
                      View Details
                    </button>
                    <button
                      className="btn btn-primary btn-sm flex-1 text-white"
                      onClick={() => {
                        navigate(`/service/${item._id}`);
                        window.scrollTo(0, 0);
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- Booking Modal --- */}
      {isModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box w-11/12 max-w-2xl bg-base-200 border border-base-300">
            <h3 className="font-bold text-2xl mb-6 text-base-content">
              Confirm Booking
            </h3>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              {/* Read-only User Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content font-semibold">
                      Name
                    </span>
                  </label>
                  <input
                    type="text"
                    value={user?.displayName}
                    readOnly
                    className="input input-bordered bg-base-300 text-base-content cursor-not-allowed"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content font-semibold">
                      Email
                    </span>
                  </label>
                  <input
                    type="text"
                    value={user?.email}
                    readOnly
                    className="input input-bordered bg-base-300 text-base-content cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Read-only Service Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content font-semibold">
                      Service Name
                    </span>
                  </label>
                  <input
                    type="text"
                    value={service.serviceName}
                    readOnly
                    className="input input-bordered bg-base-300 text-base-content cursor-not-allowed"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content font-semibold">
                      Price (BDT)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={service.cost}
                    readOnly
                    className="input input-bordered bg-base-300 text-base-content cursor-not-allowed"
                  />
                </div>
              </div>

              {/* User Input Fields */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content font-semibold">
                    Booking Date
                  </span>
                </label>
                <input
                  type="date"
                  name="bookingDate"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className="input input-bordered bg-base-100 text-base-content"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content font-semibold">
                    Event Location Address
                  </span>
                </label>
                <textarea
                  name="address"
                  required
                  placeholder="Enter complete event location address..."
                  className="textarea textarea-bordered h-24 bg-base-100 text-base-content"
                ></textarea>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary text-white">
                  Proceed to Payment
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setIsModalOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default ServiceDetails;
