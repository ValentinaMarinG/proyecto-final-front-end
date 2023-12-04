import React, { useState } from "react";
import "./ServicesList.scss";
import { Fab, Grid, Modal, Box, Button, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloseIcon from "@mui/icons-material/Close";

export const ServicesList = ({ servicesParam }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 0.7,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleOpen = (serviceId) => {
    console.log(serviceId);
    const service = servicesParam.find((service) => service._Id === serviceId);
    setSelectedService(service);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <div className="content-services-list">
      <h2>Services List</h2>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={4}>
            <div className="grid1-style">
              <h2>Grid1</h2>
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <div className="grid2-style">
              <h2>Grid1</h2>
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <div className="grid3-style">
              <h2>Grid1</h2>
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={8} sm={8} md={8}>
            <div className="grid4-style">
              <h2>Servicios</h2>
              <Grid container spacing={2}>
                <Grid
                  className="grid-container-image"
                  item
                  xs={8}
                  sm={8}
                  md={8}
                >
                  <div className="img-content-grid">
                    {servicesParam.length > 0 ? (
                      servicesParam.map((service) => (
                        <div key={service._Id}>
                          <div>
                            <img
                              src={service.Image}
                              alt={service.serviceName}
                              onClick={() => handleOpen(service._Id)}
                            />
                          </div>
                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            {selectedService ? (
                              <Box sx={style}>
                                <div className="close-modal">
                                  <Button onClick={handleClose}>
                                    <CloseIcon />
                                  </Button>
                                </div>
                                <div className="img-modal-container">
                                  <img
                                    className="img-modal"
                                    src={selectedService.Image}
                                    alt={selectedService.serviceName}
                                  />
                                </div>
                                <div className="modal-text-container">
                                  <Typography
                                    id="modal-modal-title"
                                    variant="h6"
                                    component="h2"
                                  >
                                    {selectedService.serviceName}
                                  </Typography>
                                  <Typography
                                    id="modal-modal-description"
                                    sx={{ mt: 2 }}
                                  >
                                    {selectedService.serviceDescription}
                                  </Typography>
                                </div>
                              </Box>
                            ) : (
                              <div>
                                <p>No hay servicio seleccionado</p>
                              </div>
                            )}
                          </Modal>

                          <div className="button-fav-group">
                            <Fab
                              className="button-fab"
                              color="secondary"
                              aria-label="Favorite icon"
                            >
                              <FavoriteIcon />
                            </Fab>
                            <Fab
                              className="button-fab"
                              color="primary"
                              aria-label="Favorite icon"
                            >
                              <AddShoppingCartIcon />
                            </Fab>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No hay servicios</p>
                    )}
                  </div>
                </Grid>
                <Grid item xs={4} sm={4} md={4}>
                  <div className="text-content-grid">
                    {/*servicesParam.length > 0 ? (
                      servicesParam.map((service) => (
                        <div key={service.serviceId}>
                          <p>{service.serviceTitle}</p>
                          <p>{service.serviceDescription}</p>
                        </div>
                      ))
                    ) : (
                      <p>No hay servicios</p>
                    )*/}
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>

          <Grid item xs={4} sm={4} md={4}>
            <div className="grid2-style">
              <h2>Grid2</h2>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
