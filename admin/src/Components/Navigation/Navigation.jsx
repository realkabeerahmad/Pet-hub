import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import Logo from "../../assets/logo.png";

const Navigation = () => {
  return (
    <nav className="nav-bar" id="pre-nav">
      <ul className="nav-bar-container">
        <NavLink className="brand-logo" exact to="/">
          <img className="brand-img" src={Logo} alt="Pet Hub" />
          Pethub
        </NavLink>
        <li className="nav-item">
          <NavLink exact to="/" activeClassName="is-active">
            Overview
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/AddProducts" activeClassName="is-active">
            Add Products
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/AddPets" activeClassName="is-active">
            Add Pets
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
