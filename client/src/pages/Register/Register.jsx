import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = ({ setAlert, setOpenAlert, setSeverity }) => {
  const Navigate = useNavigate();
  const [values, setvalues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [f_name, setF_name] = useState({ error: false, helperText: "" });

  const { firstName, lastName, email, password, repassword } = values;

  const handleChange = (value) => (e) => {
    setvalues({ ...values, [value]: e.target.value });
  };
  const onBlur = (value) => (e) => {
    if (value.length <= 2 && (value === "firstName" || value === "LastName")) {
      setF_name({
        error: true,
        helperText: "First Name must be greater then 2",
      });
      console.log(f_name);
    }
  };

  const register = () => {
    const { firstName, lastName, email, password, repassword } = values;
    if (firstName && lastName && email && password && password === repassword) {
      axios
        .post("http://localhost:8000/auth/register", values)
        .then((res) => {
          console.log("I am here");
          console.log(res);
          if (res.data.status === "success") {
            setAlert("Registered Successfully Please Verify Email");
            setSeverity("success");
            Navigate("/verify_otp");
          } else if (res.data.status === "failed") {
            setAlert(res.data.message);
            setSeverity("error");
          }
          setOpenAlert(true);
        })
        .catch((err) => {
          console.log("I will here");
          console.log(err);
        });
    } else {
      setAlert("Please Enter Required details");
      setSeverity("error");
      setOpenAlert(true);
    }
  };
  return (
    <div className="register-form">
      <div className="register">
        <h1>SIGN UP</h1>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            name="firstName"
            label="First Name"
            variant="outlined"
            type="text"
            color="success"
            onChange={handleChange("firstName")}
            onBlur={onBlur("firstName")}
            value={firstName}
            sx={{ width: "40%", m: 1, ml: 0 }}
            error={f_name.error}
            helperText={f_name.helperText}
          />
          <TextField
            name="lastName"
            label="Last Name"
            variant="outlined"
            type="text"
            color="success"
            onChange={handleChange("lastName")}
            value={lastName}
            sx={{ width: "40%", m: 1, mr: 0 }}
          />

          <TextField
            name="email"
            label="Email"
            variant="outlined"
            type="email"
            color="success"
            onChange={handleChange("email")}
            value={email}
            sx={{ width: "84%", m: 1 }}
          />
          <TextField
            name="password"
            label="Password"
            variant="outlined"
            type="password"
            color="success"
            onChange={handleChange("password")}
            value={password}
            sx={{ width: "84%", m: 1 }}
          />
          <TextField
            name="repassword"
            label="Re-Enter Password"
            variant="outlined"
            type="password"
            color="success"
            onChange={handleChange("repassword")}
            value={repassword}
            sx={{ width: "84%", m: 1 }}
          />
        </Box>
        <div className="button" onClick={register}>
          SIGN UP
        </div>
        <div>or</div>
        <div className="toLogin">
          Already Have an Account? <Link to="/login">Login Here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
