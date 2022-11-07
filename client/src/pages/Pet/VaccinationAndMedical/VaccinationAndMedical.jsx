import React from "react";
import Medical from "../../../components/Medical/Medical";
import Vaccination from "../../../components/Vaccination/Vaccination";

const VaccinationAndMedical = ({ Pet }) => {
  return (
    <div>
      <Vaccination Pet={Pet} />
      <Medical Pet={Pet} />
    </div>
  );
};

export default VaccinationAndMedical;
