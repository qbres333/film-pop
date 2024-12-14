const { User, Movie } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        // retrieve user data, populated with movieLists and movies
        const userData = await User.findById(context.user._id).populate("savedMovies");

        return userData;
      } 
      throw Error("User not authenticated");
    },
    
    me: async (parent, args, context) => {
      if (context.user) {
        const savedMovieList = await User.findById(context.user._id).populate('savedMovies')

        return savedMovieList;
      }
      throw AuthenticationError;
    },

    moviesByGenreAndRating: async (parent, { genre, imdbRating }) => {
      const minRating = imdbRating - 1;
      const maxRating = imdbRating + 1;

      const randomMovies = await Movie.aggregate([
        {
          $match: {
            genre: { $in: [genre] },
            imdbRating: { $gt: minRating, $lte: maxRating },
          },
        },
        {
          $sample: { size: 3 }, // Limit to 3 random movies
        },
      ]);

      if (!randomMovies || randomMovies.length === 0) {
        console.error("No movies found with the given criteria!");
      }

      console.log("Movies:", randomMovies);
      return randomMovies;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
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

    addMovieToList: async (parent, { _id }, context) => {
      if (context.user) {
        const existingMovie = await Movie.findById(_id);

        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $push: { savedMovies: existingMovie._id } },
          { new: true } //return updated User document
        ).populate("savedMovies"); //show updated movie list

        return updatedUser;
      }
      throw AuthenticationError;
    },

    deleteMovieFromList: async (parent, { _id }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedMovies: { _id } } },
          { new: true }
        ).populate("savedMovies");
        return updatedUser;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
