import { Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Otp = () => {
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
            />
          </Box>
          <div className="button">VERIFY</div>
          <div className="toRegister otp_timmer">
            <button disabled={disabled} onClick={Re_Send}>
              Re-Send OTP
            </button>{" "}
            {seconds <= 0 ? <></> : <span> after {seconds} seconds</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
