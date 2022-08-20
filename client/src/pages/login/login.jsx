import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Box, Link, TextField } from "@mui/material";
const Login = ({ setLoginUser }) => {
  const history = useHistory();

  const [user, setUser] = useState({
    Email: "",
    Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const login = () => {
    axios.post("http://localhost:8001/auth/login", user).then((res) => {
      if (
        res.data.message === "User not Registered" ||
        res.data.message === "Password didn't Match"
      ) {
        alert(res.data.message);
      } else {
        setLoginUser(res.data.user);
        history.push("/PetsManager");
      }
    });
  };
  const togglePassword = document.querySelector("#togglePassword");
  const Password = document.querySelector("#Password");

  function togglePass() {
    if (
      togglePassword.classList.contains("fa-eye") &&
      Password.getAttribute("type") === "text"
    ) {
      togglePassword.classList.remove("fa-eye");
      togglePassword.classList.add("fa-eye-slash");
      Password.setAttribute("type", "Password");
    } else if (
      togglePassword.classList.contains("fa-eye-slash") &&
      Password.getAttribute("type") === "Password"
    ) {
      togglePassword.classList.remove("fa-eye-slash");
      togglePassword.classList.add("fa-eye");
      Password.setAttribute("type", "text");
    }
  }

  return (
    <div className="login-form">
      <div className="login">
        <h1>LOGIN</h1>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            name="Email"
            label="Email"
            variant="outlined"
            type="email"
            onChange={handleChange}
            value={user.Email}
            color="success"
            sx={{ width: 415, m: 1 }}
          />
          <TextField
            name="Password"
            label="Password"
            variant="outlined"
            type="password"
            onChange={handleChange}
            value={user.Password}
            color="success"
            sx={{ width: 415, m: 1 }}
          />
        </Box>
        <div className="button" onClick={login}>
          LOGIN
        </div>
        <p>
          Forgot Password???&nbsp;
          <span className="_button">Click Here.</span>
        </p>
        <div>or</div>
        <div>
          Don't have an Account??? <Link to="/register">Create One</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
