import React from "react";
import "./Login.scss";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Form } from "react-router-dom";
import { Button } from "@mui/material";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { LoginForm } from "./LoginForm";
import Backdrop from "@mui/material/Backdrop";
import { FormSendEmail } from "./FormSendEmail";
import logo from '../../assets/images/logo.png';

export const Login = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="content-login">
      {/* <div className="flecha-atras">
        <Link to="/">
          <ArrowBack />
          <h4>Atrás</h4>
        </Link>
      </div> */}
      <div className="login-card">
        <div className="login-card-header">
          <div className="profile-in-header">
            <AccountCircle
              className="profile-icon"
              /* style={{ fontSize: "125px" }} */
            />
          </div>
        </div>
        <div className="contenido-login">
          <label className="inicio">Inicia sesión en tu cuenta</label>
          <LoginForm />
          <div className="opciones-contraseña">
            <div>
              <h5>
                ¿Olvidaste tu contraseña?
                <Button
                  className="recuperar-cont"
                  type="link"
                  onClick={handleOpenModal}
                >
                  Restaurar contraseña
                </Button>
              </h5>
            </div>
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              className="styles-modal-pass"
              BackdropComponent={Backdrop}
              BackdropProps={{
                style: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
              }}
            >
              <Box>
              <FormSendEmail handleCloseModal={handleCloseModal}/>
              </Box>
            </Modal>
            {/* <div>
            <h5>
              ¿Deseas cambiar tu contraseña?
              <Button className="cambiar-contra" type="link">
                Cambiar contraseña
              </Button>
            </h5>
          </div> */}
          </div>
          <div className="ir-a-registrase">
            <label className="label-yacuenta">
              ¿No tienes cuenta?
              <Link to={"/register"}>
                <Button className="cambiar-contra" type="link">
                  Registrate
                </Button>
              </Link>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
