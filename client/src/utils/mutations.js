import gql from 'graphql-tag';

export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
    }
  }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $password: String!, $email: String!) {
  addUser(username: $username, password: $password, email: $email) {
    
    user {
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
    token
  }
}
`;

export const SAVE_GAME = gql`
    mutation saveGame($gameData: GameInput!) { 
    saveGame (gameData: $gameData)
        {
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



export const REMOVE_GAME = gql`
    mutation removeGame($gameId: ID!) {
        removeGame(gameId:$gameId) {
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