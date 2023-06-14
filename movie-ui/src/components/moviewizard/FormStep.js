import React, {useContext, useEffect, useState} from 'react'
import {Form, Input, Segment, TextArea} from 'semantic-ui-react'
import AuthContext from "../../context/AuthContext";
import {movieApi} from "../../services/MovieApi";

function FormStep({
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
                      descriptionError,
                      ratingError,
                      titleError,
                      posterError,
                      taglineError,
                      runtimeError,
                      statusError,
                      popularityError,
                      overviewError,
                      handleChange,
                      setStateForStat
                  }) {

    const Auth = useContext(AuthContext)
    const user = Auth.getUser();

    const [genresApi, setGenres] = useState([])
    const [productCompany, setProductCompany] = useState([])

    useEffect(() => {

        const fetchStat = async () => {
            try {
                let response = await movieApi.getProductCompanies(user)
                setProductCompany(response.data)
                response = await movieApi.getGenres(user)
                setGenres(response.data)
                setStateForStat(genresApi, productCompany);
            } catch (error) {
                console.log(error);
            }
        };

        fetchStat();
    }, [])

    return (
        <Segment>
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input
                        required
                        control={Input}
                        label='Rating'
                        placeholder='Provide rating from 0 to 10'
                        onChange={handleChange}
                        name="rating"
                        error={ratingError}
                        value={rating}
                    />


                    <Form.Input
                        required
                        control={Input}
                        label='Title'
                        placeholder='Provide title'
                        onChange={handleChange}
                        name="title"
                        error={titleError}
                        value={title}
                    />

                    <Form.Input
                        required
                        control={Input}
                        label='Poster'
                        placeholder='Provide poster url'
                        onChange={handleChange}
                        name="poster"
                        error={posterError}
                        value={poster}
                    />
                </Form.Group>

                <Form.Input required
                            control={TextArea}
                            label='Description'
                            placeholder='Provide description'
                            onChange={handleChange}
                            name="description"
                            error={descriptionError}
                            value={description}
                />

                <Form.Group widths='equal'>
                    <Form.Input
                        required
                        control={Input}
                        label='Runtime'
                        placeholder='Provide runtime'
                        onChange={handleChange}
                        name="runtime"
                        error={runtimeError}
                        value={runtime}
                    />


                    <Form.Input
                        required
                        control={Input}
                        label='Status'
                        placeholder='Provide title'
                        onChange={handleChange}
                        name="status"
                        error={statusError}
                        value={status}
                    />

                    <Form.Input
                        required
                        control={Input}
                        label='Tagline'
                        placeholder='Provide tagline'
                        onChange={handleChange}
                        name="tagline"
                        error={taglineError}
                        value={tagline}
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
                        error={popularityError}
                        value={popularity}
                    />


                    <Form.Input
                        required
                        control={Input}
                        label='Overview'
                        placeholder='Provide overview'
                        onChange={handleChange}
                        name="overview"
                        error={overviewError}
                        value={overview}
                    />

                    <Form.Input
                        required
                        control={Input}
                        label='Release Date'
                        placeholder='format year-month-day'
                        onChange={handleChange}
                        name="releaseDate"
                        value={releaseDate}
                    />
                </Form.Group>

                <Form.Group inline>
                    <label>Select genre</label>
                    {genresApi.length > 0 && genresApi.map(genre => (
                        <Form.Field name="genre" value={genre.id} label={genre.name} onChange={handleChange}
                                    control="input" type="checkbox" checked={genres.includes(genre.id)} />
                    ))}
                </Form.Group>

                <Form.Group inline>
                    <label>Select company</label>
                    {productCompany.length > 0 && productCompany.map(productComp => (
                        <Form.Field name="productCompany" value={productComp.id}
                                    label={productComp.name} onChange={handleChange} control="input"
                                    type="checkbox" checked={productCompanies.includes(productComp.id)}/>
                    ))}
                </Form.Group>
            </Form>
        </Segment>
    )
}

export default FormStep