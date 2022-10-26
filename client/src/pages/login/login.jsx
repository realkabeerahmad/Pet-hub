import { Box, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setAlert, setOpenAlert, setLoginUser, setSeverity }) => {
  const Navigate = useNavigate();
  const [Err, setErr] = useState({ err: false, helpText: "" });
  function tester() {
    Err.err = true;
    Err.helpText = "Invalid Email";
  }
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { email, password } = values;
  const handleChange = (value) => (e) => {
    setValues({ ...values, [value]: e.target.value });
  };
  const login = () => {
    const { email, password } = values;
    if (email && password) {
      axios
        .post("http://localhost:3005/auth/login", values)
        .then((res) => {
          console.log(res.data);
          if (res.data.message === "User do not Exist") {
            setAlert(res.data.message);
            setOpenAlert(true);
            setSeverity("info");
          } else if (res.data.message === "Invalid Password") {
            setAlert(res.data.message);
            setOpenAlert(true);
            setSeverity("error");
          } else if (res.data.message === "Please Verify Your Email") {
            setAlert(res.data.message);
            setOpenAlert(true);
            setSeverity("warning");
          } else if (res.data.message === "Valid Password") {
            setAlert("Login Pressed");
            setOpenAlert(true);
            setSeverity("success");
            Navigate("/my_pets");
          }
        })
        .catch((err) => console.log(err));
    } else {
      setAlert("Please Enter Email and Password");
      setOpenAlert(true);
      setSeverity("error");
    }
  };
  return (
    <div className="login-page">
      <div className="login-form">
        <div className="login">
          <h1>LOGIN</h1>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              required
              name="email"
              label="Email"
              variant="outlined"
              type="email"
              color="success"
              value={email}
              onChange={handleChange("email")}
              sx={{ width: 415, m: 1 }}
              error={Err.err}
              helperText={Err.helpText}
            />
            <TextField
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              color="success"
              value={password}
              onChange={handleChange("password")}
              sx={{ width: 415, m: 1 }}
            />
          </Box>
          <button onClick={tester}>Click Me</button>
          <p>
            Forgot Password???&nbsp;
            <Link to="/forget_password" className="_button">
              Click Here
            </Link>
            .
          </p>
          <div className="button" onClick={login}>
            LOGIN
          </div>
          <div> or </div>
          <div className="toRegister">
            Don't have an Account??? <Link to="/register">Create One</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
