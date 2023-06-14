import React from 'react'
import {Button, Form, Modal, Segment} from 'semantic-ui-react'
import {MoviesPage} from "./Movie/MoviePage";
import {useSearchParams} from "react-router-dom";

function SearchStep({ response, searchText, isLoading, handleChange, handleSearchMovies,
                    closeModal, isOpen, toggleModal, saveMovie, handleTableSelection}) {

    const movieList = response ?  <MoviesPage handleTableSelection={handleTableSelection} saveMovie = {saveMovie} closeModal={closeModal} movies={response} searchText={searchText}/> : <></>

    const [searchParams, setSearchParams] = useSearchParams();

    const deleteQueryParam = () => {
        searchParams.delete("page")
        setSearchParams(searchParams)
    }

    return (
        <Segment loading={isLoading}>
            <Form onSubmit={handleSearchMovies}>
                <Form.Group unstackable>
                    <Form.Input
                        placeholder='Search for a movie title ...'
                        name='searchText'
                        value={searchText}
                        onChange={handleChange}
                        fluid
                        width={12}
                    />
                    <Form.Button
                        color='blue'
                        content='Search'
                        disabled={searchText.trim() === ''}
                        fluid
                        width={4}
                    />
                </Form.Group>
            </Form>

            <Modal size={"fullscreen"}
                open={isOpen}
                onClose={() => toggleModal()}
            >
                <Modal.Header>
                    Movies
                    <Button onClick={() => {
                        closeModal()
                        deleteQueryParam()
                    }}>Close</Button>
                </Modal.Header>
                <Modal.Content>
                    {movieList}
                </Modal.Content>
            </Modal>
        </Segment>
    )
}

export default SearchStep