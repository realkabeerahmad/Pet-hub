import React from "react";
import "./Vaccination.css";
const Vaccination = () => {
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
            <th>Previous Dose</th>
            <th>Next Dose</th>
          </tr>
          <tr>
            <td>02/02/2022</td>
            <td>02/02/2023</td>
          </tr>
          <tr>
            <th>Vaccination Center Address</th>
            <td>ABC-123, Some Street in Pakistan</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Vaccination;
