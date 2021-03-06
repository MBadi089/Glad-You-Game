import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { removeGameId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_GAME } from '../utils/mutations';


const SavedGames = () => {

    const { loading, data } = useQuery(GET_ME);
    const [removeGame] = useMutation(REMOVE_GAME);
    const userData = data?.me || [];

    //create function that accepts the game's mongo_id value as param and deletes the game from the database
    const handleDeleteGame = async (gameId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            await removeGame({
                variables: { gameId: gameId }
            })

            //up success, remove game's id from localStorage
            removeGameId(gameId);
        } catch (e) {
            console.error(e);
        }
     };

     //if data isn't here yet, say so
     if(loading) {
         return <h2>LOADING...</h2>
     }

     return (
        <>
          <Jumbotron fluid className='text-light bg-dark'>
            <Container>
              <h1>Viewing Your Saved Games!</h1>
            </Container>
          </Jumbotron>
          <Container>
            <h2>
              {userData.savedGames.length
                ? `Viewing ${userData.savedGames.length} saved ${userData.savedGames.length === 1 ? 'game' : 'games'}:`
                : 'You have no saved games!'}
            </h2>
            <CardColumns>
              {userData.savedGames.map((game) => {
                return (
                  <Card key={game.gameId} border='dark'>
                    {game.image ? <Card.Img src={game.image} alt={`The cover for ${game.title}`} variant='top' /> : null}
                    <Card.Body>
                      <Card.Title>{game.title}</Card.Title>
                      <p className='small'>Publisher: {game.publisher}</p>
                      <Card.Text>{game.description}</Card.Text>
                      <Button className='btn-block btn-danger' onClick={() => handleDeleteGame(game.gameId)}>
                        Delete this Game!
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}
            </CardColumns>
          </Container>
        </>
      ); 
};

export default SavedGames;
