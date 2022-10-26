import { Link } from "@mui/material";
import React from "react";
import "./AdoptCard.css";

const AdoptCard = ({ name, shelterName, Description, img, link }) => {
  return (
    <div className="petAdoptionCard">
      <Link
        // to={`/${link}`}
        to="/shop"
        // onClick={setPetDetails}
        className="PetCardWrap"
      >
        <div className="pet-adopt">
          <div className="pet-adopt-left">
            <img
              src={`${img}`}
              alt={`Pet Name: ${name} | Shelter Name: ${shelterName}`}
              title={`Pet Name: ${name} | Shelter Name: ${shelterName}`}
            />
          </div>
          <div className="pet-adopt-right">
            <div className="pet-info-head">
              <h2 className="petName">{name}Dummy</h2>
              <h4 className="ShelterName">{shelterName}Dummy</h4>
            </div>
            <p className="description">
              {Description} Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Voluptatem, mollitia similique facilis reiciendis inventore
              ipsum cupiditate aliquam quis necessitatibus delectus a debitis
              obcaecati nostrum eum porro nisi error magnam praesentium!
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AdoptCard;
