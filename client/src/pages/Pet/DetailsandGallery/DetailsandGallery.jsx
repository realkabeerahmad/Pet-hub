import React from "react";
import Details from "../../../components/Details/Details";
import Gallery from "../../../components/Gallery/Gallery";

const DetailsandGallery = ({ Pet }) => {
  return (
    <>
      <Details Pet={Pet} />
      <Gallery Pet={Pet} />
    </>
  );
};

export default DetailsandGallery;
