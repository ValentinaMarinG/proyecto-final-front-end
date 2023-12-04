import React, { useEffect, useState } from "react";
import "./MenuTop.scss";
import logo from "../../assets/images/logo.png";
import avatar from "../../assets/images/avatar-1295394_960_720.webp";
import { useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { jwtDecode } from "jwt-decode";
import Logo from "../../assets/images/logo.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import HelpIcon from "@mui/icons-material/Help";

const avatars = require.context(
  "../../../public/images/avatars",
  false,
  /.(png|jpe?g|svg)$/
);

export const MenuTop = ({ handleDropdownOpen }) => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [userDocument, setUserDocument] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log("td", decodedToken);
      const document = decodedToken.user_document;
      console.log("d", document);
      setUserDocument(document);
      setIsUserAuthenticated(true);
      console.log("use", userDocument);
    } else {
      setIsUserAuthenticated(false);
      setUserDocument(null);
    }
  }, []);

  const getAvatarSrc = () => {
    try {
      const avatarPath = avatars(`./${userDocument}.png`);
      return avatarPath ? true : false;
    } catch (error) {
      console.error("Error al cargar el avatar:", error);
      return null;
    }
  };

  const avatarSrc = getAvatarSrc();

  return (
    <div>
      <div className="link-to-pqrsf-header">
        <Link to={"/ayuda/pqrsf"} className="link-pqrsf-top">
          <HelpIcon />
          PQRSF
        </Link>
      </div>
      <div className={`menu-top ${isMenuActive ? "active" : ""}`}>
        <div className="avatar-container" onClick={handleDropdownOpen}>
          {isUserAuthenticated ? (
            <li>
              <div className="avatar-container">
                <Avatar
                  className="avatar-menu"
                  sx={{ bgcolor: "#0d1b2a" }}
                  style={{ width: "60px", height: "60px" }}
                >
                  {avatarSrc != null ? (
                    <img
                      className="img-avatar"
                      src={avatars(`./${userDocument}.png`)}
                      alt="Avatar"
                    />
                  ) : (
                    <AccountCircle
                      style={{ fontSize: "95px", color: "#f0ebd8" }}
                    />
                  )}
                </Avatar>
              </div>
            </li>
          ) : (
            <div className="logo-libreria">
              <img src={Logo}></img>
            </div>
          )}
        </div>
        <div className="menu-top-toggle" onClick={toggleMenu}>
          <div className="menu-top-icon">&#9776;</div>
          <span className="dropdown-top-icon">&#9660;</span>
        </div>
        <div className={`dropdown-top-content ${isMenuActive ? "active" : ""}`}>
          <ul>
            <li>
              <a href="#seccion3">LIBROS</a>
            </li>
            <li>
              <a href="#seccion2">COLECCIONES</a>
            </li>
            <li>
              <a href="#seccion4">AUTORES</a>
            </li>
            <li>
              <a href="#seccion5">DESTACADOS</a>
            </li>
            <li>
              <a href="#seccion5">EVENTOS</a>
            </li>
          </ul>
        </div>
        <div className="logo-libreria">
          {/* <ShoppingCartIcon /> */}
          {isUserAuthenticated ? (
            <li>
              <div className="logo-libreria">
                <img src={Logo}></img>
              </div>
            </li>
          ) : (
            <li onClick={handleLoginClick}>
              <a href="#">INICIAR SESIÓN</a>
            </li>
          )}
        </div>
      </div>
    </div>
  );
};
