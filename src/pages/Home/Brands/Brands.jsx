import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import amazon from "../../../../brands/amazon.jpg";
import apple from "../../../../brands/apple.png";
import casio from "../../../../brands/casio.png";
import google from "../../../../brands/google.png";
import grok from "../../../../brands/grok.jpg";
import lenovo from "../../../../brands/lenovo.png";
import meta from "../../../../brands/meta.png";
import nvidia from "../../../../brands/nvidia.png";
import samsung from "../../../../brands/samsung.png";
import { Autoplay } from "swiper/modules";

const brandsLogos = [
  amazon,
  apple,
  casio,
  google,
  grok,
  lenovo,
  meta,
  nvidia,
  samsung,
];

const Brands = () => {
  return (
    <Swiper
      loop={true}
      slidesPerView={4}
      centeredSlides={true}
      spaceBetween={30}
      grabCursor={true}
      modules={[Autoplay]}
      autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
    >
      {brandsLogos.map((logo, index) => (
        <SwiperSlide key={index}>
          <img className="h-8 w-16 -mt-2 md:mt-1" src={logo} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Brands;
