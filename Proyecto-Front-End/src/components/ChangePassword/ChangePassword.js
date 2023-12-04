import React from "react";
import { useLocation } from "react-router-dom";
import { FormPassword } from "./FormPassword";
import './ChangePassword.scss';

export const ChangePassword = () => {
  return (
    <div className="content-change">
      <div className="change-card">
        <div className="change-card-header">
          <label className="header-change-title">Restablecer contraseña</label>
        </div>
        <div className="contenido-change">
          {/* <label className="change-label">Completa los campos</label> */}
          <FormPassword/>
        </div>
      </div>
    </div>
  )
};
