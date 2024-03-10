const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

dotenv.config();

const table = require("./routes/tableRoute");

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database is connected successfully!");
  } catch (err) {
    console.log(err);
  }
};


// Middlewares
app.use(express.json());
const _dirname = path.dirname("");
const buildpath = path.join(_dirname, "../Frontend/dist");
app.use(express.static(buildpath));
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(bodyParser.urlencoded({extended:true}));

app.use("/api/v1", table);
app.get("/*",function(req,res){
    res.sendFile(
        path.join(__dirname,"../Frontend/dist/index.html"),
        function(err){
            if(err){
                res.status(500).send(err);
            }
        }
    );
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log("app is running on port " + PORT);
});