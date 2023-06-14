import React, {Component} from 'react'
import {
    Button,
    Radio,
    Form,
    Input,
    TextArea
} from 'semantic-ui-react'
import {movieApi} from '../../services/MovieApi'
import {handleLogError} from "../helpers/Helpers";

class ReviewForm extends Component {
    state = {}

    handleChange = (e, {value, name}) => {
        if (name) {
            this.setState({[name]: value})
        } else {
            this.setState({value})
        }
    }

    handleSubmit = (close) => {
        const {rating, review, value} = this.state
        const {user, movieDetails} = this.props

        const reviewObject = {
            rating,
            comments: review,
            likeMovie: +value === 1,
            dislikeMovie: +value === 2,
            userUsername: user.data.preferred_username,
            movieDetailsId: movieDetails.id
        }

        movieApi.createReview(user, reviewObject)
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
                close()
                window.location.reload()
            })


    }

    render() {
        const {value} = this.state
        const {close} = this.props;

        return (
            <Form onSubmit={() => this.handleSubmit(close)}>

                <Form.Group widths='equal'>
                    <Form.Input
                        required
                        control={Input}
                        label='Rating'
                        placeholder='Provide rating from 0 to 10'
                        onChange={this.handleChange}
                        name="rating"
                    />
                </Form.Group>
                <Form.Group inline>
                    <Form.Field
                        control={Radio}
                        label='Like'
                        value='1'
                        checked={value === '1'}
                        onChange={this.handleChange}
                    />
                    <Form.Field
                        control={Radio}
                        label='Dislike'
                        value='2'
                        checked={value === '2'}
                        onChange={this.handleChange}
                    />
                </Form.Group>
                <Form.Input required
                            control={TextArea}
                            label='Review'
                            placeholder='Provide your review'
                            onChange={this.handleChange}
                            name="review"
                />
                <Form.Field control={Button}>Submit</Form.Field>
            </Form>
        )
    }
}

export default ReviewForm;
