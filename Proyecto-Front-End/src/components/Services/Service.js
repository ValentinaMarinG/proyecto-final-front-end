import React, { useState } from "react";
// import service4 from "../../assets/images/services/appweb.jpg";
// import category3 from "../../assets/images/services/consulta.jpg";
// import service2 from "../../assets/images/services/hardupdate.jpg";
// import category1 from "../../assets/images/services/hardware.jpg";
// import category2 from "../../assets/images/services/programación.jpg";
// import service3 from "../../assets/images/services/redes.jpg";
// import service1 from "../../assets/images/services/reparaciones.jpg";
// import category4 from "../../assets/images/services/seguridad.jpg";
// import service5 from "../../assets/images/services/softemp.jpg";

import { ServicesList } from "../ServicesList/ServicesList";

import { Images } from "../../assets/index";

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Modal,
} from "@mui/material";

import "./Service.scss";

export const Service = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showServices, setShowServices] = useState(false);

  const handleOpenServices = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setShowServices(true);
  };

  const handleCloseServices = () => {
    setShowServices(false);
  };

  const categories = [
    {
      categoryId: "1",
      categoryName: "Mantenimiento",
      categoryDescription:
        " Ofrecemos soluciones informáticas integrales para satisfacer todas tus necesidades tecnológicas. Desde el soporte técnico y la reparación de hardware hasta el desarrollo de software a medida.",
      Image: Images.category1,
      categoryActive: true,
    },
    {
      categoryId: "2",
      categoryName: "Desarrollo",
      categoryDescription:
        "Nuestro servicio de programación web ofrece soluciones a medida para tus necesidades digitales.Diseñamos y desarrollamos sitios web profesionales, aplicaciones web y sistemas en línea.",
      Image: Images.category2,
      categoryActive: true,
    },
    {
      categoryId: "3",
      categoryName: "Consultoría",
      categoryDescription: "Nuestros consultores altamente calificados trabajan contigo para identificar desafíos, optimizar procesos y maximizar la eficiencia de tus sistemas y recursos informáticos. Ayudandote a tomar decisiones informadas y estratégicas que impulsen el éxito de tu empresa en la era digital. ",
      Image: Images.category3,
      categoryActive: true,
    },
    {
      categoryId: "4",
      categoryName: "Seguridad",
      categoryDescription: "Nuestro servicio de seguridad informática está diseñado para proteger tu empresa o negocio contra las amenazas cibernéticas en constante evolución. Contamos con un equipo de expertos en seguridad que implementa estrategias proactivas y soluciones avanzadas para salvaguardar tus datos y sistemas críticos.",
      Image: Images.category4,
      categoryActive: true,
    },
    {
      categoryId: "5",
      categoryName: "Cat5",
      categoryDescription: "Description",
      Image: null,
      categoryActive: false,
    },
  ];

  const services = [
    {
      _Id: "1",
      serviceName: "Reparación de hardware",
      categoryId: "1",
      serviceDescription:
        "Servicio de reparación de componentes de hardware dañados o defectuosos en computadoras y dispositivos.",
      Image: Images.service1,
      serviceActive: true,
    },
    {
      _Id: "2",
      serviceName: "Actualización de hardware",
      categoryId: "1",
      serviceDescription:
        "Servicio para mejorar el rendimiento de una computadora mediante la instalación de componentes de hardware más nuevos y potentes.",
      Image: Images.service2,
      serviceActive: true,
    },
    {
      _Id: "3",
      serviceName: "Instalación de redes",
      categoryId: "1",
      serviceDescription:
        "Servicio que incluye la instalación y configuración de redes de computadoras, incluyendo routers y switches.",
      Image: Images.service3,
      serviceActive: true,
    },
    {
      _Id: "4",
      serviceName: "Desarrollo de Aplicaciones Web",
      categoryId: "2",
      serviceDescription:
        " Creación de aplicaciones web personalizadas para empresas y organizaciones.",
      Image: Images.service4,
      serviceActive: true,
    },
    {
      _Id: "5",
      serviceName: "Desarrollo de Software Empresarial",
      categoryId: "2",
      serviceDescription:
        "Creación de software personalizado para empresas que automatiza procesos y mejora la eficiencia.",
      Image: Images.service5,
      serviceActive: true,
    },
  ];

  const selectedCategoryServices = services.filter(
    (service) => service.categoryId === selectedCategoryId
  );

  return (
    <div className="services-page">
      <ServicesList servicesParam={services}></ServicesList>
    </div>

    /* <div className="cards-container">
      {categories.map((category) => {
        if (category.categoryActive) {
          return (
            <Card key={category.categoryId} sx={{ maxWidth: 345, background: "#fff" }} className="card">
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={category.Image}
                  alt={category.categoryName}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {category.categoryName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.categoryDescription}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleOpenServices(category.categoryId)}
                >
                  MÁS INFO
                </Button>
              </CardActions>
            </Card>
          );
        }
      })}
      <div className="services-container">
        {selectedCategoryServices.map((service) => {
          if (service.serviceActive) {
            return (
              <Card key={service._Id} sx={{ maxWidth: 345, background: "#fff" }} className="card">
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={service.Image}
                    alt={service.serviceName}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {service.serviceName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.serviceDescription}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          }
        })}
      </div>
    </div> */
  );
};

export default Service;
