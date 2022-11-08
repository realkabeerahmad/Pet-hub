import {
  Box,
  // MenuItem,
  //  Select,
  // TextField
} from "@mui/material";
import React, { useState } from "react";
// import { Link } from "react-router-dom";
import "./AddPet.css";
const AddPet = ({ user }) => {
  const [image, setimage] = useState();
  const handleImage = (e) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setimage(reader.result);
    });
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <div className="add-pet-form">
      <div className="add-image-1">
        <img src={image} alt="" />
      </div>
      <input
        type="file"
        name="Image"
        accept=".png, .jpg, .jpeg"
        onChange={handleImage}
      />
      <table>
        <tbody>
          <tr>
            <th>
              <label htmlFor="petId">Pet ID:</label>
            </th>
            <td>
              <input
                name="petId"
                type="text"
                // value={Pet._id}
                disabled
                required
              />
            </td>
            <th>
              <label htmlFor="petId">User ID:</label>
            </th>
            <td>
              <input
                name="petId"
                type="text"
                value={user._id}
                disabled
                required
              />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="fullName">Full Name:</label>
            </th>
            <td>
              <input
                name="fullName"
                type="text"
                value={user.firstName + " " + user.lastName}
                disabled
                required
              />
            </td>
            <th>
              <label htmlFor="age">Age:</label>
            </th>
            <td>
              <input name="age" type="number" min="18" required />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="address">Address:</label>
            </th>
            <td>
              <input name="address" type="text" required />
            </td>
            <th>
              <label htmlFor="phone">Phone:</label>
            </th>
            <td>
              <input name="phone" type="text" required />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="housetype">House Type:</label>
            </th>
            <td>
              <select name="housetype" id="" required>
                <option value="select" selected disabled>
                  Select
                </option>
                <option value="Own">Own</option>
                <option value="Rent">Rent</option>
                <option value="Shared">Shared</option>
              </select>
            </td>
            <th>
              <label htmlFor="email">Email:</label>
            </th>
            <td>
              <input
                name="email"
                type="text"
                value={user.email}
                required
                disabled
              />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="isYardFenced">is Yard Fenced:</label>
            </th>
            <td>
              <input name="isYardFenced" type="checkbox" required />
            </td>
            <th></th>
            <td>
              <button className="btn">Submit</button>
              <button className="btn">Cancle</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AddPet;
