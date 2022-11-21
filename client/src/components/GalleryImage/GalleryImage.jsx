import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import "./GalleryImage.css";
import axios from "axios";

const GalleryImage = ({ Image, Pet, setPet }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteImage = () => {
    const data = { _id: Pet._id, imageId: Image._id };
    axios
      .post("http://localhost:8000/pet/deleteImage", data)
      .then((res) => {
        alert(res.data.message);
        handleClose();
        axios
          .post("http://localhost:8000/pet/showPet", data)
          .then((r) => {
            setPet(r.data.pet);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <div className="gallery-image" onClick={handleOpen}>
        <img src={"http://localhost:8000/" + Image.image} alt="" />
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="gallery-image-zoom">
          <div className="gallery-image-zoom-wrapper">
            <div className="gallery-image-zoom-header">
              <button className="delete-btn-l" onClick={deleteImage}>
                <i className="fa fa-trash"></i>
              </button>
              <button onClick={handleClose}>
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="gallery-image-zoom-img">
              <img src={"http://localhost:8000/" + Image.image} alt="" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GalleryImage;
