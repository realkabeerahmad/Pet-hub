import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdoptDetails.css";
const AdoptDetails = ({ Pet }) => {
  const Server = "http://localhost:8000/";
  console.log(Pet);
  const Navigate = useNavigate();
  return (
    <div className="Details">
      <div className="Details-Left">
        <Link to="/adopt">
          <i className="fa fa-arrow-left"></i>
        </Link>
        <img src={Server + Pet.image} alt={Pet._id} />
      </div>
      <div className="Details-Right">
        <div className="Details-intro">
          <h1>{Pet.name.toUpperCase()}</h1>
          <h2>{Pet.shelterName.toUpperCase()}</h2>
        </div>
        <div className="Details-details">
          <p className="details-description">{Pet.bio}</p>
          <table>
            <tbody>
              <tr>
                <th>Type:</th>
                <td>{Pet.type}</td>
                <th>Breed:</th>
                <td>{Pet.breed}</td>
                <th>Gender:</th>
                <td>{Pet.gender}</td>
              </tr>
              <tr>
                <th>Date of Birth:</th>
                <td>{Pet.dob.slice(0, 10)}</td>
                <th>Passport No:</th>
                <td>{Pet.passport}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="details-button">
          <div className="details-fav">
            <i className="fa fa-heart"></i>
          </div>
          <div
            className="details-adopt"
            onClick={() => Navigate("/adopt/" + Pet._id + "/application")}
          >
            Adopt
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptDetails;
