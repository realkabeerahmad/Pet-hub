import React from "react";
import { Link } from "react-router-dom";
import "./Pet.css";
const Pet = () => {
  return (
    <>
      <div className="pet">
        <div className="pet-header">
          <img src="https://source.unsplash.com/1600x900/?nature" alt="" />
        </div>
        <div className="pet-profile-image">
          <img src="https://source.unsplash.com/150x150/?pet" alt="" />
        </div>
        <div className="pet-info">
          <p className="pet-profile-name">Name</p>
          <p className="pet-bio">This is Bio. I am Name</p>
        </div>
      </div>
      <div className="more-about-pet">
        <div className="more-about-pet-links">
          <Link to="details_and_gallery">
            <div>DETAILS AND GALLERY</div>
          </Link>
          <Link to="vaccination_and_medical_details">
            <div>VACCINATION AND MEDICAL DETAILS</div>
          </Link>
          <Link to="meal_timings">
            <div>MEAL TIMINGS</div>
          </Link>
          <Link to="walk_timings">
            <div>WALK TIMINGS</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Pet;
