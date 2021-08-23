import gql from 'graphql-tag';


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