import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./AddPet.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CheckCircle } from "@mui/icons-material";

const AddPet = ({ user }) => {
  const Navigate = useNavigate();
  const [values, setValues] = useState({
    userId: "",
    name: "",
    bio: "",
    age: "",
    gender: "",
    breed: "",
    type: "",
    image: "",
    passport: "",
  });

  const handleChange = (value) => (e) => {
    setValues({ ...values, [value]: e.target.value });
  };

  const [_image, setimage] = useState();

  const handleImage = (e) => {
    setValues({ ...values, image: e.target.files[0] });
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setimage(reader.result);
    });
    reader.readAsDataURL(e.target.files[0]);
  };

  const [date, setDate] = useState(dayjs("2019-01-20T21:11:54"));

  const handleDate = (e) => {
    setDate(e);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.image) {
      alert("Please Add an Image");
      return false;
    } else {
      const formData = new FormData();
      formData.append("userId", user._id);
      formData.append("image", values.image);
      formData.append("name", values.name);
      formData.append("bio", values.bio);
      formData.append("age", values.age);
      formData.append("gender", values.gender);
      formData.append("breed", values.breed);
      formData.append("type", values.type);
      formData.append("passport", values.passport);
      formData.append("dob", date);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      axios
        .post("http://localhost:8000/pet/addPet", formData, config)
        .then((res) => {
          alert(res.data.message);
          setValues({
            userId: "",
            name: "",
            bio: "",
            gender: "",
            breed: "",
            type: "",
            image: "",
            passport: "",
            dob: "",
          });
          Navigate("/my_pets");
        })
        .catch((err) => {
          // alert(err.data.message);
          alert(err);
        });
    }
  };

  return (
    <Box
      className="add-pet-form"
      sx={{
        backgroundColor: "white",
        width: "100%",
        height: "calc(100vh - 72px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Link to="/my_pets">
        <i className="fa fa-arrow-left"></i>
      </Link>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        autoComplete="off"
      >
        <h1>Add Pet</h1>
        <Box
          sx={{
            width: "80%",
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "20%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="add-image-1">
              <img src={_image} alt="" />
              <label className="custom-file-upload" htmlFor="image-upload">
                <i className="fa fa-plus"></i>
                <input
                  id="image-upload"
                  type="file"
                  name="image-upload"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleImage}
                />
              </label>
            </div>
          </Box>
          <Box
            sx={{
              width: "80%",
              // display: "flex",
              // alignItems: "center",
              // justifyContent: "center",
              // flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                label="User Id"
                variant="outlined"
                color="success"
                name="userId"
                type="password"
                value={user._id}
                disabled
                required
                sx={{ width: "40%", m: 1 }}
              />
              <TextField
                label="Pet Name"
                variant="outlined"
                color="success"
                sx={{ width: "40%", m: 1 }}
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange("name")}
                required
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                label="Pet Bio"
                variant="outlined"
                color="success"
                sx={{ width: "40%", m: 1 }}
                name="bio"
                type="text"
                value={values.bio}
                onChange={handleChange("bio")}
                required
              />
              <FormControl sx={{ width: "40%", m: 1 }}>
                <InputLabel id="gender" color="success">
                  Gender *
                </InputLabel>
                <Select
                  label="Gender *"
                  name="gender"
                  id="gender"
                  // variant="outlined"
                  color="success"
                  // sx={{ width: "84%", m: 1 }}
                  value={values.gender}
                  onChange={handleChange("gender")}
                  required
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControl sx={{ width: "40%", m: 1 }}>
                <InputLabel id="type" color="success">
                  Pet Type *
                </InputLabel>
                <Select
                  label="Gender *"
                  id="type"
                  color="success"
                  name="type"
                  type="text"
                  value={values.type}
                  onChange={handleChange("type")}
                  required
                >
                  <MenuItem value="Cat">Cat</MenuItem>
                  <MenuItem value="Dog">Dog</MenuItem>
                  <MenuItem value="Horse">Horse</MenuItem>
                  <MenuItem value="Parrot">Parrot</MenuItem>
                  <MenuItem value="Hen">Hen</MenuItem>
                  <MenuItem value="Rabbit">Rabbit</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Breed"
                variant="outlined"
                color="success"
                sx={{ width: "40%", m: 1 }}
                name="breed"
                type="text"
                value={values.breed}
                onChange={handleChange("breed")}
                required
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                label="Pet Passport"
                variant="outlined"
                color="success"
                sx={{ width: "40%", m: 1 }}
                name="passport"
                type="text"
                value={values.passport}
                onChange={handleChange("passport")}
                required
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  variant="outlined"
                  color="success"
                  name="dob"
                  value={date}
                  inputFormat="MM/DD/YYYY"
                  onChange={handleDate}
                  renderInput={(params) => (
                    <TextField {...params} sx={{ width: "40%", m: 1 }} />
                  )}
                />
              </LocalizationProvider>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                color="success"
                sx={{ width: "40%", m: 1, fontSize: 18 }}
                type="submit"
              >
                <CheckCircle
                  sx={{
                    mr: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default AddPet;
