const { User, Movie } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const database = require("../config/connection");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        // retrieve user data, populated with movieLists and movies
        const userData = await User.find({
          _id: context.user._id,
        }).populate({
          path: "movieLists",
          populate: {
            path: "movies",
          },
        });

        return userData;
      } else {
        throw Error("User not authenticated");
      }
    },
    moviesByGenreAndRating: async (_, {genre, imdbRating}) => {
      let db = database.getDb();
      const minRating = imdbRating -1;
      const maxRating = imdbRating +1;

      const movieCriteria = [
        {
          $match: {
            genres: genre,
            "imdb.rating": { $gt: minRating, $lte: maxRating },
          },
        },
        { $sample: { size: 5 } },
      ];
      const randomMovies = await db.collection("movies").aggregate(movieCriteria).toArray();
      return randomMovies;
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;