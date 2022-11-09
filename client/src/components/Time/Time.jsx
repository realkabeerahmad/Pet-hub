import React from "react";

const Time = ({ time }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>{time.name.toUpperCase()}:</th>
          <td>{time.time.toUpperCase()}</td>
          <td>
            <button>
              <i className="fa fa-times-rectangle"></i>&nbsp;&nbsp;Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Time;
