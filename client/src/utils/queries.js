import { gql } from "@apollo/client";

export const QUERY_MOVIES = gql`
  query MoviesByGenreAndRating($genre: String, $imdbRating: Float) {
    moviesByGenreAndRating(genre: $genre, imdbRating: $imdbRating) {
      _id
      title
      poster
      genre
      plot
      runtime
      year
      imdbRating
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      _id
      username
      email
      savedMovies {
        _id
        title
        poster
        genre
        plot
        runtime
        year
        imdbRating
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedMovies {
        _id
        title
        poster
        genre
        plot
        runtime
        year
        imdbRating
      }
    }
  }
`;