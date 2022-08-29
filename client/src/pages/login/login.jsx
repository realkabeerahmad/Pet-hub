import { Box, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import "./Login.css";
const Login = () => {
  const login = () => {
    const { username, FirstName, Email, Password, reEnterPassword } = values;
    if (
      username &&
      FirstName &&
      Email &&
      Password &&
      Password === reEnterPassword
    ) {
      axios.post("http://localhost:8001/auth/register", values).then((res) => {
        if (res.data.message === "Successfully Registered") {
          history.push("/login");
        }
        alert(res.data.message);
      });
    } else {
      alert("Invlid input");
    }
  };
  return (
    <div className="login-page">
      <div className="login-form">
        <div className="login">
          <h1>LOGIN</h1>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              name="Email"
              label="Email"
              variant="outlined"
              type="email"
              color="success"
              sx={{ width: 415, m: 1 }}
            />
            <TextField
              name="Password"
              label="Password"
              variant="outlined"
              type="password"
              color="success"
              sx={{ width: 415, m: 1 }}
            />
          </Box>
          <p>
            Forgot Password???&nbsp;
            <Link to="/forget_password" className="_button">
              Click Here
            </Link>
            .
          </p>
          <div className="button">LOGIN</div>
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
