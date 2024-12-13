const mongoose = require("mongoose");

const { Schema } = mongoose;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
  },
  genres: [{ type: String }], // array of strings
  plot: {
    type: String,
  },
  runtime: {
    type: Number,
  },
  year: {
    type: Number,
  },
  rating: {
    type: Number,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
