import React from "react";
import Time from "../../../components/Time/Time";

const MealTime = () => {
  return (
    <div className="details-about-pet">
      <div className="details-header">
        <p className="details-header-heading">
          <b>Meal Time</b>
        </p>
        <button className="btn">
          <i className="fa fa-plus"></i>&nbsp;&nbsp;Add
        </button>
      </div>
      <div className="details-more">
        <Time />
        <Time />
        <Time />
        <Time />
      </div>
    </div>
  );
};

export default MealTime;
