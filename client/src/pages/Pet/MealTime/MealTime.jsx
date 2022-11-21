import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import Time from "../../../components/Time/Time";
import axios from "axios";
import { TextField } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const MealTime = ({ Pet, setPet }) => {
  const [values, setValues] = useState({
    _id: Pet._id,
    name: "",
    time: dayjs("2019-01-20T21:11:54"),
  });

  const handleChange = (value) => (e) => {
    setValues({ ...values, [value]: e.target.value });
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    values._id = Pet._id;
    axios
      .post("http://localhost:8000/pet/addMealTime", values)
      .then((res) => {
        alert(res.data.message);
        setValues({
          name: "",
          time: "",
        });
        handleClose();
        const data = { _id: Pet._id };
        axios
          .post("http://localhost:8000/pet/showPet", data)
          .then((r) => {
            setPet(r.data.pet);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="details-about-pet">
      <div className="details-header">
        <p className="details-header-heading">
          <b>Meal Time</b>
        </p>
        <button className="btn" onClick={handleOpen}>
          <i className="fa fa-plus"></i>&nbsp;&nbsp;ADD
        </button>
      </div>
      <div className="details-more">
        {Pet.mealTimes === [] ||
        Pet.mealTimes === undefined ||
        Pet.mealTimes === null ? (
          <div className="NA">ADD MEAL TIME PLEASE</div>
        ) : (
          Pet.mealTimes.map((time) => {
            return (
              <Time time={time} Pet={Pet} setPet={setPet} timeName={"meal"} />
            );
          })
        )}
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="add">
          <div className="add-wrapper">
            <div className="add-top-bar">
              <h2>Add Meal Time</h2>
              <i className="fa fa-times" onClick={handleClose}></i>
            </div>
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              autoComplete="off"
            >
              <div className="add-screen">
                <TextField
                  name="time-name"
                  id="time-name"
                  label="Time Name"
                  variant="outlined"
                  color="success"
                  sx={{ width: "100%", p: 0, m: 1 }}
                  type="text"
                  value={values.name}
                  onChange={handleChange("name")}
                  required
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Time"
                    variant="outlined"
                    color="success"
                    name="time"
                    value={values.time}
                    // inputFormat="MM/DD/YYYY"
                    onChange={handleChange("time")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{ width: "100%", p: 0, m: 1 }}
                        variant="outlined"
                        color="success"
                        required
                      />
                    )}
                  />
                </LocalizationProvider>
                <button className="save-btn">
                  <i className="fa fa-save"></i>
                  &nbsp;&nbsp;SAVE
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MealTime;
