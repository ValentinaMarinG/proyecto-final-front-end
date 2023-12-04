import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
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
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import './ChangePassword.scss';

const initialValues = {
  oldpassword: "",
  newpassword: "",
  confirmPassword: "",
};

const validationSchema = Yup.object().shape({
  oldpassword: Yup.string()
    .required("La contraseña es requerida")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Contraseña: 1 mayúscula, 1 minúscula, 1 número, mínimo 8 caracteres."
    ),
  newpassword: Yup.string()
    .required("La contraseña es requerida")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Contraseña: 1 mayúscula, 1 minúscula, 1 número, mínimo 8 caracteres."
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newpassword"), null], "Las contraseñas deben ser iguales")
    .required("Debes confirmar la nueva contraseña"),
});

export const FormPassword = () => {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (values) => {
    console.log(values);
    const tokenDesdeURL = new URLSearchParams(window.location.search).get("token");
    console.log(tokenDesdeURL);
    
    axios
      .post("http://localhost:5000/api/v1/users/user/change-password", values, {
        headers: {
          Authorization: `Bearer ${tokenDesdeURL}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        console.log(response.status);
        if (response.status === 200) {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
          console.log(localStorage.length)
          setShowSuccessMessage(true);
          setTimeout(() => {
            navigate("/login");
          }, 7000);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error de respuesta del servidor:", error.response.data);
          setShowErrorMessage(true);
          setErrorMessage(error.response.data.message);
        } else if (error.request) {
          console.error("Error de solicitud HTTP:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      });
  };
  

  useEffect(() => {
    let timer;
    if (showSuccessMessage) {
      timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showSuccessMessage]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
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
        <div className="textfield-container">
          <div className="form-group-change">
            <Field name="oldpassword">
              {({ field, meta }) => (
                <TextField
                  id="oldpassword"
                  name="oldpassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Antigua contraseña"
                  {...field}
                  className="text-field-3"
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
                  variant="outlined"
                />
              )}
            </Field>
            <ErrorMessage
              name="oldpassword"
              component="div"
              className="error-message-change"
            />
          </div>
          <div className="form-group-change">
            <Field name="newpassword">
              {({ field, meta }) => (
                <TextField
                  id="newpassword"
                  name="newpassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nueva contraseña"
                  {...field}
                  className="text-field-3"
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
                  variant="outlined"
                />
              )}
            </Field>
            <ErrorMessage
              name="newpassword"
              component="div"
              className="error-message-change"
            />
          </div>
          <div className="form-group-change">
            <Field name="confirmPassword">
              {({ field, meta }) => (
                <TextField
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirmar nueva contraseña"
                  {...field}
                  className="text-field-3"
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
                  variant="outlined"
                />
              )}
            </Field>
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="error-message-change"
            />
          </div>
        </div>
        <div className="form-actions-change">
          <Button type="submit" variant="contained" color="primary">
            Confirmar
          </Button>
        </div>
      </Form>
    </Formik>
  );
};
