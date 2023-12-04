import React from "react";
import "./Register.scss";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Avatar, Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { RegisterForm } from "./RegisterForm";

export const Register = () => {
  return (
    <div className="register">
      <div className="register-content">
        <div className="register-container">
          <div className="register-container-header">Registro de usuarios</div>
          <div className="register-form">
            <label>Completa el formulario para registrarte</label>
            <RegisterForm />
            <div className="ir-a-login">
              <label className="yacuenta">
                ¿Ya tienes cuenta?
                <Link to={"/login"}>
                  <Button type="link">Iniciar sesión</Button>
                </Link>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
