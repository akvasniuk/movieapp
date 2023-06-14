import React, {useContext, useEffect, useState} from 'react'
import {Button, Form, Icon, Input, Modal, TextArea} from 'semantic-ui-react'
import AuthContext from "../../context/AuthContext";
import {movieApi} from "../../services/MovieApi";
import {handleLogError} from "../helpers/Helpers";

function MovieForm() {
    const [modalIsOpen, setModal] = useState(false);
    const [genres, setGenres] = useState({});
    const [productCompanies, setProductCompanies] = useState({});
    const [form, setForm] = useState({

        genres: [],
        productCompanies: []
    });

    const Auth = useContext(AuthContext)
    const user = Auth.getUser();

    useEffect(() => {
        handleGetGenres();
        handleGetProductCompanies();
    }, [])

    const handleGetGenres = () => {
        movieApi.getGenres(user)
            .then(response => {
                setGenres(response.data)
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


    const toggleModalDisplay = () => {
        setModal(!modalIsOpen);
    }

    const handleSubmit = () => {
        movieApi.addMovie(user, {
            ...form,
            "runtime": +form.runtime, "rating": +form.rating,
            "popularity": +form.popularity
        })
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
                setModal(false);
                window.location.reload()
            })
    }

    const handleChange = ({target}) => {
        if (target.name === "genre") {
            if (target.checked) {
                form.genres.push(target.value)
            } else {
                const genreId = genres.findIndex(genre => genre === target.value);
                form.genres.splice(genreId, 1)
            }
            return
        }

        if (target.name === "productCompany") {
            if (target.checked) {
                form.productCompanies.push(target.value)
            } else {
                const productCompanyId = productCompanies.findIndex(productCompany => productCompany === target.value);
                form.productCompanies.splice(productCompanyId, 1);
            }
            return;
        }

        setForm({...form, [target.name]: target.value})
    }

    return (
        <div>
            <Modal
                open={modalIsOpen}
                onClose={() => toggleModalDisplay}
            >
                <Modal.Header>
                    Movie Form
                    <Button onClick={() => setModal(false)}
                    >Close</Button>
                </Modal.Header>
                <Modal.Content>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group widths='equal'>
                            <Form.Input
                                required
                                control={Input}
                                label='Rating'
                                placeholder='Provide rating from 0 to 10'
                                onChange={handleChange}
                                name="rating"
                            />


                            <Form.Input
                                required
                                control={Input}
                                label='Title'
                                placeholder='Provide title'
                                onChange={handleChange}
                                name="title"
                            />

                            <Form.Input
                                required
                                control={Input}
                                label='Poster'
                                placeholder='Provide poster url'
                                onChange={handleChange}
                                name="poster"
                            />
                        </Form.Group>

                        <Form.Input required
                                    control={TextArea}
                                    label='Description'
                                    placeholder='Provide description'
                                    onChange={handleChange}
                                    name="description"
                        />

                        <Form.Group widths='equal'>
                            <Form.Input
                                required
                                control={Input}
                                label='Runtime'
                                placeholder='Provide runtime'
                                onChange={handleChange}
                                name="runtime"
                            />


                            <Form.Input
                                required
                                control={Input}
                                label='Status'
                                placeholder='Provide title'
                                onChange={handleChange}
                                name="status"
                            />

                            <Form.Input
                                required
                                control={Input}
                                label='Tagline'
                                placeholder='Provide tagline'
                                onChange={handleChange}
                                name="tagline"
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
                            />


                            <Form.Input
                                required
                                control={Input}
                                label='Overview'
                                placeholder='Provide overview'
                                onChange={handleChange}
                                name="overview"
                            />

                            <Form.Input
                                required
                                control={Input}
                                label='Release Date'
                                placeholder='format year-month-day'
                                onChange={handleChange}
                                name="releaseDate"
                            />
                        </Form.Group>

                        <Form.Group inline>
                            <label>Select genre</label>
                            {genres.length > 0 && genres.map(genre => (
                                <Form.Field name="genre" value={genre.id} label={genre.name} onChange={handleChange}
                                            control="input" type="checkbox"/>
                            ))}
                        </Form.Group>

                        <Form.Group inline>
                            <label>Select company</label>
                            {productCompanies.length > 0 && productCompanies.map(productCompany => (
                                <Form.Field name="productCompany" value={productCompany.id}
                                            label={productCompany.name} onChange={handleChange} control="input"
                                            type="checkbox"/>
                            ))}
                        </Form.Group>

                        <Form.Field control={Button}>Submit</Form.Field>
                    </Form>
                </Modal.Content>
            </Modal>

            <Button icon labelPosition='right' onClick={toggleModalDisplay}>
                Create Movie<Icon name='add'/>
            </Button>
        </div>

    )
}

export default MovieForm