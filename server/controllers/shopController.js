// to Read Enviorment Variables
const dotenv = require("dotenv");

// Express JS used to create Routes
const express = require("express");

// Using Router from Express JS to create exportable routes
const router = express.Router();

// Setting Up Envionment Variables
dotenv.config();

// Import Multer Storage
const Upload = require("../config/multer");

// UUID V4 for generation Link
const { v4: uuidv4 } = require("uuid");

// Import Product Model
const product = require("../models/product");
const cart = require("../models/cart");
const order = require("../models/order");

// Add a Product
router.post("/addProduct", Upload.single("image"), (req, res) => {
  const obj = {
    name: req.body.name,
    category: req.body.category,
    quantity: req.body.quantity,
    price: req.body.price,
    description: req.body.description,
    Warranty: req.body.Warranty,
    Return: req.body.Return,
    StandardShipping: req.body.StandardShipping,
    FastShipping: req.body.FastShipping,
    Image: req.file.filename,
  };
  console.log(obj.Image);
  try {
    const Product = new product(obj);
    Product.save()
      .then(() => {
        res
          .status(200)
          .send({ status: "success", message: "Product Saved Successfully" });
      })
      .catch((err) => {
        throw Error(err.message);
      });
  } catch (error) {
    res.send({ status: "failed", message: error.message });
  }
});

// View a Product
router.get("/showProduct", (req, res) => {
  const { productId } = req.body;
  try {
    product.findById({ productId }, (product, err) => {
      if (product) {
        res.status(200).send({ status: "success", data: product });
      } else {
        throw Error(err.message);
      }
    });
  } catch (error) {
    res.send({ status: "failed", message: error.message });
  }
});

// View all Products
router.get("/showAllProducts", (req, res) => {
  try {
    product.find((err, data) => {
      if (data) {
        res.status(200).send({ status: "success", products: data });
      } else {
        throw Error("Products not found");
      }
    });
  } catch (error) {
    res.send({ status: "failed", message: error.message });
  }
});

// Delete a Product
router.post("/deleteProduct", (req, res) => {
  const { _id } = req.body;
  try {
    product
      .findByIdAndDelete({ _id: _id })
      .then(() => {
        res.status(200).send({
          status: "success",
          message: "Product Deleted Successfully",
        });
      })
      .catch((err) => {
        throw Error(err.message);
      });
  } catch (error) {
    res.send({ status: "failed", message: error.message });
  }
});

// Create Cart
router.post("/cart", (req, res) => {
  const { userId } = req.body;
  try {
    cart.findOne({ userId }, async (err, data) => {
      if (data) {
        res.send({
          status: "failed",
          message: "Cart Already Exist",
          cart: data,
        });
      } else {
        const Cart = new cart({ userId });
        await Cart.save();
        res.send({ status: "success", message: "Cart Created" });
      }
    });
  } catch (error) {
    res.send({ status: "failed", message: error.message });
  }
});

// Add Product to Cart
router.post("/addToCart", (req, res) => {
  const { _id, name, price, image, cartId, quantity } = req.body;
  try {
    cart.findById({ _id: cartId }, (err, data) => {
      if (data) {
        data.products.forEach((product) => {
          if (product._id === _id) {
            res.send({
              status: "failed",
              error: "Product already in Cart",
            });
          }
        });
        cart
          .updateOne(
            { _id: cartId },
            {
              $push: {
                products: {
                  _id: _id,
                  name: name,
                  Image: image,
                  price: price,
                  quantity: quantity,
                },
              },
            }
          )
          .then(() => {
            res.send({
              status: "success",
              message: "Product Added to Cart Successfully",
            });
          })
          .catch((err) => {
            res.send({
              status: "failed",
              error: "Faild to add due to following:\n" + err.message,
            });
          });
      }
    });
  } catch (error) {
    res.send({ status: "success", message: error.message });
  }
});

// Delete From Cart
router.post("/deleteFromCart", (req, res) => {
  const { cartId, _id } = req.body;
  try {
    cart
      .findByIdAndUpdate({ _id: cartId }, { $pull: { products: { _id: _id } } })
      .then(() => {
        res.send({ status: "success", message: "Deleted Successfully" });
      })
      .catch((err) => {
        res.send({
          status: "failed",
          message: "Unable to Delete" + err.message,
        });
      });
  } catch (error) {
    res.send({ status: "failed", message: error.message });
  }
});

router.post("/showCart", (req, res) => {
  const { cartId } = req.body;
  try {
    cart.findById({ _id: cartId }, (err, data) => {
      if (data) {
        res.status(200).send({
          status: "success",
          message: "Operation Successfull",
          cart: data,
        });
      } else {
        res.send({
          status: "failed",
          error: "Faild due to following:\n" + err.message,
        });
      }
    });
  } catch (error) {
    res.send({ status: "failed", message: error.message });
  }
});

module.exports = router;
