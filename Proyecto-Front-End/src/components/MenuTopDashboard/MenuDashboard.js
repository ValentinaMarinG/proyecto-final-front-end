import React, { useEffect, useState } from "react";
import "./MenuDashboard.scss";
import logo from "../../assets/images/logo.png";
import avatar from "../../assets/images/avatar-1295394_960_720.webp";
import { useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { jwtDecode } from "jwt-decode";
import Logo from "../../assets/images/logo.png";
import MenuIcon from "@mui/icons-material/Menu";

const avatars = require.context(
  "../../../public/images/avatars",
  false,
  /.(png|jpe?g|svg)$/
);

export const MenuDashboard = ({
  handleDropdownOpen,
  handleToggleSiderMenu,
}) => {
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
      return avatars(`./${userDocument}.png`);
    } catch (error) {
      console.error("Error al cargar el avatar:", error);
      return null;
    }
  };

  const avatarSrc = getAvatarSrc();

  return (
    <div className={`menu-dash ${isMenuActive ? "active" : ""}`}>
      <div className="logo-libreria-dash">
        <MenuIcon
          className="menu-icon-menu-dash"
          onClick={handleToggleSiderMenu}
        />
        <img src={Logo}></img> <label>Dashboard</label>
      </div>
      <div className="menu-dash-toggle" onClick={toggleMenu}>
        <div className="menu-dash-icon">&#9776;</div>
        <span className="dropdown-icon">&#9660;</span>
      </div>
      <div className="avatar-container-dash" onClick={handleDropdownOpen}>
        {isUserAuthenticated ? (
          <li>
            <div className="avatar-container-circulo">
              <Avatar
                className="avatar-menu-dash"
                sx={{ bgcolor: "#0d1b2a" }}
                style={{ width: "50px", height: "50px" }}
              >
                {avatarSrc ? (
                  <img
                    className="img-avatar-dash"
                    src={avatars(`./${userDocument}.png`)}
                    alt="Avatar"
                  />
                ) : (
                  <AccountCircle />
                )}
              </Avatar>
            </div>
          </li>
        ) : (
          <AccountCircle />
        )}
      </div>
    </div>
  );
};
