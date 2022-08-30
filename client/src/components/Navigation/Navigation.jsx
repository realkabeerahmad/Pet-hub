import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./Navigation.css";
const Navigation = (user) => {
  const activeClassName = "is-active";
  return (
    <nav className="nav-bar">
      <div className="nav-logo">
        <img src={Logo} alt="" />
      </div>
      <div className="nav">
        <div className="nav-links">
          {true ? (
            <>
              <NavLink
                exact={true}
                to="/"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/my_pets"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                My Pets
              </NavLink>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                Shop
              </NavLink>
              <NavLink
                to="/adopt"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                Adopt
              </NavLink>
              <NavLink
                to="/community"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                Community
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                exact={true}
                to="/"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                Home
              </NavLink>
            </>
          )}
        </div>
        {user.name === "Kabeer" ? (
          <div className="auth_links">User</div>
        ) : (
          <div className="auth_links">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              Login
            </NavLink>{" "}
            |{" "}
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              Register
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
