import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import banner1 from "../../../assets/banner_1.jpeg";
import banner2 from "../../../assets/banner_2.jpeg";
import banner3 from "../../../assets/banner_3.jpeg";

const Banner = () => {
  return (
    <div className="banner-container mb-20">
      <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true}>
        <div>
          <img src={banner1} />
        </div>
        <div>
          <img src={banner2} />
        </div>
        <div>
          <img src={banner3} />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
