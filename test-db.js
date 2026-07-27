const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://the-politicst:q6g2EW6EEhwjVmKF@cluster0.biasmpt.mongodb.net/the-politicst?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    process.exit(0);
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
