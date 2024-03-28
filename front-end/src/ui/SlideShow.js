import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slideshow = ({ slides }) => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 300000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div key={index} className="mt-5 max-w-96">
          <img
            src={slide.imageURL}
            alt={slide.name}
            className="w-full h-full object-cover"
          />
          {slide.name && (
            <div className="text-center text-white p-4 absolute bottom-0 left-0 right-0">
              {slide.name}
            </div>
          )}
        </div>
      ))}
    </Slider>
  );
};

export default Slideshow;
