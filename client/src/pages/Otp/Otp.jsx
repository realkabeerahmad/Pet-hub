import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Otp = ({ userId, setAlert, setOpenAlert, setSeverity, setUserId }) => {
  const Navigate = useNavigate();
  const [values, setvalues] = useState({
    otp: "",
    userId: userId,
  });
  const handleChange = (value) => (e) => {
    setvalues({ ...values, [value]: e.target.value });
    if (values.otp.length == 4) {
      return false;
    }
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
    const data = { otp: otp, userID: userId };
    if (data) {
      axios
        .post("http://localhost:8000/auth/verifyOTP", data)
        .then((res) => {
          if (res.data.status === "success") {
            setOpenAlert(false);
            setAlert("Email Verified Successfully");
            setSeverity("success");
            Navigate("/login");
            setOpenAlert(true);
            setUserId("");
          } else if (res.data.status === "failed") {
            setOpenAlert(false);
            setAlert(res.data.message);
            setSeverity("error");
            setOpenAlert(true);
          }
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
          <Button
            sx={{ width: 415, m: 1 }}
            variant="contained"
            color="success"
            onClick={verify_otp}
          >
            VERIFY
          </Button>
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
