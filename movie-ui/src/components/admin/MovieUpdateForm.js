import React, {useContext, useEffect, useState} from 'react'
import {Button, Form, Input, TextArea} from 'semantic-ui-react'
import AuthContext from "../../context/AuthContext";
import {movieApi} from "../../services/MovieApi";
import {handleLogError} from "../helpers/Helpers";
import {useNavigate} from "react-router-dom";

function MovieUpdateForm({close, movieDetailsId}) {

    const [allGenres, setGenres] = useState({});
    const [allProductCompanies, setProductCompanies] = useState({});
    const navigate = useNavigate()
    const [form, setForm] = useState({
        description: "",
        rating: 0,
        title: "",
        poster: "",
        tagline: "",
        runtime: 0,
        status: "",
        releaseDate: "",
        popularity: 0,
        overview: "",
        genres: [],
        productCompanies: [],
        movieId: 0,
        movieDetailsId: 0
    });

    const Auth = useContext(AuthContext)
    const user = Auth.getUser();


    useEffect(() => {

        handleGetGenres();
        handleGetProductCompanies();
        handleGetMovieDetails();
    }, [])

    const handleGetGenres = () => {
        movieApi.getGenres(user)
            .then(response => {
                setGenres(response.data)
            })
            .catch(error => {
                console.log(error)
                handleLogError(error)
            })
    }

    const handleGetMovieDetails = () => {
        movieApi.getMovieDetails(user, movieDetailsId)
            .then(response => {
                const {movie} = response.data;
                console.log(response.data)
                setForm({...form, ...response.data, ...movie, movieId: movie.id, movieDetailsId: response.data.id})
            })
            .catch(error => {
                handleLogError(error)
            })
    }

    const handleGetProductCompanies = () => {
        movieApi.getProductCompanies(user)
            .then(response => {
                setProductCompanies(response.data)
            })
            .catch(error => {
                handleLogError(error)
            })
    }


    const handleSubmit = async () => {
        try {
            const {
                description,
                rating,
                title,
                poster,
                tagline,
                runtime,
                status,
                releaseDate,
                popularity,
                overview,
                genres,
                productCompanies,
                movieId,
                movieDetailsId
            } = form

            const movie = {
                description,
                rating,
                title,
                poster,
                tagline,
                runtime,
                status,
                releaseDate,
                popularity,
                overview,
                genres: genres.map(genre => genre.id),
                productCompanies: productCompanies.map(productComp => productComp.id),
                movieId,
                movieDetailsId
            }
            console.log(movie)
            await movieApi.updateMovie(user, movie);
            close()
            navigate("/home")

        } catch (error) {
            handleLogError(error)
        }
    }

    const handleChange = ({target}) => {
        if (target.name === "genre") {
            if (target.checked) {
                setForm((prevState) => {
                    return {...form, genres: [...prevState.genres, +target.value]}
                })
            } else {
                setForm((prevState) => {
                    return {...form, genres: [...prevState.genres.filter(genre => genre !== +target.value)]}
                })
            }
            return
        }

        if (target.name === "productCompany") {
            if (target.checked) {
                setForm((prevState) => {
                    return {...form, productCompanies: [...prevState.productCompanies, +target.value]}
                })
            } else {
                setForm((prevState) => {
                    return {
                        ...form, productCompanies: [...prevState.productCompanies
                            .filter(productCompany => productCompany !== +target.value)]
                    }
                })
            }
            return;
        }

        setForm({...form, [target.name]: target.value})
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>

                <Form.Group widths='equal'>
                    <Form.Input
                        required
                        control={Input}
                        label='Rating'
                        placeholder='Provide rating from 0 to 10'
                        onChange={handleChange}
                        name="rating"
                        value={form.rating}
                    />


                    <Form.Input
                        required
                        control={Input}
                        label='Title'
                        placeholder='Provide title'
                        onChange={handleChange}
                        name="title"
                        value={form.title}
                    />

                    <Form.Input
                        required
                        control={Input}
                        label='Poster'
                        placeholder='Provide poster url'
                        onChange={handleChange}
                        name="poster"
                        value={form.poster}
                    />
                </Form.Group>

                <Form.Input required
                            control={TextArea}
                            label='Description'
                            placeholder='Provide description'
                            onChange={handleChange}
                            name="description"
                            value={form.description}
                />

                <Form.Group widths='equal'>
                    <Form.Input
                        required
                        control={Input}
                        label='Runtime'
                        placeholder='Provide runtime'
                        onChange={handleChange}
                        name="runtime"
                        value={form.runtime}
                    />


                    <Form.Input
                        required
                        control={Input}
                        label='Status'
                        placeholder='Provide title'
                        onChange={handleChange}
                        name="status"
                        value={form.status}
                    />

                    <Form.Input
                        required
                        control={Input}
                        label='Tagline'
                        placeholder='Provide tagline'
                        onChange={handleChange}
                        name="tagline"
                        value={form.tagline}
                    />
                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Input
                        required
                        control={Input}
                        label='Popularity'
                        placeholder='Provide popularity'
                        onChange={handleChange}
                        name="popularity"
                        value={form.popularity}
                    />


                    <Form.Input
                        required
                        control={Input}
                        label='Overview'
                        placeholder='Provide overview'
                        onChange={handleChange}
                        name="overview"
                        value={form.overview}
                    />

                    <Form.Input
                        required
                        control={Input}
                        label='Release Date'
                        placeholder='format year-month-day'
                        onChange={handleChange}
                        name="releaseDate"
                        value={form.releaseDate}
                    />
                </Form.Group>

                <Form.Group inline>
                    <label>Select genre</label>
                    {allGenres.length > 0 && allGenres.map(genre => (
                        <Form.Field name="genre" value={genre.id} label={genre.name} onChange={handleChange}
                                    control="input" type="checkbox"
                                    checked={form.genres.filter(g => g.id === genre.id).length > 0}/>
                    ))}
                </Form.Group>

                <Form.Group inline>
                    <label>Select company</label>
                    {allProductCompanies.length > 0 && allProductCompanies.map(productComp => (
                        <Form.Field name="productCompany" value={productComp.id}
                                    label={productComp.name} onChange={handleChange} control="input"
                                    type="checkbox"
                                    checked={form.productCompanies.filter(p => p.id === productComp.id).length > 0}/>
                    ))}
                </Form.Group>

                <Form.Field control={Button}>Submit</Form.Field>
            </Form>
        </div>

    )
}

export default MovieUpdateForm