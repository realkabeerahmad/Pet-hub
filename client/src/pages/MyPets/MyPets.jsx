import React from "react";
import { Link } from "react-router-dom";
import MyPetCard from "../../components/MyPetCard/MyPetCard";
import "./MyPets.css";
const MyPets = () => {
  return (
    <div className="mypets">
      <MyPetCard></MyPetCard>
      <Link to="/my_pets/add_pet" className="add-pet-btn">
        <i className="fa fa-plus"></i> Add Pet
      </Link>
    </div>
  );
};

export default MyPets;
