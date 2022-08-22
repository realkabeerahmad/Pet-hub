import React from "react";
import "./Details.css";
const Details = () => {
  return (
    <div className="details-about-pet">
      <div className="details-header">
        <p className="details-header-heading">
          <b>DETAILS</b>
        </p>
        <button>Edit</button>
      </div>
      <div className="details-more">
        <table>
          <tbody>
            <tr>
              <td>
                <b>Type:</b>
              </td>
              <td>Cat</td>
            </tr>
            <tr>
              <td>
                <b>Breed:</b>
              </td>
              <td>Persian</td>
            </tr>
            <tr>
              <td>
                <b>Date of Birth:</b>
              </td>
              <td>20/12/2021</td>
            </tr>
            <tr>
              <td>
                <b>Passport Number:</b>
              </td>
              <td>FE45S5a41</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Details;
