import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import "./GalleryImage.css";

const GalleryImage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <div className="gallery-image" onClick={handleOpen}>
        <img src="https://source.unsplash.com/1600x900/?pet" alt="" />
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="gallery-image-zoom">
          <div className="gallery-image-zoom-wrapper">
            <div className="gallery-image-zoom-header">
              <button onClick={handleClose}>
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="gallery-image-zoom-img">
              <img src="https://source.unsplash.com/1600x900/?pet" alt="" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GalleryImage;
