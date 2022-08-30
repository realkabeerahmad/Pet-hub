import React from "react";
import GalleryImage from "../GalleryImage/GalleryImage";
import "./Gallery.css";
const Gallery = () => {
  return (
    <div className="pet-gallery">
      <div className="gallery-header">
        <p className="gallery-header-heading">
          <b>GALLERY</b>
        </p>
        <button>
          <i className="fa fa-plus"></i> ADD
        </button>
      </div>
      <div className="gallery-main">
        <GalleryImage></GalleryImage>
        <GalleryImage></GalleryImage>
        <GalleryImage></GalleryImage>
        <GalleryImage></GalleryImage>
        <GalleryImage></GalleryImage>
        <GalleryImage></GalleryImage>
        <GalleryImage></GalleryImage>
        <GalleryImage></GalleryImage>
        <GalleryImage></GalleryImage>
      </div>
    </div>
  );
};

export default Gallery;
