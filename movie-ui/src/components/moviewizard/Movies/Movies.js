import "./Movies.module.css";
import MovieCard from "../Movie/MovieCard";

const Movies = ({movies, error, closeModal, saveMovie, handleTableSelection}) => {

    return (
        <div>
            {error && <h1>Error</h1>}
            {movies.map(movie => <MovieCard handleTableSelection={handleTableSelection}  saveMovie={saveMovie} closeModal={closeModal} key={movie.id} movie={movie}/>)}
        </div>
    );
};

export {Movies};