import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyPetCard from "../../components/MyPetCard/MyPetCard";
import "./MyPets.css";
import axios from "axios";
const MyPets = ({ user, setPet }) => {
  const data = { userId: user._id };
  const [Pets, setPets] = useState([]);
  useEffect(() => {
    fetchItem();
  }, []);
  const fetchItem = () => {
    axios
      .post("http://localhost:8000/pet/showAllPets/", data)
      .then((res) => {
        setPets(res.data.pets);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="mypets">
      {Pets.map((Pet) => {
        return (
          <MyPetCard Pet={Pet} setPet={setPet} setPets={setPets} user={user} />
        );
      })}
      <Link to="/my_pets/add_pet" className="add-pet-btn">
        <i className="fa fa-plus"></i> Add Pet
      </Link>
    </div>
  );
};

export default MyPets;
