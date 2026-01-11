import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Service = () => {
  const [decorations, setDecorations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  // Pagination calculations
  const totalPages = Math.ceil(displayedDecorations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = displayedDecorations.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, selectedCategory, minPrice, maxPrice]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSearchText("");
    setSelectedCategory("All");
    setMinPrice("");
    setMaxPrice("");
    setCurrentPage(1);
  };

  // Skeleton Card Component
  const SkeletonCard = () => (
    <div className="border border-base-300 rounded-lg p-4 shadow-lg bg-base-100">
      <div className="flex justify-between items-start mb-4">
        <div className="skeleton h-6 w-2/3 bg-base-300"></div>
        <div className="skeleton h-5 w-16 rounded-full bg-base-300"></div>
      </div>

      <div className="skeleton h-48 w-full rounded-md mb-4 bg-base-300"></div>

      <div className="flex justify-between items-center mb-4">
        <div className="skeleton h-5 w-24 bg-base-300"></div>
        <div className="skeleton h-4 w-20 bg-base-300"></div>
      </div>

      <div className="flex gap-4">
        <div className="skeleton h-10 flex-1 bg-base-300"></div>
        <div className="skeleton h-10 flex-1 bg-base-300"></div>
      </div>
    </div>
  );

  // Skeleton Filter Component
  const SkeletonFilter = () => (
    <div className="bg-base-200 p-6 rounded-lg mb-8 border border-base-300">
      <div className="flex flex-col lg:flex-row gap-4 justify-between">
        <div className="form-control w-full lg:w-1/4">
          <div className="skeleton h-4 w-16 mb-2 bg-base-300"></div>
          <div className="skeleton h-12 w-full bg-base-300"></div>
        </div>

        <div className="form-control w-full lg:w-1/4">
          <div className="skeleton h-4 w-20 mb-2 bg-base-300"></div>
          <div className="skeleton h-12 w-full bg-base-300"></div>
        </div>

        <div className="flex gap-2 w-full lg:w-1/4">
          <div className="form-control w-1/2">
            <div className="skeleton h-4 w-16 mb-2 bg-base-300"></div>
            <div className="skeleton h-12 w-full bg-base-300"></div>
          </div>
          <div className="form-control w-1/2">
            <div className="skeleton h-4 w-16 mb-2 bg-base-300"></div>
            <div className="skeleton h-12 w-full bg-base-300"></div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <div className="skeleton h-8 w-24 bg-base-300"></div>
      </div>
    </div>
  );

  // Pagination Component
  const Pagination = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center items-center gap-2 mt-8 mb-4">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-sm btn-outline btn-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Prev
        </button>

        {/* First page */}
        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="btn btn-sm btn-outline btn-primary"
            >
              1
            </button>
            {startPage > 2 && (
              <span className="text-base-content/50 px-2">...</span>
            )}
          </>
        )}

        {/* Page numbers */}
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`btn btn-sm ${
              currentPage === number
                ? "btn-primary text-white"
                : "btn-outline btn-primary"
            }`}
          >
            {number}
          </button>
        ))}

        {/* Last page */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="text-base-content/50 px-2">...</span>
            )}
            <button
              onClick={() => handlePageChange(totalPages)}
              className="btn btn-sm btn-outline btn-primary"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-sm btn-outline btn-primary"
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="skeleton h-10 w-64 mx-auto mb-6 bg-base-300"></div>

        <SkeletonFilter />

        <div className="skeleton h-5 w-32 mb-4 bg-base-300"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl text-primary font-bold mb-6 text-center">
        All Services
      </h1>

      <div className="bg-base-200 p-6 rounded-lg mb-8 border border-base-300">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="form-control w-full lg:w-1/4">
            <label className="label">
              <span className="label-text text-base-content font-semibold">
                Search
              </span>
            </label>
            <input
              type="text"
              placeholder="Service Name..."
              className="input input-bordered w-full bg-base-100 text-base-content"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="form-control w-full lg:w-1/4">
            <label className="label">
              <span className="label-text text-base-content font-semibold">
                Service Type
              </span>
            </label>
            <select
              className="select select-bordered w-full bg-base-100 text-base-content"
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
                <span className="label-text text-base-content font-semibold">
                  Min Price
                </span>
              </label>
              <input
                type="number"
                placeholder="0"
                className="input input-bordered w-full bg-base-100 text-base-content"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text text-base-content font-semibold">
                  Max Price
                </span>
              </label>
              <input
                type="number"
                placeholder="Max"
                className="input input-bordered w-full bg-base-100 text-base-content"
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
            className="btn btn-ghost btn-sm text-error hover:bg-error/10"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Results info with pagination info */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-base-content/70 font-semibold">
          Showing {startIndex + 1}-
          {Math.min(endIndex, displayedDecorations.length)} of{" "}
          {displayedDecorations.length} services
        </p>
        {totalPages > 1 && (
          <p className="text-base-content/60 text-sm">
            Page {currentPage} of {totalPages}
          </p>
        )}
      </div>

      {/* --- Services Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentItems.length > 0 ? (
          currentItems.map((item) => {
            const isPaid = item.paymentStatus === "paid";

            return (
              <div
                key={item._id}
                className="border border-base-300 rounded-lg p-4 shadow-lg flex flex-col justify-between bg-base-100 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold mb-2 text-base-content line-clamp-2">
                      {item.serviceName}
                    </h2>
                    <div className="badge badge-primary badge-outline text-xs whitespace-nowrap ml-2">
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
                    <p className="font-semibold text-lg text-primary">
                      {item.cost} BDT
                    </p>
                    <span className="text-xs text-base-content/50">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    className="btn btn-outline btn-primary btn-sm flex-1"
                    onClick={() => navigate(`/service/${item._id}`)}
                  >
                    Details
                  </button>

                  {isPaid ? (
                    <button className="btn btn-sm btn-disabled flex-1 cursor-not-allowed">
                      Booked
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary btn-sm flex-1 text-white"
                      onClick={() => navigate(`/dashboard/payment/${item._id}`)}
                    >
                      Book
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-10 bg-base-200 rounded-lg border border-base-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto mb-4 text-base-content/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-base-content/70 text-lg font-medium">
              No services found matching your filters.
            </p>
            <button
              onClick={clearFilters}
              className="btn btn-primary btn-sm mt-4 text-white"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <Pagination />
    </div>
  );
};

export default Service;
