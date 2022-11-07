import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import GalleryImage from "../GalleryImage/GalleryImage";
import upload_image from "../../assets/upload_image.png";
import "./Gallery.css";
import axios from "axios";

const Gallery = ({ Pet }) => {
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
  const data = { petId: Pet._id };
  const [Images, setImages] = useState([]);
  useEffect(() => {
    fetchItem();
  }, []);
  const fetchItem = () => {
    axios
      .post("http://localhost:8000/pet/getImages/", data)
      .then((res) => {
        // console.log(res);
        setImages(res.data.gallery);
      })
      .catch((err) => {
        console.log(err);
      });
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
          {Images.map((Image) => {
            return <GalleryImage Image={Image} />;
          })}
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
