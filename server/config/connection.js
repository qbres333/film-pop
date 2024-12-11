const mongoose = require('mongoose');

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_ATLAS_URI || "mongodb://127.0.0.1:27017/film-pop")
  .then(() => console.log(`MongoDB Atlas Connected!\n`))
  .catch((err) => console.error(err));

module.exports = mongoose.connection;
