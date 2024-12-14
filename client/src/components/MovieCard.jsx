// components: Reveal - shows movie poster and name, then reveals other movie data when hovered on (might include trailer; see Embed component)

import { RevealContent, Image, Reveal, Container, Embed } from 'semantic-ui-react'
import DefaultPoster from "../images/film_slate.jpg";

export default function MovieCard(props) {
    const handleError = (e) => {
        e.target.src = DefaultPoster;
    }
    return (
      <>
        <Reveal animated="move" className="movie-card">
          <RevealContent visible className="movie-visible">
            <Image src={props.poster} alt={`${props.title} poster`} className="movie-poster" onError={handleError}/>
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
              {/* add icon with popup to save movie to watch list */}
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
        </Reveal>
      </>
    );
}
