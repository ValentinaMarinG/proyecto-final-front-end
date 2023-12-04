import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Users.scss";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TablePagination from "@mui/material/TablePagination";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";

export const Users = () => {
  const columns = [
    { id: "firstname", label: "Nombre", maxWidth: 100 },
    { id: "lastname", label: "Apellido", maxWidth: 100 },
    { id: "document_type", label: "Tipo de documento", maxWidth: 100 },
    { id: "document", label: "Documento", maxWidth: 100 },
    { id: "phone_number", label: "Contacto", maxWidth: 100 },
    { id: "email", label: "Email", maxWidth: 100 },
    { id: "country", label: "País", maxWidth: 100 },
    { id: "state", label: "Estado", maxWidth: 100 },
    { id: "department", label: "Departamento", maxWidth: 100 },
    { id: "municipality", label: "Municipio", maxWidth: 100 },
    { id: "role", label: "Rol", maxWidth: 100 },
    { id: "active", label: "Activo", maxWidth: 100 },
  ];

  const navigate = useNavigate();
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("token");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const getUserData = async (token) => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/users/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        const data = response.data;
        setUserData(data);
        console.log("Nuevo valor de userData:", userData);
      } catch (error) {
        console.error(error);
      }
    };

    getUserData(token);
  }, [token]);

  const actualizarEstadoUsuario = async (userId, newActiveValue) => {
    try {
      console.log(newActiveValue);
      console.log(userId);
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        "http://localhost:5000/api/v1/users/admin/change-active",
        {
          userId: userId,
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
        setShowSuccessMessage(true);
      }
    } catch (error) {
      console.error("Error al actualizar el estado del usuario:", error);

      if (error.response) {
        setShowErrorMessage(true);
        setErrorMessage(error.response.data.message);
      }
    }
  };

  const UserTable = () => {
    const [switchValues, setSwitchValues] = useState({});

    useEffect(() => {
      const initialSwitchValues = {};
      (userData || []).forEach((row) => {
        initialSwitchValues[row.document] = row.active;
      });
      setSwitchValues(initialSwitchValues);
    }, [userData]);

    const handleSwitchChange = async (event, userId) => {
      try {
        setSwitchValues((prevSwitchValues) => ({
          ...prevSwitchValues,
          [userId]: event.target.checked,
        }));

        await actualizarEstadoUsuario(userId, event.target.checked);
      } catch (error) {
        console.error("Error al actualizar el estado del usuario:", error);
      }
    };

    const handleRowClick = (record) => {
      const document = record.documentNumber;
      console.log("Documento seleccionado:", document);
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
            {(userData || [])
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.document}
                  onClick={() => handleRowClick(row)}
                >
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {column.id === "active" ? (
                        <Switch
                          checked={row[column.id]}
                          color="primary"
                          onChange={(event) =>
                            handleSwitchChange(event, row.document)
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
          count={(userData || []).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    );
  };

  return (
    <div>
      <div className="categories-div-title">
        <label className="categories-div-title-label">Usuarios</label>
      </div>
      <div className="Usuarios-registrados"><UserTable/></div>
    </div>
  );
};
