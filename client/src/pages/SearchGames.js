import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { SAVE_GAME } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';
import { saveGameIds, getSavedGameIds } from '../utils/localStorage';

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

        if (!searchInput) {
            return false;
        }

        try {
            //this is where the api https link will go
            const response = await fetch(`https://api.twitch.tv/helix/analytics/games=${searchInput}`);

            if (!response.ok){
                throw new Error('something went wrong!');
            }

            const { items } = await response.json();

            const gameData = items.map((game) => ({
                gameId: game.id,
                publisher: game.gameInfo.publisher || ['No publisher to display'],
                title: game.gameInfo.title,
                description: game.gameInfo.description,
                image: game.gameInfo.imageLinks?.thumbnail || '',
            }));

            setSearchedGames(gameData);
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
            const { data } = await saveGame({varibales: {gameData: {...gameToSave}}});

            //if book successfully saves to user's account, save book id to state
            setSavedGameIds([...savedGameIds, gameToSave.gameId]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
          <Jumbotron fluid className='text-light bg-dark'>
            <Container>
              <h1>Search for Books!</h1>
              <Form onSubmit={handleFormSubmit}>
                <Form.Row>
                  <Col xs={12} md={8}>
                    <Form.Control
                      name='searchInput'
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      type='text'
                      size='lg'
                      placeholder='Search for a book'
                    />
                  </Col>
                  <Col xs={12} md={4}>
                    <Button type='submit' variant='success' size='lg'>
                      Submit Search
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
                : 'Search for a book to begin'}
            </h2>
            <CardColumns>
              {searchedGames.map((game) => {
                return (
                  <Card key={game.gameId} border='dark'>
                    {game.image ? (
                      <Card.Img src={game.image} alt={`The cover for ${game.title}`} variant='top' />
                    ) : null}
                    <Card.Body>
                      <Card.Title>{game.title}</Card.Title>
                      <p className='small'>Publisher: {game.publisher}</p>
                      <Card.Text>{game.description}</Card.Text>
                      {Auth.loggedIn() && (
                        <Button
                          disabled={savedGameIds?.some((savedGameId) => savedGameId === game.gameId)}
                          className='btn-block btn-info'
                          onClick={() => handleSaveGame(game.gameId)}>
                          {savedGameIds?.some((savedGameId) => savedGameId === game.gameId)
                            ? 'This book has already been saved!'
                            : 'Save this Book!'}
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