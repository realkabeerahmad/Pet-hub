import React from "react";
import Time from "../../../components/Time/Time";

const WalkTime = () => {
  return (
    <div className="details-about-pet">
      <div className="details-header">
        <p className="details-header-heading">
          <b>Walk Time</b>
        </p>
        <button>
          <i className="fa fa-plus"></i> Add
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

export default WalkTime;
