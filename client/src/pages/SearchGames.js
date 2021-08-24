import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { SAVE_GAME } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import { saveGameIds, getSavedGameIds } from '../utils/localStorage';

const APIKey = 'af988673270a4b798f8ffffb132779ce'; //rawg api key
const urlGetGameList = 'https://api.rawg.io/api/games?key=';

//adding a comment to see if everyone is up to date part 2

const SearchGames = () => {
    const [saveGame] = useMutation(SAVE_GAME);

    //create state for holding returned game api data
    const [searchedGames, setSearchedGames] = useState([]);

    //create state for holding our search field data
    const [searchInput, setSearchInput] = useState('');

    //create state to hold saved gameId values
    const [savedGameIds, setSavedGameIds] = useState(getSavedGameIds());

    //set up useEffect hook to save `savedGameIds` list to localStorage on component unmount
    useEffect(() => {
        return () => saveGameIds(savedGameIds);
    });

    //create method to search for games and set state on form submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // if (!searchInput) {
        //     return false;
        // }

        try {
            //this is where the api https link will go
            const response = await fetch(`${urlGetGameList}${APIKey}&search=${searchInput}`); 
            console.log(response);

            if (!response.ok){
                throw new Error('something went wrong!');
            }

            const { results } = await response.json();
            console.log(results)

            const gameResults = results.map(game => ({
                gameId: game.id,
                name: game.name,
                image: game.background_image,
                rating: game.rating,
                ratings_count: game.ratings_count,
                esrb: game.esrb_rating?.name || 'Not Specified'
            }));

            setSearchedGames(gameResults);
            console.log(searchedGames)
            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

    //create function to handle saving a game to our database
    const handleSaveGame = async (gameId) => {

        //find the game in `searchedGames` state by the matching id
        const gameToSave = searchedGames.find((game) => game.gameId === gameId);

        //get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            await saveGame({variables: {gameData: gameToSave}});

            //if game successfully saves to user's account, save game id to state
            setSavedGameIds([...savedGameIds, gameToSave.gameId]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
          <Jumbotron fluid className='text-light bg-dark'>
            <Container>
              <h1>Search 500,00+ Games To View Ratings and Save Them To Your Collection!</h1>
              <Form onSubmit={handleFormSubmit}>
                <Form.Row>
                  <Col xs={12} md={8}>
                    <Form.Control
                      name='searchInput'
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      type='text'
                      size='lg'
                      placeholder='Search For A Game Here'
                    />
                  </Col>
                  <Col xs={12} md={4}>
                    <Button type='submit' variant='success' size='lg'>
                      Submit
                    </Button>
                  </Col>
                </Form.Row>
              </Form>
            </Container>
          </Jumbotron>
    
          <Container>
            <h2>
              {searchedGames.length
                ? `Viewing ${searchedGames.length} results:`
                : ''}
            </h2>
            <CardColumns>
              {searchedGames.map((game) => {
                return (
                  <Card key={game.gameId} border='dark'>
                    {game.image ? (
                      <Card.Img src={game.image} alt={`The cover for ${game.title}`} variant='top' />
                    ) : null}
                    <Card.Body>
                      <Card.Title>{game.name}</Card.Title>
                      <Card.Text>Rating: {game.esrb}</Card.Text>
                      <Card.Text>Average Score: {game.rating} <span>From {game.ratings_count} ratings</span></Card.Text>
                      {/* <Card.Text>{game.description}</Card.Text> */}
                      <Link to={`/${game.gameId}`}>See More</Link>
                      {Auth.loggedIn() && (
                        <Button
                          disabled={savedGameIds?.some((savedGameId) => savedGameId === game.gameId)}
                          className='btn-block btn-info'
                          onClick={() => handleSaveGame(game.gameId)}>
                          {savedGameIds?.some((savedGameId) => savedGameId === game.gameId)
                            ? 'Saved!'
                            : 'Save to Collection'}
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                );
              })}
            </CardColumns>
          </Container>
        </>
      );
};

export default SearchGames;