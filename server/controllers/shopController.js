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
const order = require("../models/order");
const orderItem = require("../models/orderItem");

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
    console.log("here");
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
  const { productId } = req.body;
  try {
    product
      .findByIdAndDelete({ productId })
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
router.post("/newCart", (req, res) => {
  const { userId } = req.body;
  try {
    cart.find({ userId }, async (data, err) => {
      if (data) {
        throw Error("Cart Already Exist");
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
  const { productId, name, price, image, cartId, quantity } = req.body;
  const product = { productId, name, price, image, cartId, quantity };
  try {
    cart.findById({ cartId }, (data, err) => {
      if (data) {
        addToCart(product, res);
      } else {
        throw Error("Cart Not Found");
      }
    });
  } catch (error) {
    res.send({ status: "success", message: error.message });
  }
});

// Function to add to cart
const addToCart = async (product, res) => {
  const cartId = product.cartId;
  const productId = product.productId;
  try {
    cartItem.find({ cartId, productId }, async (err, data) => {
      if (data) {
        throw Error("Product Already in Cart");
      } else {
        const Cartitem = new cartItem(product);
        await Cartitem.save()
          .then(() => {
            res.send("Item added to Cart successfully");
          })
          .catch(() => {
            throw Error("Error occured");
          });
      }
    });
  } catch (error) {
    res.send({ status: "failed", message: error.message });
  }
};

// Delete From Cart
router.post("/deleteFromCart", (req, res) => {
  const { cartItemId } = req.body;
  try {
    cartItem
      .findByIdAndDelete({ cartItemId })
      .then(() => {
        res.send("successfully item deleted from cart");
      })
      .catch(() => {
        throw Error("error deleting item from cart");
      });
  } catch (error) {
    res.send({ status: "failed", message: error.message });
  }
});

router.get("/showCartItems", (req, res) => {
  const { cartId } = req.body;
  try {
    cartItem.find({ cartId: cartId }, async (err, data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        throw Error(err + "\nError Happend");
      }
    });
  } catch (error) {
    res.send({ status: "failed", message: error.message });
  }
});

module.exports = router;
