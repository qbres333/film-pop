import React from 'react';
import { Message, Button, RevealContent, Image, Reveal, Container } from 'semantic-ui-react';
import DefaultPoster from "../images/film_slate.jpg";

import Auth from '../utils/auth';
import { ADD_MOVIE } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import { useState } from 'react';


export default function MovieCard(props) {
  // send mutation
  const [addMovie] = useMutation(ADD_MOVIE);
  // State for success message
  const [successMessage, setSuccessMessage] = useState('');
  // set state for movie poster in case the poster link is dead
  const [isDefaultPoster, setIsDefaultPoster] = useState(false);

  const handleError = (e) => {
    e.target.src = DefaultPoster;
    // set state to true for dead link
    setIsDefaultPoster(true);
  }
  return (
    <>
      <Reveal animated="move" className="movie-card">
        <RevealContent visible className="movie-visible">
          <Image
            src={props.poster}
            alt={`${props.title} poster`}
            className="movie-poster"
            onError={handleError}
          />
          {isDefaultPoster && <div className='title-overlay'>{props.title}</div>}
        </RevealContent>
        <RevealContent hidden className="movie-hidden">
          <Container className="hidden-movie-content">
            <div className="movie-title-hidden">{props.title}</div>
            <div className="movie-data">
              <b>Year Released:</b> {props.year}
            </div>
            <div className="movie-data">
              <b>Genre(s):</b> {props.genre}
            </div>
            <div className="movie-data">
              <b>Runtime:</b> {props.runtime} Minutes
            </div>
            <div className="movie-data">
              <b>Plot:</b> {props.plot}
            </div>
            <div className="movie-data">
              <b>IMDb Rating:</b> {props.imdbRating}
            </div>
            {/* if the user is logged in, show a button for user to add movie to their watch list */}
            {Auth.loggedIn() && !props.hideButton ? (
              <div className="btn-add-movie">
                {/* create function to handle add movie to list */}
                <Button
                  fluid
                  onClick={async () => {
                    const handleAddMovieToList = await addMovie({
                      variables: {
                        // grab id of movie
                        _id: props.id,
                      },
                    });
                    console.log(
                      "Your movie has been added to your collection!"
                    );
                    setSuccessMessage(
                      "Movie successfully added to your collection!"
                    );

                    // Hide the message after 4 seconds
                    setTimeout(() => setSuccessMessage(""), 4000);
                  }}
                >
                  Add to List
                </Button>
                {/* Display success message */}
                {successMessage && <Message>{successMessage}</Message>}
              </div>
            ) : null}
          </Container>
        </RevealContent>
      </Reveal>
    </>
  );
}
