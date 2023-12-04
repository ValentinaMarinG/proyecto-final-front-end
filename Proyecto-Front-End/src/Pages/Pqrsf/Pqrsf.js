import React, { useState, useEffect } from "react";
import "./Pqrsf.scss";
import { MenuTop } from "../../components/MenuTop/MenuTop";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { PqrsfForm } from "./PqrsfForm";

export const Pqrsf = () => {
  const [activeButton, setActiveButton] = useState("PQRSF");

  return (
    <div className="Pqrsf-container">
      <div className="Pqrsf-container-header">
        <MenuTop />
      </div>
      <div className="PQRSF">
        <div className="PQRSF-menu">
          <div className="menu-PQRSF">
            <div className="menu-PQRSF-title">
              <label className="menu-PQRSF-title-label">Centro de Ayuda</label>
            </div>
            <div className="ayuda-botones">
              <div className="ayuda-botones-botones">
                <label  className={`label-help-buttoms ${activeButton === "PQRSF" ? "active" : ""}`}>PQRSF</label>
                <Button
                  className={`help-buttoms ${activeButton === "PQRSF" ? "active" : ""}`}
                  color="primary"
                  onClick={() => setActiveButton("PQRSF")}
                >
                  <ArrowForwardIosIcon />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="PQRSF-Form">
          <div className="PQRSF-Form-content">
            <div className="PQRSF-Form-content-title">
              <label className="PQRSF-Form-content-title-label">PQRSF</label>
            </div>
            <PqrsfForm />
          </div>
        </div>
      </div>
    </div>
  );
};
