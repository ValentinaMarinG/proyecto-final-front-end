import React from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../../App";
import "./Footer.scss";
import logo from "../../assets/images/logo2.png";
import logouam from "../../assets/images/logoUAM.png";

export const Footer = () => {
  return (
    <div className="Footer">
      <div className="div-footer-grid">
        {/* <div className="titulofooter">
          <label className="label-titulofooter">
            Librería - Compra tus libros desde la comodidad de tu casa
          </label>
        </div> */}
        <Grid className="grid-principal-footer" container spacing={3}>
          <Grid className="grid-syles-1" item xs={12} sm={4} md={4}>
            <div className="grid1-style">
              <label className="contacto-label">CONTACTO</label>
              <label className="label-cont-description">
                libreria@gmail.com{" "}
              </label>
              <label className="label-cont-description">
                valentina.maring@autonoma.edu.co{" "}
              </label>
              <label className="label-cont-description">
                (+57) 3184369690 - (606) 3278189
              </label>
              <label className="contacto-label">REDES SOCIALES</label>
              <div>
                <Link to="https://twitter.com/Lib_Nacional">
                  <svg
                    className="svg-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                  >
                    <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM351.3 199.3v0c0 86.7-66 186.6-186.6 186.6c-37.2 0-71.7-10.8-100.7-29.4c5.3 .6 10.4 .8 15.8 .8c30.7 0 58.9-10.4 81.4-28c-28.8-.6-53-19.5-61.3-45.5c10.1 1.5 19.2 1.5 29.6-1.2c-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3c-9-6-16.4-14.1-21.5-23.6s-7.8-20.2-7.7-31c0-12.2 3.2-23.4 8.9-33.1c32.3 39.8 80.8 65.8 135.2 68.6c-9.3-44.5 24-80.6 64-80.6c18.9 0 35.9 7.9 47.9 20.7c14.8-2.8 29-8.3 41.6-15.8c-4.9 15.2-15.2 28-28.8 36.1c13.2-1.4 26-5.1 37.8-10.2c-8.9 13.1-20.1 24.7-32.9 34c.2 2.8 .2 5.7 .2 8.5z" />
                  </svg>
                </Link>

                <Link to="https://www.instagram.com/librerianacional/">
                  <svg
                    className="svg-icon"
                    viewBox="0 0 448 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z" />
                  </svg>
                </Link>

                <Link to="https://co.linkedin.com/">
                  <svg
                    className="svg-icon"
                    viewBox="0 0 448 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                  </svg>
                </Link>
              </div>
            </div>
          </Grid>
          <Grid className="grid-syles-1" item xs={12} sm={4} md={4}>
            <div className="grid2-style">
              <label className="contacto-label">DIRECCIÓN</label>
              <label className="label-cont-description">
                Cra.21#38-124, Universidad Autónoma de Manizales
              </label>
              <label className="label-cont-description">
                Manizales, Caldas, Colombia
              </label>
              <div className="grid2-title-link">
                <Link to="https://www.google.com/maps/place/Universidad+Aut%C3%B3noma+de+Manizales/@5.0685718,-75.5037043,16z/data=!4m5!3m4!1s0x8e476f8c1179651b:0x18322787cebd6883!8m2!3d5.0679838!4d-75.5030733?hl=es">
                  {" "}
                  <LocationOnIcon style={{ marginLeft: "5px" }} />
                  <label>Ubicación en Google Maps</label>{" "}
                </Link>
              </div>
              <label className="contacto-label">HORARIO DE ATENCIÓN</label>
              <label className="label-cont-description">
                Lunes a Viernes de 8:00 AM a 6:00 PM,
                <br /> Sábado de 9:00 AM a 5:00 PM.
              </label>
            </div>
          </Grid>
          <Grid className="grid-syles-1" item xs={12} sm={4} md={4}>
            <div className="grid3-style">
              <label className="contacto-label">POLíTICAS DE PRIVACIDAD</label>
              <label className="label-cont-description">
                Políticas de privacidad de datos{" "}
                <Link to="/policies" className="location-link">
                  aquí.
                </Link>
              </label>
              <div className="logos">
                <img className="img1" src={logo}></img>
                <img className="img2" src={logouam}></img>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
