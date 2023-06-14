import React, {Component} from 'react'
import {Button, Container, Divider, Grid, Icon, Step} from 'semantic-ui-react'
import {handleLogError} from '../helpers/Helpers'
import {omdbApi} from '../../services/OmdbApi'
import CompleteStep from './CompleteStep'
import FormStep from './FormStep'
import SearchStep from './SearchStep'
import {closeModal, openModal, toggleModal} from "../../store/actions/modalActions";
import {connect} from "react-redux";
import {saveMovie} from "../../store/actions/movieActions";
import {movieApi} from "../../services/MovieApi";
import AuthContext from "../../context/AuthContext";
import {Navigate} from "react-router-dom";


class MovieWizard extends Component {
    static contextType = AuthContext

    state = {
        step: 1,

        // Search Step
        isLoading: false,
        searchText: '',
        selectedMovie: null,
        searchMovie: "",

        // Form Step
        description: "",
        rating: 0,
        title: "",
        poster: "",
        tagline: "",
        runtime: 0,
        status: 0,
        releaseDate: "2020-12-13",
        popularity: 0,
        overview: 0,
        descriptionError: false,
        ratingError: false,
        titleError: false,
        posterError: false,
        taglineError: false,
        runtimeError: false,
        statusError: false,
        popularityError: false,
        overviewError: false,
        genres: [],
        productCompanies: [],
        response: {},
        allGenres: [],
        allProductCompanies: [],
        isSubmitted: false
    }

    setStateForStat = (genres, productCompanies) => {
        this.setState({...this.state, allGenres: genres, allProductCompanies: productCompanies})
    }


    handlePreviousStep = () => {
        let {
            step, descriptionError, ratingError, titleError
            , posterError, taglineError, runtimeError, statusError
            , popularityError, overviewError
        } = this.state

        if (step === 2) {
            descriptionError = false
            ratingError = false
            titleError = false
            posterError = false
            taglineError = false
            runtimeError = false
            statusError = false
            popularityError = false
            overviewError = false
        }

        step = step > 1 ? step - 1 : step
        this.setState({
            step, descriptionError, ratingError, titleError, posterError,
            taglineError, runtimeError, statusError, popularityError, overviewError
        })
    }

    handleNextStep = () => {
        let {step} = this.state

        if (step === 2 && !this.isValidForm()) {
            return
        }

        step = step < 3 ? step + 1 : step
        this.setState({step})
    }

    handleChange = ({target}) => {
        if (target.name === "genre") {
            if (target.checked) {
                this.setState((prevState) => {
                    return {...this.state, genres: [...prevState.genres, +target.value]}
                })
            } else {
                this.setState((prevState) => {
                    return {...this.state, genres: [...prevState.genres.filter(genre => genre !== +target.value)]}
                })
            }
            return
        }

        if (target.name === "productCompany") {
            if (target.checked) {
                this.setState((prevState) => {
                    return {...this.state, productCompanies: [...prevState.productCompanies, +target.value]}
                })
            } else {
                this.setState((prevState) => {
                    return {
                        ...this.state, productCompanies: [...prevState.productCompanies
                            .filter(productCompany => productCompany !== +target.value)]
                    }
                })
            }
            return;
        }

        this.setState({...this.state, [target.name]: target.value})
    }

    handleTableSelection = (movie) => {
        const {selectedMovie} = this.state

        if (movie && selectedMovie && movie.id === selectedMovie.id) {
            this.setState({
                selectedMovie: null,
                description: "",
                rating: 0,
                title: "",
                poster: "",
                tagline: "",
                runtime: 0,
                status: 0,
                releaseDate: "2020-12-13",
                popularity: 0,
                overview: 0,
                genres: [],
                productCompanies: []
            })
        } else {
            this.setState({
                selectedMovie: movie,
                description: movie.description,
                rating: movie.rating,
                title: movie.title,
                poster: movie.poster,
                tagline: movie.tagline,
                runtime: movie.runtime,
                status: movie.status,
                releaseDate: movie.releaseDate,
                popularity: movie.popularity,
                overview: movie.overview,
                genres: movie.genres || [],
                productCompanies: movie.productCompanies || []
            })
        }
    }

    handleSearchMovies = async () => {
        this.setState({isLoading: true})
        const {searchText} = this.state

        try {
            const response = await omdbApi.getMovies(searchText)
            const {Error} = response.data
            if (Error) {
                console.log(Error)
            }

            this.props.openModal()
            this.setState({isLoading: false, response})
        } catch (error) {
            handleLogError(error)
        }
    }

    handleCreateMovie = async () => {
        try {
            const Auth = this.context
            const user = Auth.getUser()

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
            } = this.state

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
                genres,
                productCompanies
            }

            await movieApi.addMovie(user, movie);

            this.setState({...this.state, isSubmitted: true})

        } catch (error) {
            handleLogError(error)
        }
    }

    isValidForm = () => {
        const {
            description,
            rating,
            title,
            poster,
            tagline,
            runtime,
            status,
            popularity,
            overview,
        } = this.state

        const descriptionError = description.trim() === ''
        const ratingError = rating === 0
        const titleError = title.trim() === ''
        const posterError = poster.trim() === ''
        const taglineError = tagline.trim() === ''
        const runtimeError = runtime === 0
        const statusError = status.trim() === ''
        const popularityError = popularity === 0
        const overviewError = overview === 0

        this.setState({
            descriptionError, ratingError, titleError, posterError,
            taglineError, runtimeError, statusError, popularityError, overviewError
        })
        return (!(descriptionError || ratingError || titleError || posterError || taglineError
            || runtimeError || statusError || popularityError || overviewError))
    }

    getContent = () => {
        const {step} = this.state
        const {toggleModal, openModal, closeModal, isOpen, saveMovie} = this.props

        let stepContent = null
        if (step === 1) {
            const {isLoading, searchText, selectedMovie} = this.state
            stepContent = (
                <SearchStep
                    searchText={searchText}
                    isLoading={isLoading}
                    response={this.state.response.data}
                    selectedMovie={selectedMovie}
                    handleChange={this.handleChange}
                    handleSearchMovies={this.handleSearchMovies}
                    handleTableSelection={this.handleTableSelection}
                    modalOpen={this.state.modalIsOpen}
                    toggleModal={toggleModal}
                    closeModal={closeModal}
                    openModal={openModal}
                    isOpen={isOpen}
                    saveMovie={saveMovie}
                />
            )
        } else if (step === 2) {
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
                descriptionError,
                ratingError,
                titleError,
                posterError,
                taglineError,
                runtimeError,
                statusError,
                popularityError,
                overviewError
            } = this.state
            stepContent = (
                <FormStep
                    description={description}
                    rating={rating}
                    title={title}
                    poster={poster}
                    tagline={tagline}
                    runtime={runtime}
                    status={status}
                    releaseDate={releaseDate}
                    popularity={popularity}
                    overview={overview}
                    genres={genres}
                    productCompanies={productCompanies}
                    descriptionError={descriptionError}
                    ratingError={ratingError}
                    titleError={titleError}
                    posterError={posterError}
                    taglineError={taglineError}
                    runtimeError={runtimeError}
                    statusError={statusError}
                    popularityError={popularityError}
                    overviewError={overviewError}
                    handleChange={this.handleChange}
                    setStateForStat={this.setStateForStat}
                />
            )
        } else if (step === 3) {
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
            } = this.state

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
                genres,
                productCompanies
            }

            stepContent = (
                <CompleteStep movie={movie}/>
            )
        }

        return (
            <Container>
                <Grid columns={2}>
                    <Grid.Column mobile={16} tablet={4} computer={4}>
                        <Step.Group fluid vertical>
                            <Step active={step === 1}>
                                <Icon name='search'/>
                                <Step.Content>
                                    <Step.Title>Search</Step.Title>
                                    <Step.Description>Search movie</Step.Description>
                                </Step.Content>
                            </Step>

                            <Step active={step === 2}>
                                <Icon name='film'/>
                                <Step.Content>
                                    <Step.Title>Movie</Step.Title>
                                    <Step.Description>Movie Form</Step.Description>
                                </Step.Content>
                            </Step>

                            <Step active={step === 3}>
                                <Icon name='flag checkered'/>
                                <Step.Content>
                                    <Step.Title>Complete</Step.Title>
                                    <Step.Description>Preview and complete</Step.Description>
                                </Step.Content>
                            </Step>
                        </Step.Group>

                        <Button.Group fluid>
                            <Button
                                disabled={step === 1}
                                onClick={this.handlePreviousStep}>Back</Button>
                            <Button.Or/>
                            <Button
                                positive
                                disabled={step === 3}
                                onClick={this.handleNextStep}>Next</Button>
                        </Button.Group>

                        {step === 3 && (
                            <>
                                <Divider/>
                                <Button fluid color='blue' onClick={this.handleCreateMovie}>Create
                                    {this.state.isSubmitted ? <Navigate to={"/home"}/> : null}
                                </Button>
                            </>
                        )}
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={12} computer={12}>
                        {stepContent}
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }

    render() {
        return this.getContent()
    }
}

const mapStateToProps = (store) => {
    return {
        isOpen: store.isOpen,
        movie: store.movie
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleModal: () => dispatch(toggleModal()),
        openModal: () => dispatch(openModal()),
        closeModal: () => dispatch(closeModal()),
        saveMovie: (movie) => dispatch(saveMovie(movie))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieWizard)