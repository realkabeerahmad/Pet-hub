import { Box, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";
const Register = () => {
  return (
    <div className="register-form">
      <div className="register">
        <h1>SIGN UP</h1>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            name="FirstName"
            label="First Name"
            variant="outlined"
            type="text"
            color="success"
            sx={{ width: "40%", m: 1, ml: 0 }}
          />
          <TextField
            name="LastName"
            label="Last Name"
            variant="outlined"
            type="text"
            color="success"
            sx={{ width: "40%", m: 1, mr: 0 }}
          />

          <TextField
            name="Email"
            label="Email"
            variant="outlined"
            type="email"
            color="success"
            sx={{ width: "84%", m: 1 }}
          />
          <TextField
            name="Password"
            label="Password"
            variant="outlined"
            type="password"
            color="success"
            sx={{ width: "84%", m: 1 }}
          />
          <TextField
            name="reEnterPassword"
            label="Re-Enter Password"
            variant="outlined"
            type="password"
            color="success"
            sx={{ width: "84%", m: 1 }}
          />
        </Box>
        <div className="button">SIGN UP</div>
        <div>or</div>
        <div className="toLogin">
          Already Have an Account? <Link to="/login">Login Here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
