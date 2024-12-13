import { gql } from "@apollo/client";

export const QUERY_MOVIES = gql`
  query findMovies($genre: String!, $rating: Float) {
    moviesByGenreAndRating(genre: $genre, rating: $rating) {
      _id
      title
      poster
      genres
      plot
      runtime
      year
      imdb {
        rating
      }
    }
  }
`;

export const QUERY_USER = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;
