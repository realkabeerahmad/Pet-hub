import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./Navigation.css";
const Navigation = (user) => {
  return (
    <nav className="nav-bar">
      <div className="nav-logo">
        <img src={Logo} alt="" />
      </div>
      <div className="nav">
        <div className="nav-links">
          {user && user._id ? (
            <>
              <NavLink exact to="/" activeClassName="is-active">
                Home
              </NavLink>
              <NavLink to="/my_pets" activeClassName="is-active">
                My Pets
              </NavLink>
              <NavLink to="/shop" activeClassName="is-active">
                Shop
              </NavLink>
              <NavLink to="/adopt" activeClassName="is-active">
                Adopt
              </NavLink>
              <NavLink to="/community" activeClassName="is-active">
                Community
              </NavLink>
            </>
          ) : (
            <>
              <NavLink exact to="/" activeClassName="is-active">
                Home
              </NavLink>
            </>
          )}
        </div>
        {user && user._id ? (
          <div className="auth_links">User</div>
        ) : (
          <div className="auth_links">
            <NavLink to="/login" activeClassName="is-active">
              Login
            </NavLink>{" "}
            |{" "}
            <NavLink to="/register" activeClassName="is-active">
              Register
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
