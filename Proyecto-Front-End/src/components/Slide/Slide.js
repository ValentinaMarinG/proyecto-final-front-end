import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slide.scss";
import { Button } from "@mui/material";

const chunkArray = (array, size) => {
  if (!array) {
    console.error("Array is undefined or null.");
    return [];
  }

  const chunkedArray = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }
  return chunkedArray;
};

export const Slide = ({ banners, handleOpen, arrows }) => {
  const [showMore, setShowMore] = useState(false);

  /* const CustomNextArrow = (props) => (
    <div
      className="custom-prev-arrow"
      style={{ position: "absolute", top: "50%", left: "10px", zIndex: 1 }}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="16"
        width="14"
        viewBox="0 0 448 512"
      >
        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
      </svg>
    </div>
  );

  const CustomPrevArrow = (props) => (
    <div
      className="custom-next-arrow"
      style={{ position: "absolute", top: "50%", right: "10px", zIndex: 1 }}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="16"
        width="14"
        viewBox="0 0 448 512"
      >
        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
      </svg>
    </div>
  ); */

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: arrows,
  };

  const booksInGroupsOfFour = chunkArray(banners, 3);
  console.log(booksInGroupsOfFour.length);

  const visibleSlides = showMore
    ? booksInGroupsOfFour
    : booksInGroupsOfFour.slice(0, 3);

  const books = require.context(
    "../../assets/images/Productsphotos",
    false,
    /.(png|jpe?g|svg)$/
  );

  return (
    <div className="slider_noticias_container">
      <Slider {...sliderSettings}>
        {visibleSlides.map((group, index) => (
          <div
            key={index}
            className="slidee-card-container"
            style={{ display: "flex" }}
          >
            {group.map((book) => (
              <div
                key={book.id}
                className="slidee-card"
                style={{ display: "flex" }}
              >
                {/* Contenido del libro */}
                <div className="book-card-div">
                  {book.photo1 ? (
                    <img
                      src={books(`./${book.photo1}`)}
                      alt={`Imagen ${index + 1}`}
                      className="image"
                    />
                  ) : (
                    <img alt={`Imagen ${index + 1}`} className="image" />
                  )}
                </div>
                <div className="book-card-div-name">{book.name}</div>
                <div className="book-card-div">{book.author}</div>
                <div className="book-card-div">{book.price}</div>
              </div>
            ))}
          </div>
        ))}
      </Slider>

      <div className="button-ver-mas-slide">
        {/* Botón "Ver más" */}
        {booksInGroupsOfFour.length > 3 && (
          <Button onClick={() => setShowMore(!showMore)}>
            {showMore ? "Ver menos" : "Ver más"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Slide;
