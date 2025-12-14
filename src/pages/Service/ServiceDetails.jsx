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
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const BASE_URL = "https://home-decor-server.vercel.app";

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`${BASE_URL}/decorations/${id}`);
        const data = await res.json();
        setService(data);
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
      // 1. Save booking to database (You need to create this endpoint)
      const res = await axiosSecure.post("/bookings", bookingData);

      if (res.data.insertedId) {
        setIsModalOpen(false);
        // 2. Redirect to payment with the new booking ID or service ID
        navigate(`/dashboard/payment/${service._id}`);
      }
    } catch (error) {
      console.error("Booking Error:", error);
      Swal.fire("Error", "Failed to create booking", "error");
    }
  };

  if (loading) return <Loading />;
  if (!service) return <div>Service not found</div>;
  const isPaid = service.paymentStatus === "paid";

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure className="lg:w-1/2">
          <img
            src={service.image}
            alt={service.serviceName}
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="card-body lg:w-1/2">
          <h2 className="card-title text-3xl">{service.serviceName}</h2>
          <p className="py-4 text-gray-600">{service.description}</p>

          <div className="divider"></div>

          <div className="space-y-2">
            <p>
              <strong>Category:</strong> {service.category}
            </p>
            <p>
              <strong>Price:</strong>{" "}
              <span className="text-xl font-bold text-pink-600">
                {service.cost} BDT
              </span>
            </p>
            <p>
              <strong>Provider Email:</strong> {service.adminEmail}
            </p>
          </div>

          <div className="card-actions justify-end mt-6">
            {isPaid ? (
              <span className="text-2xl font-bold text-green-600 border border-green-600 px-4 py-2 rounded">
                Already Booked
              </span>
            ) : (
              <button
                className="btn btn-primary w-full"
                onClick={handleBookClick}
              >
                Book Now
              </button>
            )}
          </div>
        </div>
      </div>

      {/* --- Booking Modal --- */}
      {isModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box w-11/12 max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Confirm Booking</h3>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              {/* Read-only User Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">Name</label>
                  <input
                    type="text"
                    value={user?.displayName}
                    readOnly
                    className="input input-bordered bg-gray-100"
                  />
                </div>
                <div className="form-control">
                  <label className="label">Email</label>
                  <input
                    type="text"
                    value={user?.email}
                    readOnly
                    className="input input-bordered bg-gray-100"
                  />
                </div>
              </div>

              {/* Read-only Service Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">Service Name</label>
                  <input
                    type="text"
                    value={service.serviceName}
                    readOnly
                    className="input input-bordered bg-gray-100"
                  />
                </div>
                <div className="form-control">
                  <label className="label">Price (BDT)</label>
                  <input
                    type="text"
                    value={service.cost}
                    readOnly
                    className="input input-bordered bg-gray-100"
                  />
                </div>
              </div>

              {/* User Input Fields */}
              <div className="form-control">
                <label className="label">Booking Date</label>
                <input
                  type="date"
                  name="bookingDate"
                  required
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">Address</label>
                <textarea
                  name="address"
                  required
                  placeholder="Enter event location..."
                  className="textarea textarea-bordered h-24"
                ></textarea>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Book Service
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
