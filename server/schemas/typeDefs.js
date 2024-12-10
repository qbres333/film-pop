const typeDefs = `
    
    type User {
      username: String
      email: String
    }
    
    type Auth {
      token: ID
      user: User
    }

    type Query {
      user: User
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
