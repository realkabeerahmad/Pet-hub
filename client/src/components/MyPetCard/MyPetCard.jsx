import React from "react";
import { Link } from "react-router-dom";
import "./MyPetCard.css";
const MyPetCard = ({ Pet, setPet }) => {
  const setPetDetails = () => {
    setPet(Pet);
  };
  return (
    <Link
      to={`/my_pets/${Pet._id}/details_and_gallery`}
      onClick={setPetDetails}
    >
      <div className="pet-card">
        <div className="pet-img">
          <img src={"http://localhost:8000/" + Pet.image} alt="" />
        </div>
        <div className="pet-details">
          <p className="pet-name">{Pet.name}</p>
          <p className="pet-dob">{Pet.dob.slice(0, 10)}</p>
        </div>
      </div>
    </Link>
  );
};

export default MyPetCard;
