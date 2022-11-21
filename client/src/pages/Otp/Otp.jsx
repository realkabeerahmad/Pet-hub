import { Box, TextField, useRadioGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Otp = ({ userId, setAlert, setOpenAlert, setSeverity }) => {
  const Navigate = useNavigate();
  const [values, setvalues] = useState({
    otp: "",
    userId: userId,
  });
  const handleChange = (value) => (e) => {
    setvalues({ ...values, [value]: e.target.value });
  };
  const [disabled, setdisabled] = useState(true);
  const [seconds, setSeconds] = useState(30);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
      if (seconds < 1) {
        setdisabled("false");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  function Re_Send() {
    setdisabled("true");
    setSeconds(30);
  }
  const { otp } = values;
  const verify_otp = () => {
    const { otp } = values;
    const data = { otp, userId };
    if ((userId, otp)) {
      axios
        .post("http://localhost:8000/auth/verify", data)
        .then((res) => {
          console.log("I am here");
          console.log(res);
          if (res.data.status === "success") {
            setAlert("Email Verified Successfully");
            setSeverity("success");
            Navigate("/login");
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
    <div className="login-page">
      <div className="login-form">
        <div className="login">
          <h1>VERIFY EMAIL</h1>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              name="otp"
              label="Enter OTP"
              variant="outlined"
              type="text"
              color="success"
              sx={{ width: 415, m: 1 }}
              onChange={handleChange("otp")}
              value={otp}
            />
          </Box>
          <div className="button onClick">VERIFY</div>
          {/* <div className="toRegister otp_timmer">
            <button disabled={disabled} onClick={Re_Send}>
              Re-Send OTP
            </button>{" "}
            {seconds <= 0 ? <></> : <span> after {seconds} seconds</span>}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Otp;
