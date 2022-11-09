import React from "react";
import Time from "../../../components/Time/Time";

const WalkTime = ({ Pet }) => {
  return (
    <div className="details-about-pet">
      <div className="details-header">
        <p className="details-header-heading">
          <b>Walk Time</b>
        </p>
        <button className="btn">
          <i className="fa fa-plus"></i>&nbsp;&nbsp;Add
        </button>
      </div>
      <div className="details-more">
        {Pet.walkTime === [] ||
        Pet.walkTime === undefined ||
        Pet.walkTime === null ? (
          <div className="NA">ADD WALK TIME PLEASE</div>
        ) : (
          Pet.walkTimes.map((time) => {
            return <Time time={time} />;
          })
        )}
      </div>
    </div>
  );
};

export default WalkTime;
