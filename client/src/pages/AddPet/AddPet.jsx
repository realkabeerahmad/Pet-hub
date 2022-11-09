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
            <th>
              <label htmlFor="Name">Name:</label>
            </th>
            <td>
              <input name="Name" type="text" required />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="age">Age:</label>
            </th>
            <td>
              <input name="age" type="number" min="0" required />
            </td>
            <th>
              <label htmlFor="bio">Bio:</label>
            </th>
            <td>
              <input name="bio" type="text" required />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="gender">Gender:</label>
            </th>
            <td>
              <select name="gender" type="text" required>
                <option value="" disabled selected>
                  Select
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </td>
            <th>
              <label htmlFor="type">Type:</label>
            </th>
            <td>
              <select name="type" type="text" required>
                <option value="" disabled selected>
                  Select
                </option>
                <option value="Cat">Cat</option>
                <option value="Dog">Dog</option>
                <option value="Horse">Horse</option>
                <option value="Parrot">Parrot</option>
                <option value="Hen">Hen</option>
                <option value="Rabbit">Rabbit</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="breed">Breed:</label>
            </th>
            <td>
              <input name="breed" type="text" required />
            </td>
            <th>
              <label htmlFor="passport">Passport:</label>
            </th>
            <td>
              <input
                name="passport"
                type="text"
                // value={user.email}
                required
                // disabled
              />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="dob">Date of Birth:</label>
            </th>
            <td>
              <input name="dob" type="date" required />
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
