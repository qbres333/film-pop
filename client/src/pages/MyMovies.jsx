// render saved movies list
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import MovieCard from "../components/MovieCard";


export default function MyMovies() {
    const { loading, data } = useQuery(QUERY_ME);
    const savedMovies = data?.me?.savedMovies || []

    if (loading) {
        return <h2>LOADING YOUR MOVIES...</h2>;
    }

    return (
        <>
            <h1 as="h3" textAlign="center" className="knewave-signup">My Collection:</h1>
            <div>
                {
                    savedMovies?.map(movie => {
                        return (
                            <MovieCard
                                key={movie._id}
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
                        )
                    })
                }
            </div>
        </>
    );
}
