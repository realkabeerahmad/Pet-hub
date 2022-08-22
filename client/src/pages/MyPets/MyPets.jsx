import React from "react";
import { Link, Outlet } from "react-router-dom";
import MyPetCard from "../../components/MyPetCard/MyPetCard";
import "./MyPets.css";
const MyPets = () => {
  return (
    <div className="mypets">
      <MyPetCard></MyPetCard>
      <MyPetCard></MyPetCard>
      <Link to="/my_pets/add_pet" className="add-pet-btn">
        Add Pet
      </Link>
    </div>
  );
};

export default MyPets;
