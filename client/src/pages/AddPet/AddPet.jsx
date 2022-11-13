import React, { useState } from "react";
import "./AddPet.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

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
    dob: "",
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
    formData.append("dob", values.dob);
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
        <table>
          <tbody>
            <tr>
              <th></th>
              <td>
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
              </td>
              <th>
                <label htmlFor="userId">User ID:</label>
              </th>
              <td>
                <input
                  name="userId"
                  type="password"
                  value={user._id}
                  disabled
                  required
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="Name">Name:</label>
              </th>
              <td>
                <input
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange("name")}
                  required
                />
              </td>

              <th>
                <label htmlFor="bio">Bio:</label>
              </th>
              <td>
                <input
                  name="bio"
                  type="text"
                  value={values.bio}
                  onChange={handleChange("bio")}
                  required
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="gender">Gender:</label>
              </th>
              <td>
                <select
                  name="gender"
                  type="text"
                  value={values.gender}
                  onChange={handleChange("gender")}
                  required
                >
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
                <select
                  name="type"
                  type="text"
                  value={values.type}
                  onChange={handleChange("type")}
                  required
                >
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
                <input
                  name="breed"
                  type="text"
                  value={values.breed}
                  onChange={handleChange("breed")}
                  required
                />
              </td>
              <th>
                <label htmlFor="passport">Passport:</label>
              </th>
              <td>
                <input
                  name="passport"
                  type="text"
                  value={values.passport}
                  onChange={handleChange("passport")}
                  required
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="dob">Date of Birth:</label>
              </th>
              <td>
                <input
                  name="dob"
                  type="date"
                  value={values.dob}
                  onChange={handleChange("dob")}
                  required
                />
              </td>
              <th></th>
              <td>
                <button className="save-btn" type="submit">
                  Submit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default AddPet;
