import React, {Fragment, useState} from 'react'
import {Button, Form, Grid, Image, Input, Modal, Table} from 'semantic-ui-react'
import MovieForm from './MovieForm'
import MovieUpdateForm from "./MovieUpdateForm";
import {connect} from "react-redux";
import {saveMovieDetailsId} from "../../store/actions/movieActions";
import ProductCompanyForm from "./ProductCompanyForm";
import GenreForm from "./GenreForm";

function MovieTable({
                        movies,
                        movieImdb,
                        movieTitle,
                        moviePoster,
                        movieTextSearch,
                        handleInputChange,
                        handleAddMovie,
                        handleDeleteMovie,
                        handleSearchMovie,
                        movieDetailsId,
                        saveMovieDetailsId
                    }) {

    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = (movieId) => {
        saveMovieDetailsId(movieId)
        setIsOpen(!isOpen)
    }

    let movieList
    if (movies.length === 0) {
        movieList = (
            <Table.Row key='no-movie'>
                <Table.Cell collapsing textAlign='center' colSpan='5'>No movie</Table.Cell>
            </Table.Row>
        )
    } else {
        movieList = movies.map(movie => {
            return (
                <Table.Row key={movie.imdb}>
                    <Table.Cell collapsing>
                        <Button
                            circular
                            color='red'
                            size='small'
                            icon='trash'
                            onClick={() => handleDeleteMovie(movie.imdb)}
                        />
                        <Button
                            circular
                            color='orange'
                            size='small'
                            icon='edit'
                            onClick={() => toggleModal(movie.movieDetailsId)}
                        />
                        <Modal
                            open={isOpen}
                            onClose={() => setIsOpen(false)}
                        >
                            <Modal.Header>
                                Movie Form
                                <Button onClick={() => setIsOpen(false)}
                                >Close</Button>
                            </Modal.Header>
                            <Modal.Content>
                                <MovieUpdateForm close={toggleModal} movieDetailsId={movieDetailsId}/>
                            </Modal.Content>
                        </Modal>
                    </Table.Cell>
                    <a href={`/movie/${movie.movieDetailsId}`}>
                        <Table.Cell>
                            {movie.poster ?
                                <Image src={movie.poster} size="small" bordered rounded/> :
                                <Image
                                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/ProhibitionSign2.svg/1200px-ProhibitionSign2.svg.png'
                                    size='tiny' bordered rounded/>
                            }
                        </Table.Cell>
                    </a>
                    <Table.Cell>{movie.rating}</Table.Cell>
                    <Table.Cell>{movie.title}</Table.Cell>
                    <Table.Cell>{movie.createdAt}</Table.Cell>
                </Table.Row>
            )
        })
    }

    return (
        <Fragment>
            <Grid stackable divided>
                <Grid.Row columns='2'>
                    <Grid.Column width='5'>
                        <Form onSubmit={handleSearchMovie}>
                            <Input
                                action={{icon: 'search'}}
                                name='movieTextSearch'
                                placeholder='Search by Title'
                                value={movieTextSearch}
                                onChange={handleInputChange}
                            />
                        </Form>
                    </Grid.Column>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <MovieForm
                            movieImdb={movieImdb}
                            movieTitle={movieTitle}
                            moviePoster={moviePoster}
                            handleInputChange={handleInputChange}
                            handleAddMovie={handleAddMovie}
                        />
                        <GenreForm/>
                        <ProductCompanyForm/>
                    </div>
                </Grid.Row>
            </Grid>
            <Table compact striped selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1}/>
                        <Table.HeaderCell width={4}>Poster</Table.HeaderCell>
                        <Table.HeaderCell width={3}>IMDB Rating</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Title</Table.HeaderCell>
                        <Table.HeaderCell width={4}>CreatedAt</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {movieList}
                </Table.Body>
            </Table>
        </Fragment>
    )
}

const mapStateToProps = (store) => {
    return {
        movieDetailsId: store.movieDetailsId
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveMovieDetailsId: (id) => dispatch(saveMovieDetailsId(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieTable)