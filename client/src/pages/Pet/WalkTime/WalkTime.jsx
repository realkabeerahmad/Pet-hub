import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import Time from "../../../components/Time/Time";
import axios from "axios";

const WalkTime = ({ Pet, setPet }) => {
  const [values, setValues] = useState({
    _id: Pet._id,
    name: "",
    time: "",
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
      .post("http://localhost:8000/pet/addWalkTime", values)
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
          <b>Walk Time</b>
        </p>
        <button className="btn" onClick={handleOpen}>
          <i className="fa fa-plus"></i>&nbsp;&nbsp;ADD
        </button>
      </div>
      <div className="details-more">
        {Pet.walkTimes === [] ||
        Pet.walkTimes === undefined ||
        Pet.walkTimes === null ? (
          <div className="NA">ADD WALK TIME PLEASE</div>
        ) : (
          Pet.walkTimes.map((time) => {
            return (
              <Time time={time} Pet={Pet} setPet={setPet} timeName={"walk"} />
            );
          })
        )}
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="add">
          <div className="add-wrapper">
            <div className="add-top-bar">
              <h2>Add Walk Time</h2>
              <i className="fa fa-times" onClick={handleClose}></i>
            </div>
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              autoComplete="off"
            >
              <div className="add-screen">
                <table>
                  <tbody>
                    <tr>
                      <th>
                        <label htmlFor="time-name">Lable</label>
                      </th>
                      <td>
                        <input
                          name="time-name"
                          id="time-name"
                          type="text"
                          value={values.name}
                          onChange={handleChange("name")}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="time">Time</label>
                      </th>
                      <td>
                        <input
                          name="time"
                          id="time"
                          type="time"
                          value={values.time}
                          onChange={handleChange("time")}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
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

export default WalkTime;
