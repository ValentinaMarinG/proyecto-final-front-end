import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Activation.scss";

export const Activation = () => {
  const navigate = useNavigate();

  const [activationStatus, setActivationStatus] = useState("loading");

  useEffect(() => {
    const tokenDesdeURL = new URLSearchParams(window.location.search).get(
      "token"
    );
    console.log(tokenDesdeURL);

    if (tokenDesdeURL) {
      axios
        .post(
          "http://localhost:5000/api/v1/auth/activation",
          { token: tokenDesdeURL },
          {
            headers: {
              Authorization: `Bearer ${tokenDesdeURL}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setActivationStatus("success");
            setTimeout(() => {
              navigate("/login");
            }, 6000);
          } else {
            setActivationStatus("error");
          }
        })
        .catch((error) => {
          console.error("Error al activar la cuenta:", error);
          setActivationStatus("error");
        });
    } else {
      setActivationStatus("error");
    }
  }, []);

  return (
    <div className="content-activation">
      <div className="activation-card">
        <div className="activation-card-header">
          <label className="activation-card-header">Activación de cuenta</label>
        </div>
        <div className="activation-message">
        {activationStatus === "loading" && <label className="message-activation-label">Cargando...</label>}
        {activationStatus === "success" && (
          <label className="message-activation-label">
            Tu cuenta ha sido activada. Ya puedes ingresar a tu cuenta. Inicia
            sesión!
          </label>
        )}
        {activationStatus === "error" && <label className="message-activation-label">Error al activar la cuenta.</label>}
        </div>
      </div>
    </div>
  );
};
