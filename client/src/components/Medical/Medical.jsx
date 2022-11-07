import React from "react";
import "./Medical.css";
const Medical = ({ Pet }) => {
  return (
    <div className="medical-details">
      <div className="medical-details-header">
        <h1 className="medical-details-header-heading">Medical Details</h1>
      </div>
      <div className="medical-details-more">
        <table>
          <tr>
            <th>Next Appointment Date</th>
            <td>
              {Pet.vet.AppointmentDate
                ? Pet.vet.AppointmentDate.slice(0, 10)
                : "N/A"}
            </td>
          </tr>
          <tr>
            <th>Vet Address</th>
            <td>{Pet.vet.address ? Pet.vet.address : "N/A"}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Medical;
