import React, { useState, useEffect } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CategoryIcon from "@mui/icons-material/Category";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import DiscountIcon from "@mui/icons-material/Discount";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, MenuItem } from "@mui/material";
import "./SiderBar.scss";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import Logo from "../../assets/images/logo.png";

export const SiderBar = ({
  children,
  isOpen,
  handleToggleSiderMenu,
  changeSection,
  menuItems,
  align,
}) => {
  const [activeSection, setActiveSection] = useState("Perfil");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    setIsMobileMenuOpen(screenWidth <= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`siderbar-container${isMobileMenuOpen ? "active" : ""}`} style={{ left: align === "left" ? 0 : "auto", right: align === "right" ? 0 : "auto" }}>
      <div style={{ width: isOpen ? "170px" : "30px" }} className={`sidermenu${isOpen ? "active" : ""}`}>
        <div className="top_section">
          <div style={{ marginLeft: isOpen ? "30px" : "0px" }} className="bars">
            {/* <MenuIcon onClick={handleToggleSiderMenu} /> */}
          </div>
        </div>
        <div className={`dropdown-menudash${isOpen ? "active" : ""}`}>
          {menuItems.map((item, index) => (
            <NavLink
              onClick={() => {
                changeSection(item.name);
                setActiveSection(item.name);
                handleToggleSiderMenu();
              }}
              to={item.path} key={index}
              className="link"
            >
              <div
                style={{ marginLeft: isOpen ? "30px" : "0px" }}
                className={`icon ${
                  activeSection === item.name ? "active" : ""
                }`}
              >
                {item.icon}
              </div>
              <div
                style={{ display: isOpen && !isMobileMenuOpen ? "block" : "none", }}
                className={`link_text ${
                  activeSection === item.name ? "active" : ""
                }`}
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};
