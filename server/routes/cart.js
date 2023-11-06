const express = require("express");
const router = express.Router();

const {auth} = require("../middlewares/auth");
const {addToCart,removeFromCart} = require("../controllers/cart");


router.put('/cart/addToCart/:productId',auth,addToCart);
router.put('/cart/removeFromCart/:productId', auth, removeFromCart)

module.exports = router;