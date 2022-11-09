import React from "react";
import Time from "../../../components/Time/Time";

const MealTime = ({ Pet }) => {
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
        {Pet.mealTime === [] ||
        Pet.mealTime === undefined ||
        Pet.mealTime === null ? (
          <div className="NA">ADD MEAL TIME PLEASE</div>
        ) : (
          Pet.mealTimes.map((time) => {
            return <Time time={time} />;
          })
        )}
      </div>
    </div>
  );
};

export default MealTime;
