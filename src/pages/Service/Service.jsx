import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const Service = () => {
  const [decorations, setDecorations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const navigate = useNavigate();
  const BASE_URL = "https://home-decor-server.vercel.app";

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

  const categories = [
    "All",
    ...new Set(decorations.map((item) => item.category || "Uncategorized")),
  ];

  const getFilteredDecorations = () => {
    let filtered = [...decorations];

    if (searchText) {
      filtered = filtered.filter((item) =>
        item.serviceName.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (minPrice) {
      filtered = filtered.filter(
        (item) => parseInt(item.cost) >= parseInt(minPrice)
      );
    }
    if (maxPrice) {
      filtered = filtered.filter(
        (item) => parseInt(item.cost) <= parseInt(maxPrice)
      );
    }

    return filtered;
  };

  const displayedDecorations = getFilteredDecorations();

  const clearFilters = () => {
    setSearchText("");
    setSelectedCategory("All");
    setMinPrice("");
    setMaxPrice("");
  };

  if (loading)
    return (
      <div className="text-center p-10">
        <Loading></Loading>
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-4xl text-primary font-bold mb-6 text-center">
        All Services
      </h1>

      <div className="bg-base-200 p-6 rounded-lg mb-8">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="form-control w-full lg:w-1/4">
            <label className="label">
              <span className="label-text">Search</span>
            </label>
            <input
              type="text"
              placeholder="Service Name..."
              className="input input-bordered w-full"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="form-control w-full lg:w-1/4">
            <label className="label">
              <span className="label-text">Service Type</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 w-full lg:w-1/4">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Min Price</span>
              </label>
              <input
                type="number"
                placeholder="0"
                className="input input-bordered w-full"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Max Price</span>
              </label>
              <input
                type="number"
                placeholder="Max"
                className="input input-bordered w-full"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={clearFilters}
            className="btn btn-ghost btn-sm text-error"
          >
            Reset Filters
          </button>
        </div>
      </div>

      <p className="mb-4 text-gray-500 font-semibold">
        Found {displayedDecorations.length} services
      </p>

      {/* --- Services Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedDecorations.length > 0 ? (
          displayedDecorations.map((item) => {
            const isPaid = item.paymentStatus === "paid";

            return (
              <div
                key={item._id}
                className="border rounded-lg p-4 shadow-lg flex flex-col justify-between bg-base-100 hover:shadow-xl transition-shadow"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold mb-2">
                      {item.serviceName}
                    </h2>
                    <div className="badge badge-ghost text-xs">
                      {item.category}
                    </div>
                  </div>

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
            No services found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default Service;
