// code to retrieve data from the API

/* 
fields: poster, title, genres, plot, runtime, year, imdb(object):rating
***user $regex for genres

to include a field in retrieved data, set the value to 1:
{ poster: 1 title: 1, genres: 1, plot: 1, runtime: 1, year: 1, imdb.rating: 1 }

*/

// movie model
const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new mongoose.Schema({
  poster: String,
  title: String,
  genres: [String],
  plot: String,
  runtime: Number,
  year: Number,
  imdbRating: Number,
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
