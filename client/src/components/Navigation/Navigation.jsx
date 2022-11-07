import {
  Avatar,
  // Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import User from "../../assets/CUI.jpg";
import "./Navigation.css";

const Navigation = ({ login, setLogin }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const Navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setLogin(false);
    handleClose();
    Navigate("/login");
  };
  const activeClassName = "is-active";
  return (
    <nav className="nav-bar">
      <div className="nav-logo">
        <img src={Logo} alt="" />
      </div>
      <div className="nav">
        <div className="nav-links">
          <NavLink
            exact={true}
            to="/"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            Home
          </NavLink>
          {login ? (
            <>
              <NavLink
                to="/my_pets"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                My Pets
              </NavLink>
            </>
          ) : (
            <></>
          )}

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
        </div>
        {login ? (
          <div className="auth_links">
            <Link to="/cart">
              <i className="fa fa-shopping-cart"></i>
            </Link>
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
                <MenuItem onClick={handleLogout}>
                  <i className="fa fa-power-off"></i> &nbsp;&nbsp; Logout
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
