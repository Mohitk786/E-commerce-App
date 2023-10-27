const jwt = require("jsonwebtoken");

exports.auth = async(req,res,next) => {
    
    const token =  req.cookies.access_card || req.body.token;

    if(!token){
        return res.status(400).json({
            success:false,
            message:"token 1 is missing"
        })
    }

    try{
        //decode the token
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;

    }catch(err){
        return res.status(400).json({
            success:false,
            message:"token is invalid",
        });
    }
    
    next();
    
}

exports.isSeller = async(req,res, next) => {
    try{
        if(req.user.accountType !== "Seller"){
            return res.status(401).json({
                success:false,
                message:"Only Seller account is allowed to access this route",
            });  
        }
        next();
    }catch(err){
        console.log("")
    }
}

exports.isCustomer = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Customer"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Customer only",
            });  
        }
        next();
    }catch(err){

    }
}


exports.isAdmin = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Admin only",
            });  
        next();
        }
    }catch(err){

    }
}