import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";

export const CategoriesForm = () => {
  const initialValues = {
    name: "",
    description: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido"),
    description: Yup.string().required("La descripción es requerida"),
  });

  const onSubmit = (values) => {
    console.log(values);
    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:5000/api/v1/categories", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.status == 200) {
          setShowCategoryForm(false);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(
            "Error de respuesta del servidor:",
            error.response.data
          );
        } else if (error.request) {
          console.error("Error de solicitud HTTP:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      });
  };

  const [showCategoryForm, setShowCategoryForm] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <Form>
          <div className="form">
            <div className="boton-add-category">
              <Button
                variant="contained"
                onClick={() => setShowCategoryForm(true)}
              >
                Agregar categoría <AddCircleSharpIcon />
              </Button>
            </div>
            <div className="category-box-form">
              {showCategoryForm && (
                <>
                  <div className="div-inputs">
                    <div>
                      <Field name="name">
                        {({ field, meta }) => (
                          <TextField
                            required
                            id="name"
                            name="name"
                            placeholder="Nombre"
                            label="Nombre"
                            {...field}
                            className="text-field-categories"
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="error-message"
                      />
                    </div>
                    <div className="div-inputs">
                      <div>
                        <Field name="description">
                          {({ field, meta }) => (
                            <TextField
                              required
                              id="description"
                              description="description"
                              placeholder="Descripción"
                              label="Descripción"
                              {...field}
                              className="text-field-categories"
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="error-message"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="button-accept-category">
                  <Button variant="contained" type="submit">
                    Aceptar
                  </Button>
                  <Button variant="contained" onClick={() => setShowCategoryForm(false)}>
                    Cancelar
                  </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
