import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import "./Vaccination.css";
import axios from "axios";

const Vaccination = ({ Pet, setPet }) => {
  const [values, setValues] = useState({
    _id: Pet._id,
    DoseDate: "",
    address: "",
    status: true,
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
      .post("http://localhost:8000/pet/addVaccination", values)
      .then((res) => {
        alert(res.data.message);
        setValues({
          _id: "",
          DoseDate: "",
          address: "",
          status: "",
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
        <h1 className="details-header-heading">Vaccination Details</h1>
        <button className="btn" onClick={handleOpen}>
          <i className="fa fa-edit"></i>&nbsp;&nbsp;EDIT
        </button>
      </div>
      <div className="details-more">
        {Pet.vaccination === undefined ||
        Pet.vaccination === null ||
        Pet.vaccination === {} ? (
          <div className="NA">Please Add Vaccination Details</div>
        ) : (
          <table>
            <tbody>
              <tr>
                <th>Vaccinated:</th>
                <td>{Pet.vaccination.status ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <th>Next Dose Date:</th>
                <td>
                  {Pet.vaccination.DoseDate
                    ? Pet.vaccination.DoseDate.slice(0, 10)
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <th>Vaccination Center Address:</th>
                <td>
                  {Pet.vaccination.address ? Pet.vaccination.address : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="add">
          <div className="add-wrapper">
            <div className="add-top-bar">
              <h2>Edit Vaccination Details</h2>
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
                        <label htmlFor="nextDoseDate">Next Dose Date</label>
                      </th>
                      <td>
                        <input
                          name="nextDoseDate"
                          id="nextDoseDate"
                          type="date"
                          onChange={handleChange("DoseDate")}
                          value={values.DoseDate}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="vaccinationAddress">
                          Vaccination Address
                        </label>
                      </th>
                      <td>
                        <input
                          name="vaccinationAddress"
                          id="vaccinationAddress"
                          type="text"
                          onChange={handleChange("address")}
                          value={values.address}
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

export default Vaccination;
