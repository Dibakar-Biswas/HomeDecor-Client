import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Service = () => {
  const [decorations, setDecorations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("newest"); 
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

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

  const getFilteredDecorations = () => {
    let filtered = [...decorations];

    if (searchText) {
      filtered = filtered.filter((item) =>
        item.serviceName.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      if (sortOption === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt); 
      } else if (sortOption === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortOption === "priceHigh") {
        return b.cost - a.cost; 
      } else if (sortOption === "priceLow") {
        return a.cost - b.cost; 
      }
      return 0;
    });

    return filtered;
  };

  const displayedDecorations = getFilteredDecorations();

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Services</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-base-200 p-4 rounded-lg">
        <div className="form-control w-full md:w-1/2">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search services..."
              className="input input-bordered w-full"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        <select
          className="select select-bordered w-full md:w-auto"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="priceLow">Price: Low to High</option>
        </select>
      </div>


      <p className="mb-4 text-gray-500">
        Showing {displayedDecorations.length} results
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedDecorations.length > 0 ? (
          displayedDecorations.map((item) => {
            const isPaid = item.paymentStatus === "paid";

            return (
              <div
                key={item._id}
                className="border rounded-lg p-4 shadow-lg flex flex-col justify-between bg-base-100"
              >
                <div>
                  <h2 className="text-xl font-bold mb-2">{item.serviceName}</h2>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.serviceName}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                  )}
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-lg text-pink-600">
                      Price: {item.cost} BDT
                    </p>
                    <span className="text-xs text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 mt-4">
                  <button
                    className="btn btn-outline btn-primary flex-1"
                    onClick={() => navigate(`/service/${item._id}`)}
                  >
                    Details
                  </button>

                  {isPaid ? (
                    <button className="btn btn-disabled flex-1 bg-gray-300 text-gray-600 cursor-not-allowed">
                      Booked
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary flex-1"
                      onClick={() => navigate(`/dashboard/payment/${item._id}`)}
                    >
                      Pay
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            No services found matching "{searchText}"
          </div>
        )}
      </div>
    </div>
  );
};

export default Service;

