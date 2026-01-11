import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TopDecorators = () => {
  const [decorators, setDecorators] = useState([]);
  const axiosSecure = useAxiosSecure();



  useEffect(() => {
    axiosSecure
      .get(`/decorators?status=approved`)
      .then((res) => setDecorators(res.data.slice(0, 4)))
      .catch((err) => console.error(err));
  }, [axiosSecure]);

  return (
    <section className="py-12 bg-base-200 px-6">
      <h2 className="text-3xl text-primary font-bold text-center mb-8">
        Meet Our Top Decorators
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {decorators.map((decorator) => (
          <div
            key={decorator._id}
            className="card bg-base-100 p-6 text-center shadow-lg hover:shadow-2xl transition-all"
          >
            <div className="avatar mx-auto mb-4">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    decorator.decoratorImage ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt={decorator.decoratorName}
                  className="object-cover"
                />
              </div>
            </div>
            <h3 className="font-bold text-lg">{decorator.decoratorName}</h3>
            <p className="text-sm text-gray-500">Expert Decorator</p>
            <div className="rating justify-center mt-2">
              <input
                type="radio"
                className="mask mask-star-2 bg-orange-400"
                disabled
              />
              <input
                type="radio"
                className="mask mask-star-2 bg-orange-400"
                disabled
              />
              <input
                type="radio"
                className="mask mask-star-2 bg-orange-400"
                disabled
              />
              <input
                type="radio"
                className="mask mask-star-2 bg-orange-400"
                checked
                readOnly
              />
              <input
                type="radio"
                className="mask mask-star-2 bg-orange-400"
                disabled
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopDecorators;
