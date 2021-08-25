import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_GAME } from '../utils/queries';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';
import { gameArray } from '../components/Seeds';
import "./single.css";
const SingleThought = () => {
  const { gameId } = useParams();

  // const [currentGame, setCurrentGame] = useState({});
  let currentGame = gameArray[gameId];

  const { loading, data } = useQuery(GET_GAME, {
    variables: { gameId }
  });

  const game = data?.game || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  
  // fetch(`https://api.rawg.io/api/games/${gameId}?key=16667b48fd9647ccbc16de3d49ddc40e`)
  // .then(response => {
  //   return response.json()
  // })
  // .then(data => {
  //   setCurrentGame({
  //     gameId: data.id,
  //     name: data.name,
  //     description: data.description_raw,
  //     image: data.background_image,
  //     rating: data.rating,
  //     ratings_count: data.ratings_count,
  //     esrb: data.esrb_rating?.name || 'Not Specified'
  //   })
  // })

  return (
    <div>
      <Link to="/">← Back</Link>
      <div className="card">
      <h2>{currentGame.name}</h2>
      <img
        src={currentGame.image}
        alt={`a screenshot from the game ${currentGame.name}`}
        className="current-img"
      />
      <h3>Score: {currentGame.rating} from {currentGame.ratings_count} reviews</h3>
      <h3>Rating: {currentGame.esrb}</h3>
      <p>{currentGame.description}</p>
      {game.reviewCount > 0 && <ReviewList reviews={game.reviews} />}
      {Auth.loggedIn() && <ReviewForm gameId={game.gameId} />}
    </div>
    </div>
  );
};

export default SingleThought;