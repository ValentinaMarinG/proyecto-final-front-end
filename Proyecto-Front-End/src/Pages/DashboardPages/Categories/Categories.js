import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Switch,
  TablePagination,
} from "@mui/material";
import { Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";
import { CategoriesForm } from "./CategoriesForm";
import axios from "axios";
import './Categories.scss';

export const Categories = () => {
  const columns = [
    { id: "name", label: "Categoria", maxWidth: 50 },
    { id: "description", label: "Descripción", maxWidth: 50 },
    { id: "active", label: "Estado", maxWidth: 50 },
  ];

  const navigate = useNavigate();
  const [categoriesData, setCategoriesData] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getCategories = async (token) => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/categories/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        const data = response.data;
        setCategoriesData(data);
        console.log("Nuevo valor de categoriesData:", categoriesData);
      } catch (error) {
        console.error(error);
      }
    };

    getCategories(token);
  }, [token]);

  const actualizarEstadoCategorias = async (categoryId, newActiveValue) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:5000/api/v1/categories/${categoryId}`,  
        {
          active: newActiveValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log(response.data);
      console.log(response.status);
  
      if (response.status === 200) {
        console.log('actualizado')
      }
    } catch (error) {
      console.error("Error al actualizar el estado de la categoria:", error);
  
      if (error) {
        console.error(error);
      }
    }
  };
  

  const CategoryTable = () => {
    const [switchValues, setSwitchValues] = useState({});

    useEffect(() => {
      const initialSwitchValues = {};
      (categoriesData || []).forEach((row) => {
        initialSwitchValues[row.id] = row.active;
      });
      setSwitchValues(initialSwitchValues);
    }, [categoriesData]);

    const handleSwitchChange = async (event, categoryId) => {
      try {
        setSwitchValues((prevSwitchValues) => ({
          ...prevSwitchValues,
          [categoryId]: event.target.checked,
        }));

        await actualizarEstadoCategorias(categoryId, event.target.checked);
      } catch (error) {
        console.error("Error al actualizar el estado de la categoria:", error);
      }
    };

    const handleRowClick = (record) => {
      const id = record._id;
      console.log("Documento seleccionado:", id);
    };

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ maxWidth: column.maxWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(categoriesData || [])
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((row) => (
                <TableRow key={row._id} onClick={() => handleRowClick(row)}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {column.id === "active" ? (
                        <Switch
                          checked={row[column.id]}
                          color="primary"
                          onChange={(event) =>
                            handleSwitchChange(event, row._id)
                          }
                        />
                      ) : row[column.id] !== "" && row[column.id] !== null ? (
                        String(row[column.id])
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={(categoriesData || []).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    );
  };

  return (
    <div className="category-page-content">
      <div className="categories-div-title">
        <label className="categories-div-title-label">Categorias</label>
      </div>
      <div className="form-categories">
        <CategoriesForm />
      </div>
      <div>
        <CategoryTable />
      </div>
    </div>
  );
};
