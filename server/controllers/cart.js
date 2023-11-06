const {User} = require("../models/User");
const Item = require("../models/Item");
const mongoose = require('mongoose'); // Import the mongoose library

exports.addToCart = async (req, res) => {
    try {
      const { productId } = req.params;
      const userId = req.user.id;
  
      const product = await Item.findById(productId); 
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Something went wrong with Product Id"
        });
      }
  
      const user = await User.findByIdAndUpdate(
        userId, 
        {
          $push: {
            itemsInCart: productId 
          }
        },
        { new: true }
      );
        
      const totalItems = user.itemsInCart.length;
      console.log(totalItems)

      return res.status(200).json({
        success: true,
        message: "Item Added Successfully",
        totalItems,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }
  };
  
  exports.removeFromCart = async (req, res) => {
    try {
      const { productId } = req.params;
      const userId = req.user.id;
  
      const product = await Item.findById(productId); 
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Something went wrong with Product Id"
        });
      }
  
      const user = await User.findByIdAndUpdate(
        userId, 
        {
          $pull: {
            itemsInCart: productId 
          }
        },
        { new: true }
      );
      
      const totalItems = user.itemsInCart.length;
      console.log(totalItems)
      
      return res.status(200).json({
        success: true,
        message: "Item Removed Successfully",
        totalItems,
      });

    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }
  };
  