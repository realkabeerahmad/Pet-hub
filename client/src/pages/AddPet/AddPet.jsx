import { Box, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./AddPet.css";
const AddPet = () => {
  return (
    <div className="add-pet-form">
      <div className="add-pet">
        <h1>Add Pet</h1>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            name="petName"
            label="Pet Name"
            variant="outlined"
            type="text"
            color="success"
            sx={{ width: "40%", m: 1, ml: 0 }}
          />
          {/* <Select
            // name="gender"
            label="Gender"
            variant="outlined"
            color="success"
            sx={{ width: "40%", m: 1, mr: 0 }}
          >
            <MenuItem>Male</MenuItem>
            <MenuItem>Female</MenuItem>
          </Select> */}
          <TextField
            name="firstName"
            label="First Name"
            variant="outlined"
            type="text"
            color="success"
            sx={{ width: "40%", m: 1, ml: 0 }}
          />
          <TextField
            name="lastName"
            label="Last Name"
            variant="outlined"
            type="text"
            color="success"
            sx={{ width: "40%", m: 1, mr: 0 }}
          />

          <TextField
            name="repassword"
            label="Re-Enter Password"
            variant="outlined"
            type="password"
            color="success"
            sx={{ width: "82%", m: 1 }}
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

export default AddPet;
