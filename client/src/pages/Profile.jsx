//map through User's savedMovie array

import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { Container } from "semantic-ui-react";
import MovieCard from "./MovieCard";

export default function Profile() {
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || [];

  if (loading) {
    return <div>Loading saved movies...</div>;
  }

  return (
    <>
      <Container>
        <h3>Saved Movies</h3>
        {user.savedMovies.length > 0 && (
          <div className="movie-card-container">
            {user.savedMovies.map((movie) => (
              <MovieCard
                key={movie._id}
                poster={movie.poster}
                title={movie.title}
                year={movie.year}
                genre={movie.genre.join(", ")}
                runtime={movie.runtime}
                plot={movie.plot}
                imdbRating={movie.imdbRating}
              />
            ))}
          </div>
        )}
        {user.savedMovies.length === 0 && <div>No movies saved yet</div>}
      </Container>
    </>
  );
}
