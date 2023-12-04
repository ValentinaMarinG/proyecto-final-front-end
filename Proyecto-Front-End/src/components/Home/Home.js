import React, { useEffect, useState } from "react";
import "./Home.scss";
import Cubo from "../cubo/Cubo";
import Service from "../Services/Service";
import ServicesList from "../ServicesList/ServicesList";
import Flex from "../Flex/Flex";
import Contact from "../Contacts/Contact";
import Products from "../Products/Products";
import Footer from "../Footer/Footer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HelpIcon from "@mui/icons-material/Help";
import axios from "axios";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Modal,
  Box,
  Fab,
} from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderComponent from "../SliderComponent/SliderComponent";
import Slide from "../Slide/Slide";
import logo from "../../assets/images/logo.png";
import { bannersHome, libros, colecciones, autores } from "../../assets/index";
import libroSombra from "../../assets/images/Productsphotos/eljuegodelangel.jpg";
import libroJuego from "../../assets/images/Productsphotos/libro.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { FavoriteList } from "../FavoriteList/FavoriteList";
import { ShoppingCartList } from "../ShoppingCartList/ShoppingCartList";
import { MenuTop } from "../MenuTop/MenuTop";
import lab from "../../assets/images/labesp.jpg";
import jdh from "../../assets/images/juegosdelhambre.png";

export const Home = () => {
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);

  const [currentSection, setCurrentSection] = useState("");

  const [open, setOpen] = useState(false);
  const [selectedNoticia, setSelectedNoticia] = useState(null);

  const [favoriteList, setFavoriteList] = useState([]);
  const addToFavoriteList = (object) => {
    setFavoriteList((prevFavoriteList) => [...prevFavoriteList, object]);
    console.log(favoriteList);
  };

  const [shoppingCartList, setshoppingCartList] = useState([]);
  const addToShoppingCartList = (object) => {
    setshoppingCartList((prevshoppingCartList) => [
      ...prevshoppingCartList,
      object,
    ]);
    console.log(shoppingCartList);
  };

  const handleOpen = (noticia) => {
    setSelectedNoticia(noticia);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const section1 = document.getElementById("seccion1");
      const section2 = document.getElementById("seccion2");
      const section3 = document.getElementById("seccion3");
      const section4 = document.getElementById("seccion4");
      const section5 = document.getElementById("seccion5");

      const scrollY = window.scrollY;

      if (scrollY < section2.offsetTop - 100) {
        setCurrentSection("seccion1");
      } else if (scrollY < section3.offsetTop - 100) {
        setCurrentSection("seccion2");
      } else if (scrollY < section4.offsetTop - 100) {
        setCurrentSection("seccion3");
      } else if (scrollY < section5.offsetTop - 100) {
        setCurrentSection("seccion4");
      } else {
        setCurrentSection("seccion5");
      }

      if (window.scrollY > 100) {
        setShowFloatingMenu(true);
      } else {
        setShowFloatingMenu(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    const handleMenuItemClick = (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: "smooth",
        });
      }
    };

    const menuLinks = document.querySelectorAll(".menu ul li a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", handleMenuItemClick);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const banners = [
    /* {
      id: "1",
      nombre: "banner1",
      image: bannersHome.banner1,
    }, */
    {
      id: "2",
      nombre: "banner2",
      image: bannersHome.banner2,
    },
  ];

  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("token");

  const [coleccionesProducts, setColeccionesProducts] = useState([]);
  const [category, setCategory] = useState("");

  const [categoriesData, setCategoriesData] = useState(null);

  useEffect(() => {
    const getCategories = async (token) => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/categories/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        const data = response.data;
        setCategoriesData(data);
        console.log("Nuevo valor de categoriesData:", categoriesData);
      } catch (error) {
        console.error(error);
      }
    };

    getCategories(token);
  }, [token]);

  useEffect(() => {
    const getProducts = async (token) => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/products/"
        );
        console.log(response.data);
        const data = response.data;
        setProducts(data);
        console.log("Nuevo valor de products:", products);
        const categoria = categoriesData.find(
          (category) => category.name === "Colecciones"
        );
        const filteredProducts = products.filter(
          (product) => product.category === "656d2cedfd5171cae7b1d44c"
        );
        setColeccionesProducts(filteredProducts);
        console.log("colecciones", coleccionesProducts);
      } catch (error) {
        console.error(error);
      }
    };

    getProducts(token);
  }, [token]);

  return (
    <div className="Home">
      {/* <Cubo></Cubo> */}
      <MenuTop />
      <div className="content-home">
        <div className="seccion1" id="seccion1">
          {/* <h1>Flexbox</h1> */}
          <SliderComponent images={banners} />
          {/* <Slide banners={banners} handleOpen={handleOpen} />  */}
        </div>
        <div className="seccion2" id="seccion2">
          <div className="bienvenida">
            <label className="label-bienvenida">¡Bienvenidos!</label>
          </div>
          <div className="bienvenida-description">
            <label className="label-bienvenida-description">
              ¡Bienvenido a nuestra librería virtual! Explora un mundo de
              historias fascinantes y descubre libros que darán vida a tus
              momentos de lectura. Desde emocionantes aventuras hasta
              conmovedoras narrativas, tenemos algo para cada amante de la
              lectura. ¡Sumérgete en nuestras páginas y deja que la magia de los
              libros te envuelva!
            </label>
          </div>
          {/* <h1>Services</h1>
          <FavoriteList favoriteList={favoriteList} /> */}
          {/* <Service /> */}
        </div>
        <div className="seccion3" id="seccion3">
          {/* <div>
            <Button>Romance</Button>
            <Button>Juvenil</Button>
            <Button>Misterio</Button>
            <Button>Terror</Button>
            <Button>Ficción</Button>
            <Button>Aventura</Button>
          </div> */}
          {/* <h1>Contacts</h1>
          <ShoppingCartList shoppingList={shoppingCartList} /> */}
          <Slide banners={products} handleOpen={handleOpen} arrows={true} />
        </div>
        <div className="seccion4" id="seccion4">
          <div className="content-autor-mes">
            <div className="autores-div">
              <label className="label-autores">Autor recomendado del mes</label>
            </div>
            <div className="autor-mes">
              <div className="autor-img">
                <img src={autores.autor1} />
              </div>
              <div className="autor-descrip-div">
                <div className="div-fotos-libros">
                  <label className="autor-descrip">
                    Celebremos el arte literario con nuestro Autor del Mes, el
                    inolvidable Carlos Ruiz Zafón. Con su pluma maestra, Zafón
                    teje historias cautivadoras que transportan a los lectores a
                    mundos misteriosos y llenos de intriga.
                  </label>
                </div>
                <div className="div-fotos-libros">
                  <div className="libros-img">
                    <img src={libroSombra} />
                  </div>
                  <div className="libros-img">
                    <img src={libroJuego} />
                  </div>
                  <div className="libros-img">
                    <img src={lab} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="seccion5" id="seccion5">
          <div className="div-colecciones-titulo">
            <label className="label-colecciones">
              Libro recomendado del mes
            </label>
          </div>
          {/*
          <div className="colecciones-slide">
            <div className="colecciones1">
              <img src={colecciones.coleccion1} />
            </div>
            <div className="colecciones1">
              <img src={colecciones.coleccion2} />
            </div>
            <div className="colecciones1">
              <img src={colecciones.coleccion3} />
            </div>
            <div className="colecciones1">
              <img src={colecciones.coleccion4} />
            </div> 
            <Slide banners={coleccionesProducts} handleOpen={handleOpen} arrows={false}/>
          </div> */}
          <div className="libro-destacado">
            <div className="libro-destacado-img">
              <img src={jdh} />
            </div>
            <div className="libro-destacado-text">
              <label className="libro-destacado-label">
                Es la hora. Ya no hay vuelta atrás. Los juegos van a comenzar.
                Los tributos deben salir a la Arena y luchar por sobrevivir.
                Ganar significa Fama y riqueza, perder significa la muerte
                segura... ¡Que empiecen los Septuagésimo Cuartos Juegos del
                Hambre! Un pasado de guerras ha dejado los 12 distritos que
                dividen Panem bajo el poder tiránico del Capitolio. Sin libertad
                y en la pobreza, nadie puede salir de los límites de su
                distrito. Sólo una chica de 16 años, Katniss Everdeen, osa
                desafiar las normas para conseguir comida. Sus prinicipios se
                pondrán a prueba con Los juegos del hambre, espectáculo
                televisado que el Capitolio organiza para humillar a la
                población. Cada año, 2 representantes de cada distrito serán
                obligados a subsistir en un medio hostil y luchar a muerte entre
                ellos hasta que quede un solo superviviente. Cuando su hermana
                pequeña es elegida para participar, Katniss no duda en ocupar su
                lugar, decidida a demostrar con su actitud firme y decidida, que
                aún en las situaciones más desesperadas hay lugar para el amor y
                el respeto. La historia continuará... la segunda entrega de la
                trilogía .
              </label>
            </div>
          </div>
        </div>
        <div className="seccion6" id="seccion6">
          <label className="collections-title">
            Explora nuestras colecciones y sagas
          </label>
          <label className="label-collections-descrip">
            Descubre sagas y colecciones únicas que te translabelortarán a mundos
            fascinantes. <br></br> Elige tus favoritos y sumérgete en la magia de la
            lectura.
          </label>
          <div>
            <Slide
              banners={products.filter(
                (product) => product.category === "656d2cedfd5171cae7b1d44c"
              )}
              handleOpen={handleOpen}
              arrows={false}
            />
          </div>
        </div>
      </div>
      {/* <div className="pqrsf-flotating-button">
        <Link to={"ayuda/pqrsf"} className="link-pqrsf">
          <Fab className="fab-pqrsf" variant="extended" color="primary">
            <HelpIcon />
            PQRSF
          </Fab>
        </Link>
      </div> */}
      {/* <div className={`floating-menu ${showFloatingMenu ? "show" : ""}`}>
        <div
          className={`icono-1 ${currentSection === "seccion1" ? "active" : ""}`}
        >
          <a href="#seccion1" className="icono">
            <svg
              className="svg-icon"
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="14"
              viewBox="0 0 448 512"
            >
              <path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
            </svg>
          </a>
        </div>
        <div
          className={`icono-2 ${currentSection === "seccion2" ? "active" : ""}`}
        >
          <a href="#seccion2" className="icono">
            <svg
              className="svg-icon"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" />
            </svg>
          </a>
        </div>
        <div
          className={`icono-3 ${currentSection === "seccion3" ? "active" : ""}`}
        >
          <a href="#seccion3" className="icono">
            <svg
              className="svg-icon"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M96 0C60.7 0 32 28.7 32 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H96zM208 288h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H144c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V80zM496 192c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V336z" />
            </svg>
          </a>
        </div>
        <div
          className={`icono-4 ${currentSection === "seccion4" ? "active" : ""}`}
        >
          <a href="#seccion4" className="icono">
            <svg
              className="svg-icon"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
            </svg>
          </a>
        </div>
        <div
          className={`icono-5 ${currentSection === "seccion5" ? "active" : ""}`}
        >
          <a href="#seccion5" className="icono">
            <svg
              className="svg-icon"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 320 512"
            >
              <path d="M32.5 58.3C35.3 43.1 48.5 32 64 32H256c17.7 0 32 14.3 32 32s-14.3 32-32 32H90.7L70.3 208H184c75.1 0 136 60.9 136 136s-60.9 136-136 136H100.5c-39.4 0-75.4-22.3-93-57.5l-4.1-8.2c-7.9-15.8-1.5-35 14.3-42.9s35-1.5 42.9 14.3l4.1 8.2c6.8 13.6 20.6 22.1 35.8 22.1H184c39.8 0 72-32.2 72-72s-32.2-72-72-72H32c-9.5 0-18.5-4.2-24.6-11.5s-8.6-16.9-6.9-26.2l32-176z" />
            </svg>
          </a>
        </div>
      </div> */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-style"
      >
        <Box className="modal-content">
          {selectedNoticia && (
            <>
              <img
                src={selectedNoticia.Image}
                alt={selectedNoticia.noticiaTitle}
                className="modal-image"
                style={{ width: "300px", height: "auto" }}
              />
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {selectedNoticia.noticiaTitle}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {selectedNoticia.noticiaSubtitle}
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                {selectedNoticia.noticiaDescription}
              </Typography>
              <div className="button-fab-favorite-cart">
                <Fab
                  className="button-fab"
                  color="secondary"
                  aria-label="Favorite icon"
                  onClick={() => addToFavoriteList(selectedNoticia)}
                >
                  <FavoriteIcon />
                </Fab>
                <Fab
                  className="button-fab"
                  color="primary"
                  aria-label="Favorite icon"
                  onClick={() => addToShoppingCartList(selectedNoticia)}
                >
                  <AddShoppingCartIcon />
                </Fab>
              </div>
            </>
          )}
        </Box>
      </Modal>
      <Footer></Footer>
    </div>
  );
};

export default Home;
