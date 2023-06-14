import React, {Component} from 'react'
import css from "./MovieDetails.module.css";
import AuthContext from "../../../context/AuthContext";
import {movieApi} from "../../../services/MovieApi";
import {handleLogError} from "../../helpers/Helpers";
import {useLocation, useNavigate} from "react-router-dom";
import {Rating, Header, Button, Modal, Comment, Icon} from "semantic-ui-react";
import {Company} from "../Company/Company";
import {GenreBadge} from "../GenreBadge/GenreBadge";
import ReviewForm from "../ReviewForm";

function myParams(MovieDetails) {
    return props => <MovieDetails navHook={useNavigate()} locationHook={useLocation()}/>
}


class MovieDetails extends Component {
    static contextType = AuthContext

    state = {
        movieDetails: {},
        movieTextSearch: '',
        isUser: true,
        isMoviesLoading: false,
        modalIsOpen: false,
        user: {},
        close: false,
        reviews: {},
        reviewStat: {},
        userAvatar: ""
    }

    componentDidMount() {
        const Auth = this.context
        const user = Auth.getUser()

        const isUser = user.data.roles[0] === 'USER'
        this.setState({isUser})

        this.handleGetMovieDetails()
        this.handleGetReviews()
        this.handleGetReviewsStat()
        this.handleGetUser()
    }

    handleGetUser = () => {
        const Auth = this.context
        const user = Auth.getUser()
        const avatarURL = "https://api.dicebear.com/6.x/avataaars/svg?seed=";

        this.setState({isMoviesLoading: true})
        movieApi.getUsers(user, user.data.preferred_username)
            .then(response => {
                this.setState({userAvatar: avatarURL + response.data.avatar})
            })
            .catch(error => {
                handleLogError(error)
            })
    }

    handleGetMovieDetails = () => {
        const Auth = this.context
        const user = Auth.getUser()

        this.setState({isMoviesLoading: true})
        movieApi.getMovieDetails(user, +this.props.locationHook.pathname.substring(7))
            .then(response => {
                this.setState({movieDetails: response.data, user: user})
            })
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
                this.setState({isMoviesLoading: false})
            })
    }

    handleGetReviews = () => {
        const Auth = this.context
        const user = Auth.getUser()

        movieApi.getReviews(user, +this.props.locationHook.pathname.substring(7))
            .then(response => {
                this.setState({reviews: response.data, user: user})
            })
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
                this.setState({isMoviesLoading: false})
            })
    }

    handleGetReviewsStat = () => {
        const Auth = this.context
        const user = Auth.getUser()

        movieApi.getReviewsStat(user, +this.props.locationHook.pathname.substring(7))
            .then(response => {
                this.setState({reviewStat: response.data, user: user})
            })
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
                this.setState({isMoviesLoading: false})
            })
    }

    toggleModalDisplay = () => {
        this.setState({modalIsOpen: !this.state.modalIsOpen});
    };

    addReview = () => {
        this.toggleModalDisplay();
    }


    render() {
        const {
            movie, releaseDate, runtime, tagline,
            popularity, overview, genres, productCompanies,
            status
        } = this.state?.movieDetails;

        const {modalIsOpen, user, reviews, reviewStat, userAvatar} = this.state;

        return (
            <div>
                <div className={css.movieCard}>
                    {<button className={css.button} onClick={() => this.props.navHook(-1)}>Previous page</button>}
                    <div className={css.container}
                         style={{background: `url(${movie?.poster}) 0 0 / 300px 316px no-repeat`}}>

                        <div className={css.hero}>

                            <div className={css.details}>

                                <div className={css.title1} style={{color: "black"}}>{movie?.title}
                                </div>

                                <div className={css.title2} style={{color: "black"}}>{tagline}
                                    <span className={css.span}>{overview}</span>
                                    <span className={css.span}>runtime {runtime}</span>
                                    <span className={css.span}>
                                        <Icon name="like"/>
                                        {reviewStat.likes || 0}
                                    </span>
                                    <span className={css.span}>
                                        <Icon name="remove"/>
                                        {reviewStat.dislikes || 0}
                                    </span>
                                    <span className={css.span}>
                                        <Icon name="film"/>
                                        Rating {reviewStat.avgRating || 0}
                                    </span>
                                </div>

                                <div className={css.title2}>
                                    {movie && movie.rating
                                        && <Rating icon={"star"} defaultRating={movie.rating} maxRating={5}/>}
                                </div>
                            </div>
                        </div>

                        <div className={css.description} style={{display: "flex", justifyContent: "center"}}>
                            <div className={css.column1}>
                                {genres && <GenreBadge receivedGenres={genres}/>}
                                <p>
                                    Release data {releaseDate}
                                </p>
                                <p>
                                    {status}
                                </p>
                                <p>
                                    Popularity {popularity}
                                </p>
                            </div>
                        </div>
                        <h4 className={css.center}>Companies</h4>
                        <div className={css.companies}>
                            {
                                productCompanies?.map(company =>
                                    <Company key={company.id} name={company.name} logo_path={company.logoPath}/>)
                            }
                        </div>
                    </div>

                    <Modal
                        open={modalIsOpen}
                        onClose={() => this.addReview}
                    >
                        <Modal.Header>
                            Review Form
                            <Button onClick={() => this.setState({modalIsOpen: false})}
                            >Close</Button>
                        </Modal.Header>
                        <Modal.Content>
                            <ReviewForm close={this.toggleModalDisplay} user={user}
                                        movieDetails={this.state?.movieDetails}/>
                        </Modal.Content>
                    </Modal>

                    <div className={css.center}>
                        <Header as="h3" dividing className={css.center}>
                            <div style={{display: "flex", justifyContent: "space-around"}}>
                                <div>REVIEWS</div>
                                <Button primary onClick={this.addReview}>Add Review</Button>
                            </div>
                        </Header>

                        <div style={{display: "flex", width: "100%", justifyContent: "center"}}>
                            <Comment.Group>
                                {
                                    reviews.length > 0
                                        ?
                                        reviews.map(review =>
                                            <Comment className={css.center}>
                                                <Comment.Avatar as="a"
                                                                src={userAvatar ? userAvatar : 'https://cdn-icons-png.flaticon.com/512/666/666201.png'}/>
                                                <Comment.Content>
                                                    <Comment.Author>{user.data.preferred_username}</Comment.Author>
                                                    <Comment.Metadata>
                                                        <div>{review.createdAt}</div>
                                                        <div>
                                                            <Icon name='star'/>{review.rating} Faves
                                                        </div>
                                                        <div>
                                                            {
                                                                review.likeMovie
                                                                    ? <Icon name='like'/>
                                                                    : <Icon name="remove"/>
                                                            }
                                                        </div>
                                                    </Comment.Metadata>
                                                    <Comment.Text>{review.comments}</Comment.Text>
                                                    <Comment.Actions>
                                                        <Comment.Action></Comment.Action>
                                                    </Comment.Actions>
                                                </Comment.Content>
                                            </Comment>
                                        )
                                        : null
                                }
                            </Comment.Group>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}


export default myParams(MovieDetails);