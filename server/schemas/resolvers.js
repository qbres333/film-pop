const { User, Movie } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        // retrieve user data, populated with movieLists and movies
        const userData = await User.findById(context.user._id).populate({
          path: "savedMovies",
          model: 'Movie',
        });

        return userData;
      } 
      throw Error("User not authenticated");
    },
    
    me: async (parent, args, context) => {
      if (context.user) {
        const savedMovieList = await User.findById(context.user._id).populate({
          path: "savedMovies",
          model: "Movie",
        });

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
        // console.log('user does not exist')
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        // console.log('incorrect password')
        // console.log(password)
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    addMovieToList: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);

        if (user.savedMovies.includes(_id)) {
          throw new Error('Movie is already saved in your movie list')
        }
        const movieToSave = await Movie.findById(_id);

        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $push: { savedMovies: movieToSave._id } },
          { new: true } //return updated User document
        ).populate({
          path: "savedMovies",
          model: "Movie",
        });//show updated movie list

        return updatedUser;
      }
      throw AuthenticationError;
    },

    deleteMovieFromList: async (parent, { _id }, context) => {
      if (context.user) {
        const movieToDelete = await Movie.findById(_id);

        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedMovies: movieToDelete._id } },
          { new: true }
        ).populate({
          path: "savedMovies",
          model: "Movie",
        });

        return updatedUser;
      }
      throw AuthenticationError;
    },

  },
};

module.exports = resolvers;
