// render saved movies list
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import MovieCard from "../components/MovieCard";

import { Button, Message, Container, Grid, GridColumn } from 'semantic-ui-react';
import { DELETE_MOVIE } from '../utils/mutations';
import { useState } from 'react';


export default function MyMovies() {
    // send mutation
    const [deleteMovie] = useMutation(DELETE_MOVIE);
    const [successMessage, setSuccessMessage] = useState('');
    const { loading, data } = useQuery(QUERY_ME);
    const savedMovies = data?.me?.savedMovies || []

    if (loading) {
        return <h2>LOADING YOUR MOVIES...</h2>;
    }

    const handleDeleteMovieList = async (movie) => {
        try {
            await deleteMovie({
                variables: {
                    _id: movie._id
                }
            });
            console.log('Your movie has been deleted!')

            setSuccessMessage((prev) => ({
                ...prev,
                [movie._id]: 'Movie successfully deleted!',
            }));

            // upon success, remove the unwanted movie from page
            

            setTimeout(() => {
                setSuccessMessage((prev) => {
                    const newMessages = { ...prev }; // previous state
                    delete newMessages[movie._id]; // remove message according to movie id
                    return newMessages; // retrieve updated state
                });
            }, 2000);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <h1 as="h3" textAlign="center" className="knewave-signup">My Collection:</h1>
            <Container>
                <Grid stackable>
                    {
                        savedMovies?.map(movie => {
                            return (
                                <GridColumn key={movie._id} mobile={16} tablet={8} computer={5}>
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
                                    <div style={{ textAlign: 'center', marginBottom: '50px' }} >
                                        <Button
                                            fluid
                                            style={{ marginTop: '20px' }}
                                            floated='center' basic inverted color='red'
                                            onClick={() => handleDeleteMovieList(movie)
                                            }>
                                            Delete
                                        </Button>
                                        {/* Display success message */}
                                        {successMessage[movie._id] && (
                                            <Message>{successMessage[movie._id]}</Message>
                                        )}
                                    </div>
                                </GridColumn>
                            )
                        })
                    }
                </Grid>
            </Container>
        </>
    );
}
