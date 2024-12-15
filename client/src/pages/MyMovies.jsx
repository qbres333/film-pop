// render saved movies list
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import MovieCard from "../components/MovieCard";

import { Button, Container } from "semantic-ui-react";
import { DELETE_MOVIE } from "../utils/mutations";

export default function MyMovies() {
  // send mutation
  const [deleteMovieFromList] = useMutation(DELETE_MOVIE);
  const { loading, data, refetch } = useQuery(QUERY_ME);
  // set movies to data in savedMovies array
  let movies = data?.me?.savedMovies;

  if (loading) {
    return <h2>LOADING YOUR MOVIES...</h2>;
  }

  const handleDeleteMovie = async (movie) => {
    try {
      await deleteMovieFromList({
        variables: {
          _id: movie._id,
        },
      });

      console.log("Your movie has been deleted!");

      // movie deleted on server, but needs to be deleted in UI; query the movie list again (per documentation)
      await refetch();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1 as="h3" textAlign="center" className="knewave-signup">
        My Collection:
      </h1>
      <Container>
        {movies?.map((movie) => (
          <div className="saved-movie-container" key={movie._id}>
            <div className="saved-movie-card">
              <MovieCard
                id={movie._id}
                poster={movie.poster}
                title={movie.title}
                year={movie.year}
                genre={movie.genre.join(", ")}
                runtime={movie.runtime}
                plot={movie.plot}
                imdbRating={movie.imdbRating}
                hideButton={true} // hide the "add to list button"
              />
              <Button
                fluid
                style={{ marginTop: "13px" }}
                basic
                inverted
                color="red"
                onClick={() => handleDeleteMovie(movie)}
              >
                Delete
              </Button>

            </div>
          </div>
        ))}
      </Container>
    </>
  );
}
