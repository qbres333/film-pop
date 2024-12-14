// components: Reveal - shows movie poster and name, then reveals other movie data when hovered on (might include trailer; see Embed component)
import React from 'react';
import { Button, RevealContent, Image, Reveal, Container, Embed } from 'semantic-ui-react';
import DefaultPoster from "../images/film_slate.jpg";

import Auth from '../utils/auth';
import { ADD_MOVIE } from '../utils/mutations';
import { useMutation } from '@apollo/client';


export default function MovieCard(props) {
  // send mutation
  const [addMovie] = useMutation(ADD_MOVIE);
  const handleError = (e) => {
    e.target.src = DefaultPoster;
  }
  return (
    <>
      <Reveal animated="move" className="movie-card">
        <RevealContent visible className="movie-visible">
          <Image src={props.poster} alt={`${props.title} poster`} className="movie-poster" onError={handleError} />
        </RevealContent>
        <RevealContent hidden className="movie-hidden">
          <Container>
            <div className="movie-title-hidden">
              {props.title}
            </div>
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
            {
              Auth.loggedIn() && !props.hideButton ?
                (
                  <div>
                    {/* create function to handle add movie to list */}
                    <Button onClick={async () => {
                      const handleAddMovieToList = await addMovie({
                        variables: {
                          // grab id of movie
                          _id: props.id
                        }
                      })
                      console.log('Your movie has been added to your collection!')
                    }}>
                      Add to List
                    </Button>
                  </div>
                ) : null}
          </Container>
          <Container>
            {/** embed trailer here*/}
            {/* <div>Movie Trailer</div> */}
            {/* <Embed
                id="O6Xo21L0ybE"
                placeholder="/images/image-16by9.png"
                source="youtube"
              /> */}
          </Container>
        </RevealContent>
      </Reveal >
    </>
  );
}
