import {
    Pagination,
    PaginationItem,
    Stack
} from "@mui/material";
import {Link as NavLink, useNavigate, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {Movies} from "../Movies/Movies";
import {omdbApi} from '../../../services/OmdbApi'

const MoviesPage = ({searchText, closeModal, saveMovie, handleTableSelection = handleTableSelection}) => {

    const location = useLocation();
    const navigation = useNavigate();

    const [page, setPage] = useState(
        parseInt(location.search?.split("=")[1] || "1"));
    const [pageQty, setPageQty] = useState(1);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        setPageQty(movies.total_pages || 1);

        if (movies.total_pages && movies.total_pages < page) {
            setPage(1);
            navigation("/", {replace: true})
        }

        const fetchMovies = async () => {
            try {
                const response = await omdbApi.getMovies(searchText, page);
                setMovies(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMovies();

    }, [page, location,
        navigation, movies.total_pages]);

    return (
        <>
            <Stack spacing={1}>
                {!!pageQty && (
                    <Pagination
                        count={pageQty}
                        page={page}
                        onChange={(_, num) => setPage(num)}
                        showFirstButton
                        showLastButton
                        sx={{marginY: 2, marginX: "auto"}}
                        renderItem={(item) => (
                            <PaginationItem
                                component={NavLink}
                                to={`?page=${item.page}`}
                                {...item}
                            />
                        )}
                    />
                )}

                {movies.results && <Movies handleTableSelection={handleTableSelection} saveMovie={saveMovie} closeModal={closeModal} movies={movies.results}/>}
            </Stack>
        </>
    );
};

export {MoviesPage};