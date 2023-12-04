import React from "react";
import "./ResetPassword.scss";
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
import Backdrop from "@mui/material/Backdrop";
import { FormReset } from "./FormReset";

export const ResetPassword = () => {
  return (
    <div className="content-reset">
      <div className="reset-card">
        <div className="reset-card-header">
          <label className="header-title">Restablecer contraseña</label>
        </div>
        <div className="contenido-reset">
          <h5>Ingresa tu nueva contraseña</h5>
          <FormReset/>
        </div>
      </div>
    </div>
  );
};
