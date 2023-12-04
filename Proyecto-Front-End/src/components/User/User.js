import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { MenuTop } from "../MenuTop/MenuTop";
import { Menu, MenuItem } from "@mui/material";
import "./User.scss";
import { SiderBar } from "../SiderBar/SiderBar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LockIcon from "@mui/icons-material/Lock";
import CancelIcon from "@mui/icons-material/Cancel";
import HomeIcon from "@mui/icons-material/Home";
import { Avatar} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

export const User = () => {
  const menuItems = [
    {
      /* path: "/user/profile", */
      name: "Perfil",
      icon: <AccountCircleIcon />,
    },
    {
      path: "/user/change-password",
      name: "Cambiar contraseña",
      icon: <LockIcon />,
    },
    {
      name: "Cancelar cuenta",
      icon: <CancelIcon />,
    },
    {
      name: "Cerrar sesión",
      icon: <ExitToAppIcon />,
    },
  ];

  const [currentSection, setCurrentSection] = useState("Home");

  const handleSectionChange = (section) => {
    console.log(section);
    setCurrentSection(section);
  };

  const renderDashboardSection = () => {
    if (currentSection == "Cerrar sesión") {
      openModal1();
    } else if (currentSection == "Cancelar cuenta") {
      openModal2();
    }
  };

  useEffect(() => {
    renderDashboardSection();
  }, [currentSection]);

  const [isSiderMenuOpen, setIsSiderMenuOpen] = useState(false);

  const handleToggleSiderMenu = () => {
    setIsSiderMenuOpen(!isSiderMenuOpen);
  };

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(null);

  const handleDropdownOpen = (event) => {
    setIsDropdownOpen(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const openModal1 = () => {
    setIsModalOpen1(true);
    handleDropdownClose(false);
  };

  const closeModal1 = () => {
    setIsModalOpen1(false);
    setCurrentSection("Home");
  };

  const openModal2 = () => {
    setIsModalOpen2(true);
    handleDropdownClose(false);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
    setCurrentSection("Home");
  };

  const getIdFromToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const id = decodedToken?.user_id;
      return id;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const handleCancelAccount = async () => {
    try {
      const token = localStorage.getItem("token");

      const id = getIdFromToken(token);

      const response = await axios.patch(
        `http://localhost:5000/api/v1/users/${id}`,
        {
          active: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      console.log(response.status);

      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        /* setShowSuccessMessage(true); */
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Error al cancelar la cuenta:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    console.log(localStorage.length);
    setTimeout(() => {
      navigate("/login");
    }, 4000);
  };

  const [userData, setUserData] = useState(null);
  const [userDocument, setUserDocument] = useState(null);
  const [userId, setUserId] = useState(null);

  const avatars = require.context(
    "../../../public/images/avatars",
    false,
    /.(png|jpe?g|svg)$/
  );

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const decodedToken = jwtDecode(token);
          console.log(decodedToken);
          setUserId(decodedToken?.user_id);
          setUserDocument(decodedToken?.user_document);

          const response = await axios.get(
            "http://localhost:5000/api/v1/users/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setUserData(response.data);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error al obtener información del usuario:", error);
      }
    };

    fetchData();
  }, [token, navigate]);

  return (
    <div className="userPage-content">
      <MenuTop
        /* handleDropdownOpen={handleDropdownOpen} */ handleDropdownOpen={
          handleToggleSiderMenu
        }
      />
      <div className="contenido">
        <div>
          <SiderBar
            handleToggleSiderMenu={handleToggleSiderMenu}
            isOpen={isSiderMenuOpen}
            changeSection={handleSectionChange}
            menuItems={menuItems}
            align={"rigth"}
          />
        </div>
        <div>
        {userData && (
          <div className="userr-profile">
            <label className="Titulo-profile-user">¡Bienvenido, {userData.firstname}!</label>

            <div className="avatar-container-user-profile">
              <Avatar
                className="avatar-profile-user"
                sx={{ bgcolor: "#0d1b2a" }}
                style={{ width: "90px", height: "90px" }}
              >
                {avatarSrc != null ? (
                  <img
                    className="img-avatar-user-profile"
                    src={avatars(`./${userDocument}.png`)}
                    alt="Avatar"
                  />
                ) : (
                  <AccountCircle
                    style={{ fontSize: "110px", color: "#f0ebd8" }}
                  />
                )}
              </Avatar>
            </div>

            <label className="info-user">Información del usuario </label>
            <div className="info-container">
            <div className="label-info-user"><label>Nombre: {userData.firstname}</label></div>
            <div className="label-info-user"><label>Apellidos: {userData.lastname}</label></div>
            <div className="label-info-user"><label>Tipo de documento: {userData.document_type}</label></div>
            <div className="label-info-user"><label>Documento: {userData.document}</label></div>
            <div className="label-info-user"><label>Correo electrónico: {userData.email}</label></div>
            <div className="label-info-user"><label>Número de teléfono: {userData.phone_number}</label></div>
            <div className="label-info-user"><label>País: {userData.country}</label></div>
            <div className="label-info-user"><label>Rol: {userData.role}</label></div>
            </div>
            
          </div>
        )}
      </div>
        {/* <Menu
           anchorEl={isDropdownOpen}
           open={Boolean(isDropdownOpen)}
           onClose={handleDropdownClose}
           className="menu-desplegable"
           style={{ top: 20 }}
        >
          <MenuItem className="menuitem" onClick={handleDropdownClose}><Button onClick={openModal1}>Cerrar sesión</Button></MenuItem>
          <MenuItem className="menuitem" onClick={handleDropdownClose}><Button onClick={openModal2}>Cancelar cuenta</Button></MenuItem>
          <MenuItem className="menuitem" onClick={handleDropdownClose}>
            <Link to={`/user/change-password?token=${token}`}>
              <Button>Cambiar contraseña</Button>
            </Link>
          </MenuItem>
        </Menu> */}
        <Modal
          open={isModalOpen1}
          onClose={closeModal1}
          className="styles-modal-cerrar-sesion-user"
        >
          <Box>
            <div className="custom-modal">
              <label className="custom-modal-title">
                ¿Estás seguro de que deseas cerrar sesión?
              </label>
              <div className="div-buttons">
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
        {showSuccessMessage && (
          <Alert
            className="alert-success"
            severity="success"
            onClose={() => {}}
          >
            <AlertTitle>¡Exitoso!</AlertTitle>
            La contraseña se ha actualizado con exitos —{" "}
            <strong>Inicia sesión!</strong>
          </Alert>
        )}
        <Modal
          open={isModalOpen2}
          onClose={closeModal2}
          className="styles-modal-cerrar-sesion-user"
        >
          <Box>
            <div className="custom-modal">
              <label className="custom-modal-title">
                ¿Estás seguro de que deseas cancelar tu cuenta?
              </label>
              <div className="div-buttons">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleCancelAccount}
                >
                  Aceptar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={closeModal2}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};
