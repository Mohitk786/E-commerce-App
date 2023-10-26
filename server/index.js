const express = require("express");
const app = express();
const database = require("./config/database");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary")
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

require("dotenv").config();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:3000/",
        credentials: true,
        optionSuccessStatus: 200
    })
);

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

cloudinaryConnect();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const itemRoutes = require("./routes/item");

app.use("",authRoutes);
app.use("", userRoutes);
app.use("", itemRoutes);

database.connect();

app.listen(process.env.PORT, ()=>{
    console.log(`App is listening on Port ${process.env.PORT}`)
})