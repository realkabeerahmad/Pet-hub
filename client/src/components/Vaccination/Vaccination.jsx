import React from "react";
import "./Vaccination.css";
const Vaccination = ({ Pet }) => {
  console.log(Pet);
  return (
    <div className="vaccination-details">
      <div className="vaccination-details-header">
        <h1 className="vaccination-details-header-heading">
          Vaccination Details
        </h1>
      </div>
      <div className="vaccination-details-more">
        <table>
          <tr>
            <th>Vaccinated</th>
            <td>{Pet.vaccination.status ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <th>Next Dose Date</th>
            <td>
              {Pet.vaccination.DoseDate
                ? Pet.vaccination.DoseDate.slice(0, 10)
                : "N/A"}
            </td>
          </tr>
          <tr>
            <th>Vaccination Center Address</th>
            <td>{Pet.vaccination.address ? Pet.vaccination.address : "N/A"}</td>
          </tr>
          <tr></tr>
        </table>
      </div>
    </div>
  );
};

export default Vaccination;
