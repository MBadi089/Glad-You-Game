const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    gameCount: Int
    savedGames: [Game]
    reviews: [Review]
  }

  type Game {
    gameId: String
    name: String
    description: String
    image: String
    rating: Int
    ratings_count: Int
    esrb: String
    reviews: [Review]
  }

  input ReviewInput {
    _id: ID
    reviewBody: String
    username: String
    createdAt: String
  }

  input GameInput {
    gameId: String
    name: String
    description: String
    image: String
    rating: Int
    ratings_count: Int
    esrb: String
    reviews: [ReviewInput]
  }
  type Review {
    _id: ID
    reviewBody: String
    username: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    game(gameId: String!): Game
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addReview(gameId: String!, reviewBody: String!): Game
    saveGame(gameBody: GameInput!): User
    removeGame(gameId: String!): User
  }
`;

module.exports = typeDefs;