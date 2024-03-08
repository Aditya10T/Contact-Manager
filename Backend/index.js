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
app.use(express.json())
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(bodyParser.urlencoded({extended:true}));

app.use("/api/v1", table);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log("app is running on port " + PORT);
});