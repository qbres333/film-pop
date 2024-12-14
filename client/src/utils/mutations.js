import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;


export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_MOVIE = gql`
  mutation addMovieToList($_id: ID!) {
    addMovieToList(_id: $_id) {
        _id
        username
        email
        savedMovies {
          _id
          title
        }
      }
  }
`;

export const DELETE_MOVIE = gql`
  mutation deleteMovieFromList($_id: ID!) {
    deleteMovieFromList(_id: $_id) {
      user {
        _id
        username
        email
        savedMovies {
          _id
          title
        }
      }
    }
  }
`;

