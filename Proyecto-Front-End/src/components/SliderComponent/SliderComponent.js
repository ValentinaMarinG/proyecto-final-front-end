import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import './SliderComponent.scss'

export const SliderComponent = ({ images }) => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
      };

      return (
        <div className="slider_container">
          <Slider {...sliderSettings}>
            {images.map((banner, index) => (
              <div key={index}>
                {banner.image && (
                  <img
                    src={banner.image}
                    alt={`Imagen ${index + 1}`}
                    className="image-h"
                  />
                )}
              </div>
            ))}
          </Slider>
        </div>
      );
      
}

export default SliderComponent;