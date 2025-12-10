import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading'; // Assuming you have this

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

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

  if (loading) return <Loading />;
  if (!service) return <div>Service not found</div>;
  const isPaid = service.paymentStatus === 'paid'; 

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure className="lg:w-1/2">
          <img src={service.image} alt={service.serviceName} className="w-full h-full object-cover"/>
        </figure>
        <div className="card-body lg:w-1/2">
          <h2 className="card-title text-3xl">{service.serviceName}</h2>
          <p className="py-4 text-gray-600">{service.description}</p>
          
          <div className="divider"></div>
          
          <div className="space-y-2">
            <p><strong>Category:</strong> {service.category}</p>
            <p><strong>Price:</strong> <span className="text-xl font-bold text-pink-600">{service.cost} BDT</span></p>
            <p><strong>Provider Email:</strong> {service.adminEmail}</p>
          </div>

          <div className="card-actions justify-end mt-6">
            {isPaid ? (
              <span className="text-2xl font-bold text-green-600 border border-green-600 px-4 py-2 rounded">
                Already Paid
              </span>
            ) : (
              <button 
                className="btn btn-primary w-full"
                onClick={() => navigate(`/dashboard/payment/${service._id}`)}
              >
                Book & Pay Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
