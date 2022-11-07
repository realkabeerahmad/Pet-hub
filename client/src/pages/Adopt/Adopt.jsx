import React, { useEffect, useState } from "react";
import axios from "axios";
import AdoptCard from "../../components/AdoptCard/AdoptCard";
import "./Adopt.css";
const Adopt = ({ setPet }) => {
  const [Pets, setPets] = useState([]);
  useEffect(() => {
    fetchItem();
  }, []);
  const fetchItem = () => {
    axios
      .get("http://localhost:8000/adoption/showAllPets/")
      .then((res) => {
        console.log(res.data.pets);
        setPets(res.data.pets);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="shop-nav">
        <select name="" id="">
          <option value="1" selected disabled>
            Category
          </option>
          <option value="1">1</option>
          <option value="1">1</option>
          <option value="1">1</option>
          <option value="1">1</option>
        </select>
        <div className="shop-search">
          {/* <form onSubmit={false}> */}
          <input type="text" placeholder="SEARCH" />
          <button>
            <i className="fa fa-search"></i>
          </button>
          {/* </form> */}
        </div>
      </div>
      <div className="pet-Adoption">
        {Pets.map((Pet) => {
          return <AdoptCard Pet={Pet} setPet={setPet} />;
        })}
      </div>
    </>
  );
};

export default Adopt;
