import React from "react";
import axios from "axios";

const Time = ({ Pet, setPet, time, timeName }) => {
  console.log(timeName);

  const deleteTime = () => {
    const data = { _id: Pet._id, timeId: time._id };
    var url = "";
    if (timeName === "meal") {
      url = "http://localhost:8000/pet/deleteMealTime";
    } else if (timeName === "walk") {
      url = "http://localhost:8000/pet/deleteWalkTime";
    }
    axios
      .post(url, data)
      .then((res) => {
        alert(res.data.message);
        // handleClose();
        axios
          .post("http://localhost:8000/pet/showPet", data)
          .then((r) => {
            setPet(r.data.pet);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <table>
      <tbody>
        <tr>
          <th>{time.name.toUpperCase()}:</th>
          <td>{String(time.time).slice(11, 16)}</td>
          <td>
            <button className="delete-btn-t" onClick={deleteTime}>
              <i className="fa fa-trash"></i>&nbsp;&nbsp;Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Time;
