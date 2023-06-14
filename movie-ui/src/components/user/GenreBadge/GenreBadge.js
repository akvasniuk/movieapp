import css from "./GenreBadge.module.css";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../../context/AuthContext";
import {movieApi} from "../../../services/MovieApi"


const GenreBadge = ({receivedGenres, isIds}) => {
    const Auth = useContext(AuthContext)
    const user = Auth.getUser();

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const getGenres = async () => {
            if (isIds) {
                const {data: genresApi} = await movieApi.getGenres(user);
                setGenres(genresApi.filter(genre => receivedGenres.includes(genre.id)))
            }
        }

        getGenres()
    }, [])

    return (
        <div>
            {
                isIds
                    ? genres && genres.map(genre => <p className={css.genre} key={genre.id}>{genre.name}</p>)
                    : receivedGenres.map(genre => <p className={css.genre} key={genre.id}>{genre.name}</p>)
            }
        </div>
    );
};

export {GenreBadge};