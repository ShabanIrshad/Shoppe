const mongoose = require("mongoose");
require("dotenv").config();

console.log("URI exists:", !!process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

module.exports = mongoose.connection;