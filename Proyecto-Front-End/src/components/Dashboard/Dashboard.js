import React, { useEffect, useState } from "react";
import axios from "axios";
import { FavoriteIcon, AddShoppingCartIcon } from "@mui/icons-material";
import "./Dashboard.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import StarsIcon from "@mui/icons-material/Stars";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TablePagination from "@mui/material/TablePagination";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { jwtDecode } from "jwt-decode";
import { MenuTop } from "../MenuTop/MenuTop";
import { Menu, MenuItem } from "@mui/material";
import { MenuDashboard } from "../MenuTopDashboard/MenuDashboard";
import { SiderBar } from "../SiderBar/SiderBar";
import { Footer } from "../Footer/Footer";
import { Login } from "../Login/Login";
import MenuIcon from '@mui/icons-material/Menu';
import { Users } from "../../Pages/DashboardPages/Users/Users";
import { Books } from "../../Pages/DashboardPages/Books/Books";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CategoryIcon from "@mui/icons-material/Category";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import DiscountIcon from "@mui/icons-material/Discount";
import HomeIcon from "@mui/icons-material/Home";
import { Categories } from "../../Pages/DashboardPages/Categories/Categories";
import { HomeDash } from "../../Pages/DashboardPages/HomeDash/HomeDash";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';

export const Dashboard = () => {
  const menuItems = [
    {
      /* path: "/dashboard/home", */
      name: "Perfil",
      icon: <PersonIcon />,
    },
    {
     /*  path: "/dashboard/users", */
      name: "Usuarios",
      icon: <PeopleAltIcon />,
    },
    {
      /* path: "/dashboard/books", */
      name: "Libros",
      icon: <AutoStoriesIcon />,
    },
    {
      /* path: "/dashboard/categories", */
      name: "Categorias",
      icon: <CategoryIcon />,
    },
    
  ];

  const navigate = useNavigate();
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("token");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(null);

  const [currentSection, setCurrentSection] = useState("Perfil");

  const handleSectionChange = (section) => {
    console.log(section);
    setCurrentSection(section);
  };

  const renderDashboardSection = () => {
    switch (currentSection) {
      case "Perfil":
        return <HomeDash/>;
      case "Usuarios":
        return <Users/>;
      case "Libros":
        return <Books/>;
      case "Categorias":
        return <Categories/>;
        case "Pedidos":
        return null;
      default:
        return null;
    }
  };

  const handleDropdownOpen = (event) => {
    setIsDropdownOpen(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  const openModal1 = () => {
    setIsModalOpen1(true);
  };

  const closeModal1 = () => {
    setIsModalOpen1(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    console.log(localStorage.length);
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  const getDocumentFromToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const document = decodedToken?.user_document;
      return document;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const [isSiderMenuOpen, setIsSiderMenuOpen] = useState(false);

  const handleToggleSiderMenu = () => {
    setIsSiderMenuOpen(!isSiderMenuOpen);
  };

  return (
    <div
      className="content-dashboard">
      <div className="dashboard-header">
        <MenuDashboard
          className="MenuTopp"
          handleDropdownOpen={handleDropdownOpen}
          handleToggleSiderMenu={handleToggleSiderMenu}
        />
      </div>
      <div className="dashboard-body">
        <div className="sider-dash-con">
        <SiderBar
            handleToggleSiderMenu={handleToggleSiderMenu}
            isOpen={isSiderMenuOpen}
            changeSection={handleSectionChange}
            menuItems={menuItems}
            align={"left"}
          />
        </div>
        <div className="div-componentes">
        {renderDashboardSection()}
        </div>
          <div className="tablas">
            {showSuccessMessage && (
              <Alert
                className="alert-success"
                severity="success"
                onClose={() => {
                  setShowSuccessMessage(false);
                }}
              >
                <AlertTitle>¡Exitoso!</AlertTitle>
                El usuario esta activo en el sistema
              </Alert>
            )}
            <Menu
              anchorEl={isDropdownOpen}
              open={Boolean(isDropdownOpen)}
              onClose={handleDropdownClose}
              className="menu-desplegable"
            >
              {/* <MenuItem className="menuitem" onClick={handleDropdownClose}>
                <Button onClick={openModal1}> Mi perfil</Button>
              </MenuItem> */}
              <MenuItem className="menuitem" onClick={handleDropdownClose}>
                <Button onClick={openModal1}>Cerrar sesión</Button>
              </MenuItem>
            </Menu>
            <Modal
              open={isModalOpen1}
              onClose={closeModal1}
              className="styles-modal-cerrar-sesion-admin"
            >
              <Box>
                <div className="custom-modal-admin">
                  <label className="custom-modal-title-admin">
                    ¿Estás seguro de que deseas cerrar sesión?
                  </label>
                  <div className="div-buttons-admin">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={handleLogout}
                    >
                      Aceptar
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={closeModal1}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </Box>
            </Modal>
          </div>
      </div>
    </div>
  );
};
