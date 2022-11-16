import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import "./Medical.css";
import axios from "axios";

const Medical = ({ Pet, setPet }) => {
  const [values, setValues] = useState({
    _id: Pet._id,
    AppointmentDate: "",
    address: "",
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
    axios
      .post("http://localhost:8000/pet/addVet", values)
      .then((res) => {
        alert(res.data.message);
        setValues({
          _id: "",
          AppointmentDate: "",
          address: "",
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
        <h1 className="details-header-heading">Medical Details</h1>
        <button className="btn" onClick={handleOpen}>
          <i className="fa fa-edit"></i>&nbsp;&nbsp;EDIT
        </button>
      </div>
      <div className="details-more">
        {Pet.vet === undefined || Pet.vet === null || Pet.vet === {} ? (
          <div className="NA">Please Add Vet Details</div>
        ) : (
          <table>
            <tbody>
              <tr>
                <th>Next Appointment Date:</th>
                <td>
                  {Pet.vet.AppointmentDate
                    ? Pet.vet.AppointmentDate.slice(0, 10)
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <th>Vet Address:</th>
                <td>{Pet.vet.address ? Pet.vet.address : "N/A"}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="add">
          <div className="add-wrapper">
            <div className="add-top-bar">
              <h2>Edit Medical Details</h2>
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
                        <label htmlFor="nextDoseDate">Appointment Date</label>
                      </th>
                      <td>
                        <input
                          name="AppointmentDate"
                          id="AppointmentDate"
                          type="date"
                          onChange={handleChange("AppointmentDate")}
                          value={values.AppointmentDate}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="vaccinationAddress">Vet Address</label>
                      </th>
                      <td>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          onChange={handleChange("address")}
                          value={
                            Pet.vet.address ? Pet.vet.address : values.address
                          }
                          disabled={Pet.vet.address ? true : false}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button className="save-btn" type="submit">
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

export default Medical;
