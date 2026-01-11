import React, { use } from "react";
import { Autoplay, EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  
  return (
    <div className="mt-20 mb-20 px-2 md:px-4">
      <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12 px-4">
        <h3 className="font-bold text-primary text-3xl mb-3 md:mb-4">
          What Our Customers Are Saying
        </h3>
        <p className="font-medium text-base-content/70 text-base md:text-md">
          Discover how Style Decor transforms special moments into unforgettable
          experiences. Real stories from our satisfied clients across Bangladesh.
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <Swiper
          loop={reviews.length > 1}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          spaceBetween={10}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 0,
            modifier: 1,
            scale: 1,
            slideShadows: false,
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={{
            enabled: true,
          }}
          breakpoints={{
            // Mobile devices (320px - 639px)
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
              effect: "slide",
              coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 0,
                modifier: 1,
                scale: 1,
                slideShadows: false,
              },
              navigation: {
                enabled: false,
              },
            },
            // Small tablets (640px - 767px)
            640: {
              slidesPerView: 1.2,
              spaceBetween: 20,
              centeredSlides: true,
              effect: "coverflow",
              coverflowEffect: {
                rotate: 5,
                stretch: 0,
                depth: 50,
                modifier: 1,
                scale: 0.95,
                slideShadows: false,
              },
              navigation: {
                enabled: true,
              },
            },
            // Tablets (768px - 1023px)
            768: {
              slidesPerView: 2,
              spaceBetween: 25,
              effect: "coverflow",
              coverflowEffect: {
                rotate: 10,
                stretch: 0,
                depth: 50,
                modifier: 1.5,
                scale: 0.95,
                slideShadows: false,
              },
              navigation: {
                enabled: true,
              },
            },
            // Desktop (1024px+)
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
              effect: "coverflow",
              coverflowEffect: {
                rotate: 20,
                stretch: 0,
                depth: 100,
                modifier: 2,
                scale: 0.9,
                slideShadows: false,
              },
              navigation: {
                enabled: true,
              },
            },
            // Large desktop (1440px+)
            1440: {
              slidesPerView: 3,
              spaceBetween: 40,
              effect: "coverflow",
              coverflowEffect: {
                rotate: 25,
                stretch: 0,
                depth: 120,
                modifier: 2.5,
                scale: 0.88,
                slideShadows: false,
              },
              navigation: {
                enabled: true,
              },
            },
          }}
          modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
          className="reviews-swiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} className="pb-12">
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom CSS for dark mode support and mobile fixes */}
      <style jsx>{`
        :global(.reviews-swiper) {
          padding: 2rem 0.5rem 3rem;
          overflow: visible;
        }

        @media (min-width: 768px) {
          :global(.reviews-swiper) {
            padding: 3rem 1rem 4rem;
          }
        }

        :global(.reviews-swiper .swiper-wrapper) {
          padding-bottom: 2rem;
        }

        :global(.reviews-swiper .swiper-pagination) {
          bottom: 0 !important;
        }

        :global(.reviews-swiper .swiper-pagination-bullet) {
          background: hsl(var(--p));
          opacity: 0.4;
          width: 10px;
          height: 10px;
          transition: all 0.3s ease;
          margin: 0 4px !important;
        }

        @media (min-width: 768px) {
          :global(.reviews-swiper .swiper-pagination-bullet) {
            width: 12px;
            height: 12px;
          }
        }

        :global(.reviews-swiper .swiper-pagination-bullet-active) {
          opacity: 1;
          width: 24px;
          border-radius: 6px;
          background: hsl(var(--p));
        }

        @media (min-width: 768px) {
          :global(.reviews-swiper .swiper-pagination-bullet-active) {
            width: 30px;
          }
        }

        /* Hide navigation on mobile */
        @media (max-width: 639px) {
          :global(.reviews-swiper .swiper-button-next),
          :global(.reviews-swiper .swiper-button-prev) {
            display: none !important;
          }
        }

        :global(.reviews-swiper .swiper-button-next),
        :global(.reviews-swiper .swiper-button-prev) {
          color: hsl(var(--p));
          background: hsl(var(--b2));
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        @media (min-width: 1024px) {
          :global(.reviews-swiper .swiper-button-next),
          :global(.reviews-swiper .swiper-button-prev) {
            width: 45px;
            height: 45px;
          }
        }

        :global(.reviews-swiper .swiper-button-next:hover),
        :global(.reviews-swiper .swiper-button-prev:hover) {
          background: hsl(var(--p));
          color: white;
          transform: scale(1.1);
        }

        :global(.reviews-swiper .swiper-button-next::after),
        :global(.reviews-swiper .swiper-button-prev::after) {
          font-size: 18px;
          font-weight: bold;
        }

        @media (min-width: 1024px) {
          :global(.reviews-swiper .swiper-button-next::after),
          :global(.reviews-swiper .swiper-button-prev::after) {
            font-size: 20px;
          }
        }

        :global(.reviews-swiper .swiper-slide) {
          display: flex;
          justify-content: center;
          align-items: stretch;
          height: auto;
          transition: all 0.3s ease;
        }

        /* Ensure proper card display */
        :global(.reviews-swiper .swiper-slide > *) {
          width: 100%;
          max-width: 100%;
        }
      `}</style>
    </div>
  );
};

export default Reviews;
