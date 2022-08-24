import React, { useState } from "react";
import Modal from "@mui/material/Modal";
const GalleryImage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <div className="gallery-image" onClick={handleOpen}>
        <img src="https://source.unsplash.com/150x400/?pet" alt="" />
      </div>
      <Modal open={open} onClose={handleClose}>
        <div>
          Some Text
          <img src="https://source.unsplash.com/150x400/?pet" alt="" />
        </div>
      </Modal>
    </div>
  );
};

export default GalleryImage;
