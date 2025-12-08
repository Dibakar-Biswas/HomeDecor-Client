import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({review}) => {
    const {userName, review:Testimonial, user_photoURL} = review;
    return (
        <div className="card w-[380px] bg-base-100 shadow-lg rounded-3xl p-8 border border-gray-100">
      {/* Quote Icon */}
      <FaQuoteLeft className="text-4xl text-teal-300 mb-4" />

      {/* Testimonial Text */}
      <p className="text-gray-600 leading-relaxed mb-6">
        {Testimonial}
      </p>

      {/* Dashed Divider */}
      <div className="border-t border-dashed border-gray-300 my-5"></div>

      {/* Profile Section */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full">
            <img className=' rounded-full' src={user_photoURL} alt="" />
        </div>

        <div>
          <p className="font-bold text-lg">{userName}</p>
          <p className="text-gray-500 text-sm">Senior Product Designer</p>
        </div>
      </div>
    </div>
    );
};

export default ReviewCard;