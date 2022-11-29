import React, { useState } from "react";
import axios from "axios";
import "./AddItems.css";
const AddItems = () => {
  const [IMGG, setIMGG] = useState("");
  const [Product, setProduct] = useState({
    image: "",
    name: "",
    quantity: "",
    price: "",
    tags: "",
    details: "",
  });
  const handleChange = (e) => {
    setProduct({ ...Product, [e.target.name]: e.target.value });
  };
  // const handleImage = (e) => {
  //   setProduct({ ...Product, image: e.target.files[0] });
  //   console.log(Product.photo);
  // };
  const handleImage = (e) => {
    setProduct({ ...Product, image: e.target.files[0] });
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setIMGG(reader.result);
    });
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", Product.image);
    formData.append("name", Product.name);
    formData.append("quantity", Product.quantity);
    formData.append("category", Product.tags);
    formData.append("price", Product.price);
    // formData.append("tags", Product.tags);
    formData.append("details", Product.details);
    formData.append("details", Product.details);
    formData.append("Warranty", "Not Available");
    formData.append("Return", "Not Available");
    formData.append("StandardShipping", "Available");
    formData.append("FastShipping", "Not Available");
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios
      .post("http://localhost:8000/shop/addProduct", formData, config)
      .then((res) => {
        alert(res.data.message);
        setProduct({
          image: "",
          name: "",
          quantity: "",
          price: "",
          tags: "",
          details: "",
        });
      })
      .catch((err) => {
        // alert(err.data.message);
        alert(err);
      });
  };

  return (
    <div className="AddProductPage">
      <div className="form">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          autoComplete="off"
        >
          <div className="form-item">
            <div className="ImagePreview">
              <img src={IMGG} alt="" />
            </div>
            {/* <label htmlFor="image">
              Product Image:<span className="required">*</span>
            </label> */}
            <input
              type="file"
              name="Image"
              accept=".png, .jpg, .jpeg"
              onChange={handleImage}
            />
          </div>
          <div className="form-item">
            <label htmlFor="name">
              Product Name:<span className="required">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={Product.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-item">
            <label htmlFor="quantity">
              Product Quantity:<span className="required">*</span>
            </label>
            <input
              type="number"
              name="quantity"
              placeholder="Product Quanity"
              value={Product.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-item">
            <label htmlFor="price">
              Product Price:<span className="required">*</span>
            </label>
            <input
              type="number"
              name="price"
              placeholder="Product Price"
              value={Product.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-item">
            <label htmlFor="tags">
              Product Tags:<span className="required">*</span>
            </label>
            <select
              name="tags"
              id="tags"
              placeholder="Select Tag"
              value={Product.tags}
              onChange={handleChange}
              required
            >
              <option value="Select Tag">Select Tag</option>
              <option value="Food">Food</option>
              <option value="Cloths">Cloths</option>
              <option value="Toys">Toys</option>
              <option value="Medicine">Medicine</option>
              <option value="Accessory">Accessory</option>
            </select>
          </div>
          <div className="form-item">
            <label htmlFor="details">
              Product Details:<span className="required">*</span>
            </label>
            <textarea
              name="details"
              placeholder="Product Details"
              onChange={handleChange}
              value={Product.details}
              rows={5}
              required
            />
          </div>
          <div className="form-btn">
            <button id="button" type="submit">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
