import { gql } from '@apollo/client';

export const GET_ME = gql`
{
    me {
      _id
      username
      email
      gameCount
      savedGames {
        name
        gameId
        rating
        ratings_count
        image
        esrb
      }
    }
  }
`;

export const GET_GAME = gql`
query game($gameId: String!) {
  game(gameId: $gameId) {
    gameId
    name
    description
    image
    rating
    ratings_count
    esrb
    reviewCount
    reviews {
      _id
      createdAt
      username
      reviewBody
    }
  }
}
`;