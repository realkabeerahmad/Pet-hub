import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { Box } from "@mui/material";
import {
  CheckCircle,
  Dashboard,
  Group,
  Inventory,
  Logout,
  Pets,
} from "@mui/icons-material";

const Navigation = ({ setLogin }) => {
  const NavlinkSx = {
    color: "#2f2f2f",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    backgroundColor: "none",
    padding: "10px 30px",
  };
  return (
    <Box
      sx={{
        p: 1,
        borderRight: "1px solid #c2c2c2",
        height: "calc(100vh - 90px)",
        backgroundColor: "white",
      }}
    >
      <Box sx={{ fontSize: 20 }}>
        <NavLink exact to="/" activeClassName="is-active" style={NavlinkSx}>
          <Dashboard sx={{ mr: 2 }} />
          Dashboard
        </NavLink>
      </Box>
      <Box sx={{ fontSize: 20 }}>
        <NavLink to="/Products" activeClassName="is-active" style={NavlinkSx}>
          <Inventory sx={{ mr: 2 }} />
          Products
        </NavLink>
      </Box>
      <Box sx={{ fontSize: 20 }}>
        <NavLink to="/Users" activeClassName="is-active" style={NavlinkSx}>
          <Group sx={{ mr: 2 }} />
          Users
        </NavLink>
      </Box>
      <Box sx={{ fontSize: 20 }}>
        <NavLink to="/Orders" activeClassName="is-active" style={NavlinkSx}>
          <CheckCircle sx={{ mr: 2 }} />
          Orders
        </NavLink>
      </Box>
      <Box sx={{ fontSize: 20 }}>
        <NavLink to="/Pets" activeClassName="is-active" style={NavlinkSx}>
          <Pets sx={{ mr: 2 }} /> Pets
        </NavLink>
      </Box>
      <Box
        sx={{
          fontSize: 20,
          color: "#2f2f2f",
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          backgroundColor: "none",
          padding: "10px 30px",
          cursor: "pointer",
        }}
        onClick={() => setLogin(false)}
      >
        {/* <NavLink to="/Pets" activeClassName="is-active"> */}
        <Logout sx={{ mr: 2, color: "#e92e4a" }} /> Logout
        {/* </NavLink> */}
      </Box>
    </Box>
  );
};

export default Navigation;
