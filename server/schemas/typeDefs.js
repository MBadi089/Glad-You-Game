const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    gameCount: Int
    savedGames: [Game]
  }

  type Game {
    gameId: String
    title: String
    description: String
    image: String
    link: String
  }

  input GameInput {
    gameId: String
    title: String
    description: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveGame(gameBody: GameInput!): User
    removeGame(gameId: String!): User
  }
`;

module.exports = typeDefs;