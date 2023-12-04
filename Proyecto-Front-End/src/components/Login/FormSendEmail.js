import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
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
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const initialValues = {
  email: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("El correo es requerido"),
});

export const FormSendEmail = ({ handleCloseModal }) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = (values) => {
    console.log(values);
    axios
      .post("http://localhost:5000/api/v1/users/email", values)
      .then((response) => {
        console.log(response.data);
        console.log(response.status);
        if (response.status === 200) {
          setShowSuccessMessage(true);
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
    <div className="modal-Contenido">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <div className="modal-description">
          <Form className="form-send-email">
            <div className="modal-title">
              <label className="modal-title-title">
                Restablece tu contraseña
              </label>
            </div>
            {showSuccessMessage && (
              <Alert
                className="alert-success"
                severity="success"
                onClose={() => {}}
              >
                <AlertTitle>¡Enviado!</AlertTitle>
                Envio exitoso —{" "}
                <strong>Revisa tu correo!</strong>
              </Alert>
            )}
            <div className="label-send-email">
              <label>
                Ingresa el correo registrado a tu cuenta y te enviaremos un link
                para restablecer la contraseña.
              </label>
            </div>
            <div className="email-part">
              <Field name="email">
                {({ field, form }) => (
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
                    variant="outlined"
                  />
                )}
              </Field>
              <ErrorMessage
                name="email"
                component="div"
                className="error-message-send-email-reset"
              />
            </div>
            <div className="buttons-modal">
              <Button type="submit" variant="contained" color="primary">
                Enviar
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleCloseModal}
              >
                Cancelar
              </Button>
            </div>
          </Form>
        </div>
      </Formik>
    </div>
  );
};
