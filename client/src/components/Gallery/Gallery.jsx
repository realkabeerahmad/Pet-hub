import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import GalleryImage from "../GalleryImage/GalleryImage";
import upload_image from "../../assets/upload_image.png";
import "./Gallery.css";
const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [image, setimage] = useState(upload_image);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setimage(upload_image);
  };
  const handleImage = (e) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setimage(reader.result);
    });
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <>
      <div className="pet-gallery">
        <div className="gallery-header">
          <p className="gallery-header-heading">
            <b>GALLERY</b>
          </p>
          <button className="btn" onClick={handleOpen}>
            <i className="fa fa-plus"></i>&nbsp;&nbsp;ADD
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
        <div className="add">
          <div className="add-wrapper">
            <div className="add-top-bar">
              <i className="fa fa-times" onClick={handleClose}></i>
            </div>
            <div className="add-screen">
              <div className="add-image">
                <img src={image} alt="" />
              </div>
              <input
                type="file"
                name="Image"
                accept=".png, .jpg, .jpeg"
                onChange={handleImage}
              />
              <button className="btn">
                <i className="fa fa-save"></i>
                &nbsp;&nbsp;SAVE
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Gallery;
