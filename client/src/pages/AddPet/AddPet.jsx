import {
  Box,
  // MenuItem,
  //  Select,
  // TextField
} from "@mui/material";
import React from "react";
// import { Link } from "react-router-dom";
import "./AddPet.css";
const AddPet = () => {
  return (
    <div className="add-pet-form">
      <div className="add-pet">
        <h1>Add Pet</h1>
        <Box component="form" noValidate autoComplete="off">
          <input name="petName" type="file" /> <br />
          <input name="petName" type="text" placeholder="Pet Name" />
          <select name="Gender" id="" placeholder="Gender">
            <option value="Select" selected disabled>
              Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <br />
          <input name="petName" type="text" placeholder="Pet Name" />
        </Box>
        <div className="button">CONFIRM</div>
        <div className="button">CANCEL</div>
      </div>
    </div>
  );
};

export default AddPet;
