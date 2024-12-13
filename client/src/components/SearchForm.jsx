// search form with options for genre and rating
// import search options
import { genreOptions, ratingOptions } from "../utils/searchOptions";
// import hooks
import { useState } from "react";
import { useQuery } from "@apollo/client";
// import movie query
import { QUERY_MOVIES } from "../utils/queries";
// import react components
import { Form, FormGroup, Button, Container } from "semantic-ui-react";

export default function SearchForm() {

  // create state for holding search criteria
  const [searchFormData, setSearchFormData] = useState({ genre: '', rating: ''});
  
  const { loading, error, data } = useQuery(QUERY_MOVIES, {
    variables: { ...searchFormData },
  });
  const movies = data?.movies || [];

  // function to handle field change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchFormData({ ...searchFormData, [name]: value});
  }

  // function to handle movie search and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // reset form fields
    setSearchFormData({
      genre: '',
      rating: '',
    });
  }
    
    return (
      <>
        {/* search form */}
        <Container>
          <Form
            className="search-form"
            onSubmit={handleFormSubmit}
          >
            <FormGroup className="two fields">
              <Form.Field className="field genre" width={5} required>
                <select className="dropdown select-genre">
                  <option value="">Select Genre</option>
                  {genreOptions.map((option) => (
                    <option
                      key={option.key}
                      value={option.value}
                      name="genre"
                      onChange={handleChange}
                    >
                      {option.text}
                    </option>
                  ))}
                </select>
              </Form.Field>

              <Form.Field className="field rating" width={5} required>
                <select className="dropdown select-rating">
                  <option value="">Select Rating</option>
                  {ratingOptions.map((option) => (
                    <option
                      key={option.key}
                      value={option.value}
                      name="rating"
                      onChange={handleChange}
                    >
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
              disabled={!searchFormData}
            >
              Find Movies!
            </Button>
          </Form>
        </Container>
        <br />

        {/* search results */}
        <Container>
          {loading && <div>Finding Movies...</div>}
          {error && <div>Error fetching movies: {error.message}</div>}
          {movies.length > 0 && (
            <>
              {/* map through movies and display data */}
              {movies.map((movie) => (
                <div key={movie._id}>
                  <h3>{movie.title}</h3>
                </div>
              ))}
            </>
          )}
          {movies.length === 0 && !loading && <div>No movies found matching your criteria! Please try again.</div>}
        </Container>
      </>
    );
}

