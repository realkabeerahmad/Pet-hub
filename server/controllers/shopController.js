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
const cartItem = require("../models/cartItem");

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
    Link: req.body.category + "_" + req.body.name + "_" + uuidv4(),
  };
  try {
    const Product = new product(obj);
    Product.save()
      .then(() => {
        res.status(200).send("Product Saved Successfully");
      })
      .catch((err) => {
        res.send(err.message);
      });
  } catch (error) {
    res.send(error.message);
  }
});

// View a Product
router.post("/showProduct", Upload.single("image"), (req, res) => {
  const { productId } = req.body;
  try {
    product.findById({ productId }, (product, err) => {
      if (product) {
        res.status(200).send(product);
      } else {
        res.send(err.message);
      }
    });
  } catch (error) {
    res.send(error.message);
  }
});

// View all Products
router.post("/showAllProducts", Upload.single("image"), (req, res) => {
  try {
    product.find((data, err) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.send(err.message);
      }
    });
  } catch (error) {
    res.send(error.message);
  }
});

// View all Products
router.post("/deleteProduct", (req, res) => {
  const { productId } = req.body;
  console.log(productId);

  try {
    product.deleteOne({ productId }, (data, err) => {
      if (data) {
        res.send(data);
      } else {
        res.send(err);
      }
    });
  } catch (error) {
    res.send(error.message);
  }
});

// View all Products
router.post("/addToCart", (req, res) => {
  const { productId, userId } = req.body;
  try {
    cart.findOne({ userId }, async (data, err) => {
      if (data) {
        addToCart(productId, data._id, res);
      } else {
        const Cart = new cart({ userId });
        await Cart.save()
          .then(() => {
            addToCart(productId, res);
          })
          .catch((err) => {
            res.send(err.message);
          });
      }
    });
  } catch (error) {
    res.send(error.message);
  }
});
const addToCart = async (productId, res) => {
  const cartitem = new cartItem({ productId });
  await cartitem
    .save()
    .then(() => {
      res.send("Item added successfully");
    })
    .catch(() => {
      res.send("Error occured");
    });
};
module.exports = router;
