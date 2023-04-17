const express = require('express')
const app = express()
const path = require("path")
require("dotenv").config();
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/categories')
const multer = require('multer');
// const mongoose = require("mongoose")
const connectDB=require("./db/connect")
 
app.use(express.json());
app.use("/images", express.static(path.join(__dirname,"/images")))


const storage = multer.diskStorage({
      destination : (req, file, cb) =>{
            cb(null, "images");
      },
      filename : (req, file, cb) =>{
            cb(null, req.body.name)
      }
})

const upload = multer({storage : storage});
app.post("/api/upload" , upload.single("file"), (req,res)=>{
      res.status(200).json("File has been uploaded")
})

app.use('/api/auth',authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts' , postRoute);
app.use('/api/categories' , categoryRoute);

const start = async() =>{
      try{
           await connectDB(process.env.MONGO_URL);

            app.listen(5000,()=>{
                  console.log("server is running at 5000");
            });
      }
      catch(err){
            console.log(err);
      }
}

start();



// mongoose.connect(process.env.MONGO_URL,
//   {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true

//   }
// );

// app.listen(5000, ()=>{
//       console.log("running on port 5000");
// })