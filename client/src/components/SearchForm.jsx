// search form with options for genre and imdbRating
// import search options
import { genreOptions, ratingOptions } from "../utils/searchOptions";
// import hooks
import { useState } from "react";
import { useQuery } from "@apollo/client";
// import movie query
import { QUERY_MOVIES } from "../utils/queries";
// import react components
import { Form, FormGroup, Button, Container } from "semantic-ui-react";
import MovieCard from "./MovieCard";

export default function SearchForm() {

  // create state for holding search criteria
  const [searchFormData, setSearchFormData] = useState({ genre: '', imdbRating: ''});
  // create state for when form is submitted
  const [isSubmitted, setIsSubmitted] = useState(false);
  // create state to set movie array
  const [movies, setMovies] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const { loading, error, data } = useQuery(QUERY_MOVIES, {
    variables: {
      genre: searchFormData.genre,
      imdbRating: searchFormData.imdbRating
        ? parseFloat(searchFormData.imdbRating)
        : null,
    },
    // Skip the query until the form is submitted
    skip: !isSubmitted,
    // Doesn't check cache before making a network request so results are always random
    fetchPolicy: "network-only",
  });

  // function to handle field change
  const handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setSearchFormData({ ...searchFormData, [name]: value});
  }

  // function to handle movie search and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // trigger the query upon submission
    setIsSubmitted(true);

  }

  if (data) {
    setMovies(data.moviesByGenreAndRating);
    setErrorMsg("");
    // log the results
    const results = data.moviesByGenreAndRating;
    console.log(results);
    // Reset submission state when query completes
    setIsSubmitted(false);
  }
  if (error) {
    setErrorMsg(error.message);
    setMovies([]);
    // Reset submission state if error
    setIsSubmitted(false);
    return <div>Error fetching movies: {errorMsg}</div>;
  };

    
  return (
    <>
      {/* search form */}
      <Container>
        <Form className="search-form" onSubmit={handleFormSubmit}>
          <FormGroup className="two fields">
            <Form.Field className="field genre" width={5} required>
              <select
                className="dropdown select-genre"
                name="genre"
                value={searchFormData.genre}
                onChange={handleChange}
              >
                <option value="">Select Genre</option>
                {genreOptions.map((option) => (
                  <option key={option.key} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </Form.Field>

            <Form.Field className="field imdbRating" width={5} required>
              <select
                className="dropdown select-imdbRating"
                name="imdbRating"
                value={searchFormData.imdbRating}
                onChange={handleChange}
              >
                <option value="">Select Rating</option>
                {ratingOptions.map((option) => (
                  <option key={option.key} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </Form.Field>
          </FormGroup>
          <br />

          <Button
            type="submit"
            size="huge"
            className="btn-find-movies"
            disabled={!searchFormData.genre || !searchFormData.imdbRating}
          >
            Find Movies!
          </Button>
        </Form>
      </Container>
      <br />

      {/* search results */}
      <Container>
        {movies.length > 0 && (
          <div className="movie-card-container">
            {/* map through movies and display data */}
            {movies.map((movie) => (
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
        {movies.length === 0 && isSubmitted && !loading && (
          <div>No movies found matching your criteria!</div>
        )}
      </Container>
    </>
  );
}

