import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import Input from "@mui/material/Input";
import { navigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const getRoleFromToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const role = decodedToken?.user_role;
    return role;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const getActiveFromToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const active = decodedToken?.user_active;
    return active;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("El correo es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
});

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = (values) => {
    console.log(values);
    axios
      .post("http://localhost:5000/api/v1/auth/login", values)
      .then((response) => {
        console.log(response.data);
        console.log(response.status);
        if (response.status === 200) {
          const token = response.data.access;
          const refresh_token = response.data.refresh;
          localStorage.setItem("token", token);
          localStorage.setItem("refresh_token", refresh_token);
          console.log(localStorage.getItem("token"));
          console.log(localStorage.getItem("refresh_token"));
          const decodedToken = jwtDecode(token);
          console.log('decode',decodedToken);
          const rol = getRoleFromToken(token);
          console.log("rol", rol);
          const activo = getActiveFromToken(token);
          console.log("activo", activo);
          if (rol === "user") {
            navigate("/user");
          } else if (rol === "admin"){
            navigate("/dashboard");
          } else {
            navigate("/");
          }
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(
            "Error de respuesta del servidor:",
            error.response.data
          );
          setShowErrorMessage(true);
          setErrorMessage(error.response.data.message);
        } else if (error.request) {
          console.error("Error de solicitud HTTP:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="form-group">
          <Field name="email">
            {({ field, meta }) => (
              <TextField
                id="email"
                name="email"
                label="Correo electrónico"
                {...field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            )}
          </Field>
          <ErrorMessage
            name="email"
            component="div"
            className="error-message-login"
          />
        </div>
        <div className="form-group">
          <Field name="password">
            {({ field, meta }) => (
              <TextField
                id="password"
                name="password"
                label="Contraseña"
                {...field}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            )}
          </Field>
          <ErrorMessage
            name="password"
            component="div"
            className="error-message-login"
          />
        </div>
        <div className="form-actions-login">
          <button type="submit">Iniciar sesión</button>
        </div>
      </Form>
    </Formik>
  );
};
