import React, {useEffect} from "react";
import "./Slider.scss";
import Swiper from "swiper";
import {Autoplay, Pagination} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

Swiper.use([Autoplay, Pagination]);

const Slider = () => {
  const slides = [
    "https://i.pinimg.com/736x/da/ca/b4/dacab4445d788a5f7cae1c9c949972a3.jpg",
    "https://i.pinimg.com/736x/b1/70/cd/b170cda23a1342b931390d4633cc863a.jpg",
    "https://i.pinimg.com/736x/3f/f4/01/3ff401a3107747927566640fc6348851.jpg",
    "https://i.pinimg.com/736x/b1/70/cd/b170cda23a1342b931390d4633cc863a.jpg",
    "https://i.pinimg.com/1200x/f7/e5/a1/f7e5a145c1c914ad795169aab26bf8f0.jpg",

  ];
  useEffect(() => {
    const swiper = new Swiper(".progress-slide-carousel", {
      loop: true,
      autoplay: {
        delay: 1200,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".progress-slide-carousel .swiper-pagination",
        type: "progressbar",
      },
    });

    return () => {
      swiper.destroy();
    };
  }, []);

  return (
    <div className="w-full relative">
      <div className="swiper progress-slide-carousel swiper-container relative">
        <div className="swiper-wrapper">
          {slides.map((slide, index) => (
            <div key={index} className="swiper-slide">
              <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center">
                <img src={slide} className="w-full h-full object-cover rounded-2xl"/>
              </div>
            </div>
          ))}
        </div>
        <div className="swiper-pagination !bottom-2 !top-auto !w-80 right-0 mx-auto bg-gray-100"></div>
      </div>
    </div>
  );
};

export default Slider;
