import React from "react";
import "./Details.css";
const Details = () => {
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
              <td>Cat</td>
            </tr>
            <tr>
              <th>Breed:</th>
              <td>Persian</td>
            </tr>
            <tr>
              <th>Date of Birth:</th>
              <td>20/12/2021</td>
            </tr>
            <tr>
              <th>Passport Number:</th>
              <td>FE45S5a41</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Details;
