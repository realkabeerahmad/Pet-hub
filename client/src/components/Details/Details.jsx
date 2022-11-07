import React from "react";
import "./Details.css";
const Details = ({ Pet }) => {
  return (
    <div className="details-about-pet">
      <div className="details-header">
        <p className="details-header-heading">
          <b>DETAILS</b>
        </p>
      </div>
      <div className="details-more">
        <table>
          <tbody>
            <tr>
              <th>Type:</th>
              <td>{Pet.type}</td>
            </tr>
            <tr>
              <th>Breed:</th>
              <td>{Pet.breed}</td>
            </tr>
            <tr>
              <th>Gender:</th>
              <td>{Pet.gender}</td>
            </tr>
            <tr>
              <th>Date of Birth:</th>
              <td>{Pet.dob.slice(0, 10)}</td>
            </tr>
            <tr>
              <th>Passport Number:</th>
              <td>{Pet.passport}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Details;
