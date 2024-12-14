const typeDefs = `
    
    type User {
      username: String
      email: String
      savedMovies: [Movie]
    }
    
    type Auth {
      token: ID
      user: User
    }

    type Movie {
      _id: ID
      poster: String
      title: String
      genre: [String]
      plot: String
      runtime: Int
      year: Int
      imdbRating: Float
    }
    
    type Query {
      user: User
      moviesByGenreAndRating(genre: String, imdbRating: Float): [Movie]
    }

    type Mutation {
      addUser(
        username: String!
        email: String!
        password: String!
      ): Auth
      login(email: String!, password: String!): Auth
      addMovieToList(_id: ID): User
      deleteMovieFromList(_id: ID): User
    }
`;


module.exports = typeDefs;
