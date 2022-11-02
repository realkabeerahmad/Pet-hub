import React from "react";
import { Link } from "react-router-dom";
import "./MyPetCard.css";
const MyPetCard = () => {
  return (
    <Link to="/my_pets/pet/details_and_gallery">
      <div className="pet-card">
        <div className="pet-img">
          <img
            src="https://blog.ipleaders.in/wp-content/uploads/2021/01/OIP.jpg"
            alt=""
          />
        </div>
        <div className="pet-details">
          <p className="pet-name">Name</p>
          <p className="pet-dob">12/12/2022</p>
        </div>
      </div>
    </Link>
  );
};

export default MyPetCard;
