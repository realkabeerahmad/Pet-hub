import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";

const AdoptApplication = ({ user, Pet }) => {
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
  };
  return (
    <div className="add-pet-form">
      <Link to="/my_pets">
        <i className="fa fa-arrow-left"></i>
      </Link>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        autoComplete="off"
      >
        <h1>Pet Adoption Application</h1>
        <div className="adoption-application">
          <div>
            <TextField
              label="User Id"
              variant="outlined"
              color="success"
              name="userId"
              type="password"
              value={user._id}
              disabled
              required
              sx={{ width: "30%", m: 1 }}
            />
            <TextField
              label="Pet Id"
              variant="outlined"
              color="success"
              name="userId"
              type="password"
              value={Pet._id}
              disabled
              required
              sx={{ width: "30%", m: 1 }}
            />
            <TextField
              label="Pet Name"
              variant="outlined"
              color="success"
              sx={{ width: "30%", m: 1 }}
              name="name"
              type="text"
              value={Pet.name}
              disabled
              required
            />
          </div>
          <div>
            <TextField
              label="Pet Type"
              variant="outlined"
              color="success"
              sx={{ width: "30%", m: 1 }}
              name="name"
              type="text"
              value={Pet.type}
              disabled
              required
            />
            <TextField
              label="Pet Breed"
              variant="outlined"
              color="success"
              sx={{ width: "30%", m: 1 }}
              name="name"
              type="text"
              value={Pet.breed}
              disabled
              required
            />
            <TextField
              label="Pet DOB"
              variant="outlined"
              color="success"
              sx={{ width: "30%", m: 1 }}
              name="name"
              type="text"
              value={Pet.dob.slice(0, 10)}
              disabled
              required
            />
          </div>
          <div>
            <TextField
              label="Shelter Name"
              variant="outlined"
              color="success"
              sx={{ width: "30%", m: 1 }}
              name="name"
              type="text"
              value={Pet.shelterName}
              disabled
              required
            />
            <TextField
              label="User Name"
              variant="outlined"
              color="success"
              sx={{ width: "30%", m: 1 }}
              name="name"
              type="text"
              value={user.firstName + " " + user.lastName}
              disabled
              required
            />
            <TextField
              label="User Email"
              variant="outlined"
              color="success"
              sx={{ width: "30%", m: 1 }}
              name="name"
              type="text"
              value={user.email}
              disabled
              required
            />
          </div>
          <div>
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
                  <TextField {...params} sx={{ width: "30%", m: 1 }} />
                )}
              />
            </LocalizationProvider>
            <TextField
              label="Age"
              variant="outlined"
              color="success"
              sx={{ width: "30%", m: 1 }}
              name="name"
              type="text"
              // value={user.email}
              // disabled
              required
            />
            <TextField
              label="CNIC"
              variant="outlined"
              color="success"
              sx={{ width: "30%", m: 1 }}
              name="name"
              type="text"
              // value={user.email}
              // disabled
              required
            />
          </div>
          <div>
            <FormControl sx={{ width: "30%", m: 1 }}>
              <InputLabel id="house-type" color="success">
                House Type
              </InputLabel>
              <Select
                label="House Type"
                name="house-type"
                id="house-type"
                // variant="outlined"
                color="success"
                // sx={{ width: "84%", m: 1 }}
                // value={values.gender}
                // onChange={handleChange("gender")}
                required
              >
                <MenuItem value="Own">Own</MenuItem>
                <MenuItem value="Rent">Rent</MenuItem>
                <MenuItem value="Shared">Shared</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: "30%", m: 1 }}>
              <InputLabel id="gender" color="success">
                Gender
              </InputLabel>
              <Select
                label="Gender"
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
            <TextField
              label="CNIC"
              variant="outlined"
              color="success"
              sx={{ width: "30%", m: 1 }}
              name="name"
              type="text"
              // value={user.email}
              // disabled
              required
            />
          </div>
          {/* <Button
              variant="contained"
              color="success"
              sx={{ width: "40%", m: 1 }}
            >
              <button className="__btn" type="submit">
                Submit
              </button>
            </Button> */}
        </div>
      </form>
    </div>
  );
};

export default AdoptApplication;
