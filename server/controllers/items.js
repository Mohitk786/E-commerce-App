const {User} = require("../models/User");
const Item = require("../models/Item");
const Category = require("../models/Category");
const {uploadImageToCloudinary} = require("../utils/imageUploader")


exports.addItem = async (req, res) => {
    try {
        const { itemName, itemDescription, price, category } = req.body;
        if (!itemName || !itemDescription || !price || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const thumbnail = req.files.thumbnail;
        const userId = req.user.id;


        // Fetch seller details by some conditions (e.g., by user ID)
        const sellerDetails = await User.findOne({ _id: userId });

        if (!sellerDetails) {
            return res.status(404).json({
                success: false,
                message: "Seller Details not found, No such seller account exists",
            });
        }

        // Upload the thumbnail image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // Create the item
        const item = await Item.create({
            itemName,
            itemDescription,
            seller: userId || sellerDetails._id,
            category : category,
            price,
            thumbnail: thumbnailImage.secure_url || thumbnailImage.url
        });


        // Push the ID of the item into the seller's items array
        await User.findByIdAndUpdate(
            { _id: sellerDetails._id },
            {
                $push: {
                    yourProducts: item._id // Assuming 'yourProducts' is the field for a seller's products
                },
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Item created successfully",
            data: item, // Use the 'item' variable
        });
    } catch (err) {
        console.log(`Error in adding items ${err.message}`);
        return res.status(400).json({
            success: false,
            message: `Error occurred: ${err.message}`
        });
    }
}


exports.showAllItems = async(req,res) => {
    try{
        const allItems = await Item.find({}).populate("seller").exec();
            
        return res.status(200).json({
            success:true,
            message:"Data for all items fetched Successfully",
            data:allItems, 
        })
        
    }catch(err){
        console.log(`Error while fetching details of all items`);
        return res.status(500).json({
            success:false,
            message:`Error aa gaya ${err.message}`,
        })
    }
}

exports.itemDetail = async(req,res) => {
    try{
        const {itemId} = req.body;
        const itemDetails = await Item.findById({_id:itemId})
                                        .populate("seller")
                                        .populate("category")
                                        .exec();

        if(!itemDetails){
            return res.status(400).json({
                success:false,
                message:`Could not find the item with ${itemId}`,
            })
        }
        return res.status(200).json({
            success:true,
            message:"item detail found successfully",
        })

    }catch(err){
        console.log(`Error while fetching details of item`);
        return res.status(500).json({
            success:false,
            message:`Error aa gaya ${err.message}`,
        })
    }
}


exports.removeItem = async(req,res) => {
    try{
        const {itemid} = req.body;
        const data = await Item.findByIdAndDelete({_id:itemid});

            return res.status(200).json({
                success:false,
                message:`Item removed successfully`,
                data
            })



    }catch(err){
        return res.status(400).json({
            success:false,
            message:`error while trying to remove item ${err.message}`
        })
    }
}


exports.getFilteredItem = async(req,res) => {
    try{
        const {category} = req.params;
        console.log("printing category");
        if(!category){
            return res.status(400).json({
                success:false,
                message:`No Category exist`
            })
        }

        const items = await Item.find({category:category});

        return res.status(200).json({
            success:true,
            message:`data fetched successfully`
        })



    }catch(err){
        return res.status(400).json({
            success:false,
            message:`Check your network connection${err.message}`
        })
    }
}