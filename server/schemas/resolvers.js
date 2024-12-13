const { User, Movie } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

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
    moviesByGenreAndRating: async (parent, args) => {
      const minRating = args.rating - 1;
      const maxRating = args.rating + 1;

      const randomMovies = await Movie.aggregate([
        {
          $match: {
            genres: args.genre,
            imdbRating: { $gt: minRating, $lte: maxRating },
          },
        },
        { $sample: { size: 1 } },
        {
          $project: {
            _id: 1,
            title: 1,
            poster: 1,
            genres: 1,
            plot: 1,
            runtime: 1,
            year: 1,
            imdbRating: 1,
          },
        },
      ]);
      // console.log("movies:", randomMovies);
      return randomMovies;
    },
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