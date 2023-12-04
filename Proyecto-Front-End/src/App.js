import React, { useEffect, useState } from "react";
import "./App.scss";
import "./index.scss";
import Cubo from "./components/cubo/Cubo";
import Menu from "./components/menu/Menu";
import Flex from "./components/Flex/Flex";
import Contact from "./components/Contacts/Contact";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TranslucentMenu } from "./components/TranslucentMenu/TranslucentMenu";
import ServicesList from "./components/ServicesList/ServicesList";
import { PrivacyPolicies } from "./components/PrivacyPolicies/PrivacyPolicies";
import { Register } from "./components/Register/Register";
import { ResetPassword } from "./components/ResetPassword/ResetPassword";
import { Activation } from "./components/AccountActivation/Activation";
import { User } from "./components/User/User";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { ChangePassword } from "./components/ChangePassword/ChangePassword";
import { Pqrsf } from "./Pages/Pqrsf/Pqrsf";

function App() {
  return (
    <div className="App">
      <Router>
       <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/flex" element={<Flex />} />
        <Route path="/translucent" element={<TranslucentMenu />} ></Route>
        <Route path="/policies" element={<PrivacyPolicies />} ></Route>
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/register" element={<Register/>} ></Route>
        <Route path="/reset-password" element={<ResetPassword/>} ></Route>
        <Route path="/activation" element={<Activation/>} ></Route>
        <Route path="/user" element={<User/>} ></Route>
        <Route path="/dashboard" element={<Dashboard/>} ></Route>
        <Route path="/user/change-password" element={<ChangePassword/>} ></Route>
        <Route path="/ayuda/pqrsf" element={<Pqrsf/>} ></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
