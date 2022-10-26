import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import GalleryImage from "../GalleryImage/GalleryImage";
import "./Gallery.css";
const Gallery = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className="pet-gallery">
        <div className="gallery-header">
          <p className="gallery-header-heading">
            <b>GALLERY</b>
          </p>
          <button onClick={handleOpen}>
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
      <Modal open={open} onClose={handleClose}>
        <div>Add Image</div>
      </Modal>
    </>
  );
};

export default Gallery;
