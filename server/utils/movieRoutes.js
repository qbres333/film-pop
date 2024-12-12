// routes to retrieve movie data
// import express for routing, and the DB connection
const express = require("express");
const database = require("../config/connection");

let movieRoutes = express.Router();

// GET route - 5 random movies
movieRoutes.route("/movies").get(async (req, res) => {
  try {
    let db = database.getDb();

    // set rating based on user's selection
    const selectedGenre = req.body.genre;
    const selectedRating = req.body.rating;

    let minRating, maxRating;

    switch (selectedRating) {
      case "Abysmal":
        minRating = 0;
        maxRating = 2;
        break;
      case "Bad":
        minRating = 2;
        maxRating = 4;
        break;
      case "Average":
        minRating = 4;
        maxRating = 6;
        break;
      case "Good":
        minRating = 6;
        maxRating = 8;
        break;
      case "Excellent":
        minRating = 8;
        maxRating = 10;
        break;
      default:
        // Handle invalid rating options
        return res.status(400).json({ error: "Invalid Rating" });
    }

    let movieData = await db
      .collection("movies")
      .aggregate([
        {
          $match: {
            genres: selectedGenre,
            "imdb.rating": { $gt: minRating, $lte: maxRating },
          },
        },
        { $sample: { size: 5 } },
      ])
      .toArray()
      .then((results) => res.json(results))
      .catch((err) => {
        if (err) {
          res.status(404).json(err);
          console.log("No movies found with that criteria!");
        }
      });

    // // --------------- for testing --------------------- test successful at http://localhost:3001/movies
    // let movieData = await db
    //   .collection("movies")
    //   .find()
    //   .limit(5)
    //   .toArray()
    //   .then((results) => res.json(results))
    //   .catch((err) => {
    //     if (err) {
    //       res.status(404).json(err)
    //       console.log("No movies found with that criteria!");
    //     }
    //   });

    res.status(200).json(movieData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

module.exports = movieRoutes;