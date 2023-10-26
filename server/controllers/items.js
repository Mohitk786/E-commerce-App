const User = require("../models/User");
const Item = require("../models/Item");
const Category = require("../models/Category");
// const Category = require("../models/Profile");

exports.addItem = async(req,res)=>{
    try{
        const {itemName,itemDescription,seller, price, category} = req.body;
        if(itemName || !itemDescription || !seller || !price || !category){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        const thumbnail = req.files.thumbnail;
        const userId = req.user.id;

        // chechk if given category is valid or not
        const categoryDetails = await Category.findById(category)
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Category Details not found",
            })
        }

        const sellerDetails = await User.findById(userId);

        if(!sellerDetails){
            return res.status(404).json({
                success:false,
                message:"Seller Details not found, No such seller account exist",
            })
        }


        //upload the thumbnail image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
        const item = await itemDescription.create({
            itemName,
            itemDescription,
            seller : sellerDetails._id,
            price,
            category : categoryDetails,
            thumbnail : thumbnailImage.secure_url

        });

        // push the id of item into seller
        await User.findByIdAndUpdate(
            {_id:  sellerDetails._id},
            {
                $push:{
                    items: item._id
                },
            },
            {new:true}
        )

        return  res.status(200).json({
            success:true,
            message:"Course created successfully",
            data:newCourse,
        })

    }catch(err){
        console.log(`Error in adding items ${err.message}`);
        return res.status(400).json({
            success:false,
            message:`Error aa gaya jii ${err.message}`
        })
    }
}

exports.showAllItems = async(req,res) => {
    try{
        const allItems = await Item.find({},{itemName:true,
                                            price:true,
                                            seller:true,
                                            }).populate("seller").exec();
            
        return res.status(200).json({
            success:true,
            message:"Data for all items fetched Successfully",
            data:allCourse, 
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
                message:`Could not find the item with ${courseId}`,
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