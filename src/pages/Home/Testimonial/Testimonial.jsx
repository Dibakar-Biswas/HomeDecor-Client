import React from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "Aisha Rahman",
      role: "Bride",
      image: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      comment:
        "Style Decor made our wedding day absolutely magical! The attention to detail was incredible, and the team worked tirelessly to bring our vision to life. Every guest was amazed by the beautiful decorations.",
      event: "Wedding Ceremony",
      location: "Dhaka",
    },
    {
      id: 2,
      name: "Md. Kamal Hossain",
      role: "Corporate Manager",
      image: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      comment:
        "We hired Style Decor for our annual corporate event, and they exceeded all expectations. Professional, punctual, and creative. The setup was stunning and created the perfect atmosphere for our conference.",
      event: "Corporate Event",
      location: "Chittagong",
    },
    {
      id: 3,
      name: "Fatima Begum",
      role: "Event Organizer",
      image: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      comment:
        "I've worked with many decoration services, but Style Decor stands out. Their creativity, flexibility, and commitment to excellence make them my first choice for all events. Highly recommended!",
      event: "Multiple Events",
      location: "Sylhet",
    },
    {
      id: 4,
      name: "Rahim Ahmed",
      role: "Father",
      image: "https://i.pravatar.cc/150?img=13",
      rating: 4,
      comment:
        "They decorated my daughter's birthday party beautifully. The team was friendly, accommodating to our requests, and cleaned up everything perfectly. Great value for money!",
      event: "Birthday Party",
      location: "Dhaka",
    },
    {
      id: 5,
      name: "Nusrat Jahan",
      role: "Homeowner",
      image: "https://i.pravatar.cc/150?img=9",
      rating: 5,
      comment:
        "I wanted to surprise my husband with a special home decoration for our anniversary. Style Decor created a romantic atmosphere that exceeded my expectations. Absolutely loved it!",
      event: "Anniversary Decoration",
      location: "Khulna",
    },
    {
      id: 6,
      name: "Shakib Hassan",
      role: "Business Owner",
      image: "https://i.pravatar.cc/150?img=14",
      rating: 5,
      comment:
        "Professional service from start to finish. They understood our brand identity and incorporated it beautifully into the office inauguration decor. Will definitely use their services again!",
      event: "Office Inauguration",
      location: "Rajshahi",
    },
  ];

  return (
    <div className="py-16 md:py-24 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Client Testimonials
          </h2>
          <p className="text-md text-base-content/70 max-w-2xl mx-auto">
            Don't just take our word for it - hear what our valued clients have
            to say about their experience with Style Decor
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-base-200 rounded-2xl p-6 md:p-8 shadow-lg border border-base-300 hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <FaQuoteLeft className="text-primary text-3xl opacity-30" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`${
                      index < testimonial.rating
                        ? "text-warning"
                        : "text-base-300"
                    } text-lg`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-base-content/80 text-sm md:text-base mb-6 flex-grow leading-relaxed">
                "{testimonial.comment}"
              </p>

              {/* Event Tag */}
              <div className="mb-4">
                <span className="badge badge-primary badge-outline text-xs">
                  {testimonial.event}
                </span>
              </div>

              {/* Client Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-base-300">
                <div className="avatar">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-base-content text-base md:text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-base-content/60 text-xs md:text-sm">
                    {testimonial.role} • {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 md:mt-20">
          <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-base-200 border border-base-300">
            <div className="stat place-items-center">
              <div className="stat-title text-base-content/70">Happy Clients</div>
              <div className="stat-value text-primary">500+</div>
              <div className="stat-desc text-base-content/60">
                Satisfied customers nationwide
              </div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title text-base-content/70">
                Events Decorated
              </div>
              <div className="stat-value text-secondary">1,200+</div>
              <div className="stat-desc text-base-content/60">
                Successfully completed projects
              </div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title text-base-content/70">
                Average Rating
              </div>
              <div className="stat-value text-warning">4.9/5</div>
              <div className="stat-desc text-base-content/60">
                Based on 450+ reviews
              </div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title text-base-content/70">
                Years Experience
              </div>
              <div className="stat-value text-accent">8+</div>
              <div className="stat-desc text-base-content/60">
                Industry expertise
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 border border-base-300">
          <h3 className="text-2xl font-bold text-base-content mb-4">
            Ready to Create Your Own Success Story?
          </h3>
          <p className="text-base-content/70 mb-6 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who trusted Style Decor to make
            their events unforgettable. Let's bring your vision to life!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/service"
              className="btn btn-primary text-white px-8"
            >
              View Our Services
            </a>
            <a
              href="/quote"
              className="btn btn-outline btn-primary px-8"
            >
              Get a Free Quote
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
