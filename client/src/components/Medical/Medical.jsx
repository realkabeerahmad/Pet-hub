import React from "react";
import "./Medical.css";
const Medical = () => {
  return (
    <div className="medical-details">
      <div className="medical-details-header">
        <h1 className="medical-details-header-heading">Medical Details</h1>
      </div>
      <div className="medical-details-more">
        <table>
          <tr>
            <th>Previous Appointment</th>
            <th>Next Appointment</th>
          </tr>
          <tr>
            <td>02/02/2022</td>
            <td>02/02/2023</td>
          </tr>
          <tr>
            <th>Vet Address</th>
            <td>ABC-123, Some Street in Pakistan</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Medical;
