const User = require("../models/User");
const Profile = require("../models/Profile");


exports.createProfile = async (req,res) => {
    try{

        const {DOB,MoNumber,about,gender} = req.body;

        const profile = new Profile({
            DOB:DOB,
            MoNumber:MoNumber,
            about:about,
            gender:gender,
        }).save();

        // find the user and update additional details in User
        const userId = req.user.id;
        console.log("printing Id", userId);

        const user = await User.findByIdAndUpdate({_id:userId},{
                    $push:{
                        additionalDetails:profile._id
                    },
                }, {new:true}
        )

        return res.status(200).json({
            succss:true,
            message:"Profile updated successfully",
        })

    }catch(err){
        return res.status(400).json({
            succss:false,
            message:"failed to updated Profile",
        })
    }
}

exports.deleteAccount = async (req,res) => {
    try{
        //get id
        const id = req.user.id;
        //validation
        const userDetails= await User.findById({_id:id});
        if(!userDetails){
            return res.status( 404).json({
                success:false,
                message:"User Not found",
            });
        }

        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        //delete Account
        await User.findByIdAndDelete({_id:id});

        return res.status(200).json({
            success:true,
            message:"User deleted successfully",
        })


    }catch(err){
            return res.status(400).json({
                success:false,
                message:"failed to Delete account",
                error : err.message,
            })
    }
}