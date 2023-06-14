import css from "./GenreBadge.module.css"
import {useEffect, useState} from "react";
import {omdbApi} from "../../../services/OmdbApi"

const GenreBadge = ({receivedGenres}) => {
    let [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await omdbApi.getGenres();
                setGenres(response.data.genres);
            } catch (error) {
                console.log(error);
            }
        };

        fetchGenres();
    }, [])


    const genresFiltered = genres?.filter(genre => receivedGenres.includes(genre.id));

    return (
        <div>
            {
                genresFiltered.map(genre => <p className={css.genre} key={genre.id}>{genre.name}</p>)
            }
        </div>
    );
};

export {GenreBadge};