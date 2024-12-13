const typeDefs = `
    
    type User {
      username: String
      email: String
    }
    
    type Auth {
      token: ID
      user: User
    }

    type Movie {
      _id: ID!
      poster: String
      title: String!
      genres: [String]
      plot: String
      runtime: Int
      year: Int
      imdbRating: Float
    }
      
    type Query {
      user: User
      moviesByGenreAndRating(genre: [String]!, imdbRating: Float!): [Movie]
    }

    type Mutation {
      addUser(
        username: String!
        email: String!
        password: String!
      ): Auth
      login(email: String!, password: String!): Auth
      }
`;


module.exports = typeDefs;
