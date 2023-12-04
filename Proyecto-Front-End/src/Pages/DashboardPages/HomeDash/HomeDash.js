import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Avatar, Menu, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import './HomeDash.scss';

export const HomeDash = () => {
  const generarPDF = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/v1/invoice", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "arraybuffer",
      });

      console.log(response.data);
      console.log(response.status);

      const blob = new Blob([response.data], { type: "application/pdf" });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "invoice.pdf";
      link.click();

      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error al generar el usuario:", error);
    }
  };

  const [userData, setUserData] = useState(null);
  const [userDocument, setUserDocument] = useState(null);
  const [userId, setUserId] = useState(null);

  const avatars = require.context(
    "../../../../public/images/avatars",
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

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
    <div className="content-admin-profile-home">
      <div>
        {userData && (
          <div className="admin-profile">
            <label className="Titulo-profile">¡Bienvenido, {userData.firstname}!</label>

            <div className="avatar-container-admin-profile">
              <Avatar
                className="avatar-profile-admin"
                sx={{ bgcolor: "#0d1b2a" }}
                style={{ width: "90px", height: "90px" }}
              >
                {avatarSrc != null ? (
                  <img
                    className="img-avatar"
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

            <label className="info-admin">Información del usuario </label>
            <div className="info-container">
            <div className="label-info-admin"><label>Nombre: {userData.firstname}</label></div>
            <div className="label-info-admin"><label>Apellidos: {userData.lastname}</label></div>
            <div className="label-info-admin"><label>Tipo de documento: {userData.document_type}</label></div>
            <div className="label-info-admin"><label>Documento: {userData.document}</label></div>
            <div className="label-info-admin"><label>Correo electrónico: {userData.email}</label></div>
            <div className="label-info-admin"><label>Número de teléfono: {userData.phone_number}</label></div>
            <div className="label-info-admin"><label>País: {userData.country}</label></div>
            <div className="label-info-admin"><label>Rol: {userData.role}</label></div>
            </div>
            
          </div>
        )}
      </div>
      <div className="botones-admin">
        <div className="boton">
        <Button variant="contained" onClick={generarPDF}>Generar PDF</Button>
        </div>
      <div className="boton">
      <Link to={"/"}>
        <Button variant="contained">Ver página principal</Button>
      </Link>
      </div>
      </div>
    </div>
  );
};
