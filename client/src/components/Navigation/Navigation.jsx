import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";
import User from "../../assets/CUI.jpg";
import "./Navigation.css";

const Navigation = (user) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
        {true ? (
          <div className="auth_links">
            <span>Kabeer</span>
            <Tooltip title="User Account Area">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 30, height: 30 }}>
                  <img src={User} alt="" className="user_avatar" />
                </Avatar>
              </IconButton>
            </Tooltip>
            <div className="nav-menu">
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <Link to="/Profile">
                  <MenuItem onClick={handleClose}>
                    <img src={User} alt="" className="user_avatar" /> Kabeer
                    Ahmad
                  </MenuItem>
                </Link>
                <Link to="/Wishlist">
                  <MenuItem onClick={handleClose}>My Wishlist</MenuItem>
                </Link>
                <Link to="/Orders">
                  <MenuItem onClick={handleClose}>My Orders</MenuItem>
                </Link>
                <MenuItem onClick={handleClose}>
                  <i className="fa fa-"></i>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </div>
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
