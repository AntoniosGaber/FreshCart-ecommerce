import React from "react";
import Slider from "react-slick";

import slide1 from "../../assets/images/slider-image-1.jpeg";
import slide2 from "../../assets/images/slider-image-2.jpeg";
import slide3 from "../../assets/images/slider-image-3.jpeg";

import bannerSide1 from "../../assets/images/grocery-banner-2.jpeg";
import bannerSide2 from "../../assets/images/grocery-banner.png";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Slider */}
      <div className="w-full md:w-3/4 rounded-xl overflow-hidden">
        <Slider {...settings}>
          <img
            src={slide1}
            alt="Slide 1"
            className="w-full h-[180px] sm:h-[260px] md:h-[420px] object-cover"
            loading="lazy"
          />
          <img
            src={slide2}
            alt="Slide 2"
            className="w-full h-[180px] sm:h-[260px] md:h-[420px] object-cover"
            loading="lazy"
          />
          <img
            src={slide3}
            alt="Slide 3"
            className="w-full h-[180px] sm:h-[260px] md:h-[420px] object-cover"
            loading="lazy"
          />
        </Slider>
      </div>

      {/* Side Banners (Hidden on Mobile) */}
      <div className="hidden md:flex md:w-1/4 flex-col gap-4">
        <div className="h-[200px] rounded-xl overflow-hidden">
          <img
            src={bannerSide1}
            className="w-full h-full object-cover"
            alt="Banner 1"
            loading="lazy"
          />
        </div>

        <div className="h-[200px] rounded-xl overflow-hidden">
          <img
            src={bannerSide2}
            className="w-full h-full object-cover"
            alt="Banner 2"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
