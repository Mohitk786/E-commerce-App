const express = require("express");
const router = express.Router();

const {auth, isSeller, isCustomer} = require("../middlewares/auth")
const {addItem, showAllItems} = require("../controllers/items");


router.post('/addProduct',auth, isSeller, addItem);
router.get('/showItems',auth, isSeller, showAllItems);

module.exports = router;