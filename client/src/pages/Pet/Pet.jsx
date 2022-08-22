import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./Pet.css";
const Pet = () => {
  const activeClassName = "is-active";
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
          <NavLink
            to="details_and_gallery"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            <div>DETAILS AND GALLERY</div>
          </NavLink>
          <NavLink
            to="vaccination_and_medical_details"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            <div>VACCINATION AND MEDICAL DETAILS</div>
          </NavLink>
          <NavLink
            to="meal_timings"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            <div>MEAL TIMINGS</div>
          </NavLink>
          <NavLink
            to="walk_timings"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            <div>WALK TIMINGS</div>
          </NavLink>
        </div>
        <div className="pet-links-outlet">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Pet;
