import css from "./Movie.module.css";
import {PosterPreview} from "../PosterPreview/PosterPreview";
import {GenreBadge} from "../GenreBadge/GenreBadge";
import {omdbApi} from "../../../services/OmdbApi"
import {movieApi} from "../../../services/MovieApi"
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../../context/AuthContext";


const MovieCard = ({movie, closeModal, saveMovie, handleTableSelection}) => {
    const {
        title, vote_average, release_date, backdrop_path, id,
        popularity, overview, original_language, genre_ids
    } = movie;

    const Auth = useContext(AuthContext)
    const user = Auth.getUser();

    const [movieService, setMovie] = useState({});

    useEffect(() => {

        const fetchMovie = async () => {
            try {
                let response = await omdbApi.getMovieById(id);
                setMovie(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMovie();
    }, [])


    const processMovie = async () => {
        closeModal()

        const poster = `https://image.tmdb.org/t/p/w300${backdrop_path}`

        movie = {
            description: overview || "no overview",
            rating: parseInt(vote_average) || 1,
            title,
            poster,
            tagline: movieService.tagline || "No tagline",
            runtime: movieService.runtime || 1,
            status: movieService.status || "No status",
            releaseDate: movieService.release_date,
            popularity: parseInt(movieService.popularity) || 1,
            overview,
            genres: [],
            productCompanies: []
        }
        console.log(movieService)
        const {data: genres} = await movieApi.getGenres(user);
        const {data: productCompany} = await movieApi.getProductCompanies(user);

        const selectedGenres = movieService.genres.map(genre => genre.name);
        movie.genres = genres.filter(genre => selectedGenres.includes(genre.name))
            .map(genre => genre.id);

        const companies = movieService.production_companies.map(company => company.name);
        movie.productCompanies = productCompany.filter(company => companies.includes(company.name))
            .map(company => company.id)

        saveMovie(movie)
        handleTableSelection(movie)
    }

    return (
        <div>
            <div className={css.main_card}>
                <div className={css.card_left}>
                    <div className={css.card_details}>
                        <h1>{title}</h1>
                        <div className={css.card_cat}>
                            <p className={css.PG}>{vote_average}</p>
                            <p className={css.year}>{release_date}</p>
                            {genre_ids && <GenreBadge receivedGenres={genre_ids}/>}
                            <p className={css.time}>{popularity}</p>
                        </div>
                        <p className={css.disc}>{overview}</p>
                        <span>Read More</span>
                        <div className={css.socialBtn}>
                            <button className={css.button}>
                                <i>
                                    SEE TRAILER
                                </i>
                            </button>
                            <button className={css.button}>
                                <i>
                                    DOWNLOAD
                                </i>
                            </button>
                            <button className={css.button}>
                                <i>
                                    {original_language.toUpperCase()}
                                </i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={css.card_right} onClick={() => processMovie()}>
                    <PosterPreview backdrop_path={backdrop_path} title={title} id={id}/>
                </div>
            </div>
        </div>
    );
}

export default MovieCard