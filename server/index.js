const express = require("express");
const mongose = require("mongoose")
const dotenv = require("dotenv")
const route = require("./routes/userRoute");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

// Routes
app.use("/api/user", route);

  app.listen(PORT,()=>{
    console.log("running in 8000");
    
  });

// Connect to MongoDB and start server
mongose.connect(MONGOURL,{
   serverSelectionTimeoutMS: 5000, // Timeout after 5s (not 30s default)
  socketTimeoutMS: 45000, // Close idle connections
})
  .then(() => {
    console.log("DB connected successfully..!");
  })
  .catch((error) => {
    console.error("DB connection failed:", error);
    process.exit(1);
  });

