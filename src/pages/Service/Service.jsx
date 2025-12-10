// import React from 'react';
// import MyDecorations from '../Dashboard/MyDecorations/MyDecorations';

// const Service = () => {
//     return (
//         <div>
//             <MyDecorations></MyDecorations>
//         </div>
//     );
// };

// export default Service;

// src/pages/Service/Service.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Service = () => {
  const [decorations, setDecorations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchDecorations = async () => {
      try {
        const res = await fetch(`${BASE_URL}/decorations`);
        const data = await res.json();
        setDecorations(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDecorations();
  }, [BASE_URL]);

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {decorations.map((item) => {
          const isPaid = item.paymentStatus === 'paid'; // ✅ Check status

          return (
            <div key={item._id} className="border rounded-lg p-4 shadow-lg flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">{item.serviceName}</h2>
                {item.image && (
                  <img src={item.image} alt={item.serviceName} className="w-full h-48 object-cover rounded-md mb-4" />
                )}
                <p className="font-semibold text-lg text-pink-600">Price: {item.cost} BDT</p>
              </div>
              
              <div className="flex gap-4 mt-4">
                <button 
                  className='btn btn-outline btn-primary flex-1' 
                  onClick={() => navigate(`/service/${item._id}`)}
                >
                  Details
                </button>

                {/* ✅ Conditional Button Rendering */}
                {isPaid ? (
                  <button className='btn btn-disabled flex-1 bg-gray-300 text-gray-600 cursor-not-allowed'>
                    Paid
                  </button>
                ) : (
                  <button 
                    className='btn btn-primary flex-1' 
                    onClick={() => navigate(`/dashboard/payment/${item._id}`)}
                  >
                    Pay
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Service;

