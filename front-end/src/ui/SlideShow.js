import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slideshow = ({ slides }) => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    autoplayInterval: 3000,
  };

  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div key={index} className="mt-5 px-40">
          <img
            src={slide.imageURL}
            alt={slide.title}
            className="w-full h-full object-cover rounded-lg"
          />
          {slide.title && (
            <div className="text-center text-white p-4 absolute bottom-0 left-0 right-0">
              {slide.title}
            </div>
          )}
        </div>
      ))}
    </Slider>
  );
};

export default Slideshow;
