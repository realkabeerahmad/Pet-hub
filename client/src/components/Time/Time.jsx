import React from "react";

const Time = () => {
  return (
    <table>
      <tbody>
        <tr>
          <th>Time Name</th>
          <td>
            <button className="btn">
              <i className="fa fa-edit"></i>&nbsp;&nbsp;Edit
            </button>
          </td>
          <td>
            <button className="btn">
              <i className="fa fa-times-rectangle"></i>&nbsp;&nbsp;Delete
            </button>
          </td>
        </tr>
        <tr>
          <td>10:30 AM</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Time;
