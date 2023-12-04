import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Avatar } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import "./Register.scss";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const { Option } = Select;

const initialValues = {
  firstname: "",
  lastname: "",
  country: "",
  department: "",
  municipality: "",
  state: "",
  document_type: "",
  document: "",
  phone_number: "",
  email: "",
  password: "",
  confirmPassword: "",
  avatar: null,
  checkterms: false,
};

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("El nombre es requerido"),
  lastname: Yup.string().required("El apellido es requerido"),
  email: Yup.string()
    .email("Correo inválido")
    .matches(
      /@(gmail\.com|outlook\.com|autonoma\.edu\.co)$/,
      "El dominio del correo no es válido"
    )
    .required("El correo es requerido"),
  password: Yup.string()
    .required("La contraseña es requerida")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Contraseña: 1 mayúscula, 1 minúscula, 1 número, mínimo 8 caracteres."
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben ser iguales")
    .required("Debes confirmar la contraseña"),
  document_type: Yup.string()
    .required("El tipo de documento es requerido")
    .oneOf(
      [
        "Tarjeta de identidad",
        "Cédula de ciudadanía",
        "Cédula de extranjería",
        "Pasaporte",
      ],
      "Tipo de documento inválido"
    ),
  document: Yup.string()
    .required("El documento es requerido")
    .matches(/^[0-9]+$/, "El documento debe contener solo números"),
  phone_number: Yup.string().required("El celular es requerido"),
  country: Yup.string().required("El país es requerido"),
  checkterms: Yup.boolean()
    .oneOf([true], "Debes aceptar los términos y condiciones")
    .required("Debes aceptar los términos y condiciones"),
});

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedTipoDocumento, setSelectedTipoDocumento] = useState("");
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [paises, setPaises] = useState([]);

  const [showAvatarGrid, setShowAvatarGrid] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [avatarImageURL, setAvatarImageURL] = useState("");

  const handleAvatarGrid = () => {
    setShowAvatarGrid(true);
  };

  const handleSelectAvatar = (imageUrl) => {
    setSelectedAvatar(imageUrl);
    setAvatarImageURL(imageUrl);
    console.log(avatarImageURL);
    setShowAvatarGrid(false);
  };

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const { confirmPassword, checkterms, avatar, document, ...data } = values;
    console.log("Datos a enviar:", data);
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }

    if (avatar) {
      formData.append("avatar", avatar, `${document}.png`);
      console.log("hola", document);
    }
    formData.append("document", document);

    axios
      .post("http://localhost:5000/api/v1/auth/register", formData)
      .then((response) => {
        if (response.status === 201) {
          setShowSuccessMessage(true);
          /* setTimeout(() => {
            navigate("");
          }, 3000);
          navigate("/login"); */
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setSubmitting(false);
        resetForm();
      });
  };

  useEffect(() => {
    fetchPaises();
  }, []);

  const fetchDepartamentos = async () => {
    try {
      const response = await axios.get(
        "https://www.datos.gov.co/resource/xdk5-pm3f.json?$select=departamento"
      );
      const dataFilter = [...new Set(response.data.map(JSON.stringify))].map(
        JSON.parse
      );

      const sortedDepartamentos = dataFilter.sort((a, b) =>
        a.departamento.localeCompare(b.departamento)
      );

      setDepartamentos(sortedDepartamentos);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMunicipios = async (departamento) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.datos.gov.co/resource/xdk5-pm3f.json?$select=municipio&departamento=${departamento}`
      );

      const sortedMunicipios = response.data.sort((a, b) =>
        a.municipio.localeCompare(b.municipio)
      );

      setMunicipios(sortedMunicipios);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const fetchPaises = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name"
      );

      const nombresPaises = response.data.map((pais) => pais.name.common);

      const sortedNombresPaises = nombresPaises.sort();

      setPaises(sortedNombresPaises);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
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

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setSelectedAvatar(URL.createObjectURL(file));
      setFieldValue("avatar", file);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, setSubmitting, resetForm }) => (
        <Form encType="multipart/form-data">
          {showSuccessMessage && (
            <Alert
              className="alert-success"
              severity="success"
              onClose={() => {}}
            >
              <AlertTitle>¡Exitoso!</AlertTitle>
              El registro se ha completado exitosamente —{" "}
              <strong>Ingresa a tu correo y activa tu cuenta!</strong>
            </Alert>
          )}
          <div className="form-group-regis">
            <div className="div-inputs">
              <Field name="firstname">
                {({ field, meta }) => (
                  <TextField
                    required
                    id="firstname"
                    name="firstname"
                    placeholder="Nombre"
                    {...field}
                    className="text-field"
                  />
                )}
              </Field>
              <ErrorMessage
                name="firstname"
                component="div"
                className="error-message"
              />
            </div>
            <div className="div-inputs">
              <Field name="lastname">
                {({ field, meta }) => (
                  <TextField
                    required
                    id="lastname"
                    name="lastname"
                    placeholder="Apellido(s)"
                    {...field}
                    className="text-field"
                  />
                )}
              </Field>
              <ErrorMessage
                name="lastname"
                component="div"
                className="error-message"
              />
            </div>
          </div>
          <div className="form-group-regis">
            <div className="div-inputs">
              <Field name="document_type">
                {({ field, form }) => (
                  <TextField
                    select
                    label="Tipo de documento"
                    {...field}
                    onChange={(e) =>
                      form.setFieldValue("document_type", e.target.value)
                    }
                    onBlur={field.onBlur}
                    error={
                      form.touched.document_type &&
                      Boolean(form.errors.document_type)
                    }
                    className="text-field"
                  >
                    <MenuItem value="" disabled>
                      Tipo de documento
                    </MenuItem>
                    <MenuItem value="Tarjeta de identidad">
                      Tarjeta de identidad
                    </MenuItem>
                    <MenuItem value="Cédula de ciudadanía">
                      Cédula de ciudadanía
                    </MenuItem>
                    <MenuItem value="Cédula de extranjería">
                      Cédula de extranjería
                    </MenuItem>
                    <MenuItem value="Pasaporte">Pasaporte</MenuItem>
                  </TextField>
                )}
              </Field>
              <ErrorMessage
                name="document_type"
                component="div"
                className="error-message"
              />
            </div>
            <div className="div-inputs">
              <Field name="document">
                {({ field, meta }) => (
                  <TextField
                    required
                    id="document"
                    name="document"
                    placeholder="Documento"
                    {...field}
                    className="text-field"
                  />
                )}
              </Field>
              <ErrorMessage
                name="document"
                component="div"
                className="error-message"
              />
            </div>
          </div>
          <div className="form-group-regis">
            <div className="div-inputs">
              <Field name="country">
                {({ field, form }) => (
                  <TextField
                    id="country"
                    name="country"
                    select
                    label="Selecciona un país"
                    {...field}
                    onChange={(e) => {
                      form.setFieldValue("country", e.target.value);
                      if (e.target.value === "Colombia") {
                        fetchDepartamentos();
                      }
                    }}
                    onBlur={field.onBlur}
                    error={form.touched.country && Boolean(form.errors.country)}
                    className="text-field"
                  >
                    <MenuItem value="" disabled>
                      Selecciona un país
                    </MenuItem>
                    {paises.map((pais) => (
                      <MenuItem key={pais} value={pais}>
                        {pais}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </Field>
              <ErrorMessage
                name="country"
                component="div"
                className="error-message"
              />
            </div>
            <div className="div-inputs">
              <Field name="state">
                {({ field, meta }) => (
                  <TextField
                    required
                    id="state"
                    name="state"
                    placeholder="Estado"
                    disabled={
                      values.country === "Colombia" || values.country === ""
                    }
                    {...field}
                    className="text-field"
                  />
                )}
              </Field>
              <ErrorMessage
                name="state"
                component="div"
                className="error-message"
              />
            </div>
          </div>
          <div className="form-group-regis">
            <div className="div-inputs">
              <Field name="department">
                {({ field, form }) => (
                  <TextField
                    id="department"
                    name="department"
                    select
                    label="Selecciona un departamento"
                    disabled={Boolean(loading || !departamentos.length)}
                    {...field}
                    onChange={(e) => {
                      form.setFieldValue("department", e.target.value);
                      fetchMunicipios(e.target.value);
                    }}
                    onBlur={field.onBlur}
                    error={
                      form.touched.department && Boolean(form.errors.department)
                    }
                    helperText={
                      form.touched.department && form.errors.department
                    }
                    className="text-field"
                  >
                    <MenuItem value="" disabled>
                      Selecciona un departamento
                    </MenuItem>
                    {departamentos.map((departamento) => (
                      <MenuItem
                        key={departamento.departamento}
                        value={departamento.departamento}
                      >
                        {departamento.departamento}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </Field>
              <ErrorMessage
                name="department"
                component="div"
                className="error-message"
              />
            </div>
            <div className="div-inputs">
              <Field name="municipality">
                {({ field, form }) => (
                  <TextField
                    id="municipality"
                    name="municipality"
                    select
                    label="Selecciona un municipio"
                    disabled={Boolean(loading || !municipios.length)}
                    {...field}
                    onChange={(e) =>
                      form.setFieldValue("municipality", e.target.value)
                    }
                    onBlur={field.onBlur}
                    error={
                      form.touched.municipality &&
                      Boolean(form.errors.municipality)
                    }
                    helperText={
                      form.touched.municipality && form.errors.municipality
                    }
                    className="text-field"
                  >
                    <MenuItem value="" disabled>
                      Selecciona un municipality
                    </MenuItem>
                    {municipios.map((municipio) => (
                      <MenuItem
                        key={municipio.municipio}
                        value={municipio.municipio}
                      >
                        {municipio.municipio}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </Field>
              <ErrorMessage
                name="municipality"
                component="div"
                className="error-message"
              />
            </div>
          </div>
          <div className="form-group-regis">
            {/* <div className="div-avatar">
              <h5>Opcional*. Seleccionar un avatar</h5>
               <Field name="avatar">
                {({ field, form }) => (
                  <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={(event) => {
                    setFieldValue("avatar", event.currentTarget.files[0]);
                    setSelectedAvatar(URL.createObjectURL(event.currentTarget.files[0])); 
                  }}
                />
                )}
              </Field>
              <Avatar
                className="avatar-register"
                sx={{ bgcolor: "#0d1b2a" }}
                style={{ width: "150px", height: "150px" }}
              >
                {selectedAvatar  ? (
                  <img src={selectedAvatar} alt="Avatar" />
                ) : (
                  <AccountCircle
                    style={{ fontSize: "125px", color: "#f0ebd8" }}
                  />
                )}
              </Avatar>
            </div> */}
            <div className="div-inputs">
              <Field name="phone_number">
                {({ field, meta }) => (
                  <TextField
                    required
                    id="phone_number"
                    name="phone_number"
                    placeholder="Número de celular"
                    {...field}
                    className="text-field"
                  />
                )}
              </Field>
              <ErrorMessage
                name="phone_number"
                component="div"
                className="error-message"
              />
            </div>
            <div className="div-inputs">
              <Field name="email">
                {({ field, meta }) => (
                  <TextField
                    required
                    id="email"
                    name="email"
                    placeholder="Correo electrónico"
                    {...field}
                    className="text-field"
                  />
                )}
              </Field>
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>
          </div>
          <div className="form-group-regis">
              <div className="div-inputs">
                <Field name="password">
                  {({ field, meta }) => (
                    <TextField
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Contraseña"
                      {...field}
                      className="text-field"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="div-inputs">
                <Field name="confirmPassword">
                  {({ field, meta }) => (
                    <TextField
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirmar contraseña"
                      {...field}
                      className="text-field"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
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
                  className="error-message"
                />
              </div>
            </div>
          <div className="terminosycondiciones">
            <Field name="checkterms">
              {({ field, form }) => (
                <Checkbox
                  id="checkterms"
                  {...field}
                  checked={values.checkterms}
                  onChange={(e) => setFieldValue("checkterms", true)}
                />
              )}
            </Field>
            <label>
              Aceptar términos y condiciones. <br/>
              Para más información 
              sobre las políticas de servicio y privacidad
              ingrese <Link to="/policies">aquí.</Link>
            </label>
          </div>
          <ErrorMessage
            name="checkterms"
            component="div"
            className="error-message"
          />
          <div className="form-actions">
            <button type="submit">Registrar</button>
            <Link to={"/"}>
              <button>Cancelar</button>
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};
