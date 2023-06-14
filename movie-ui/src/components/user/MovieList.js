import React from 'react'
import {Form, Grid, Header, Icon, Image, Input, Item, Rating, Segment} from 'semantic-ui-react'

function MovieList({ isMoviesLoading, movieTextSearch, movies, handleInputChange, handleSearchMovie }) {
    let movieList
    if (movies.length === 0) {
        movieList = <Item key='no-movie'>No Movie</Item>
    } else {
        movieList = movies.map(movie => {
            return (
                <Item key={movie.imdb}>
                    <Image src={movie.poster}  size='small' bordered rounded  />
                    <Item.Content>
                        <Item.Header><a href={`/movie/${movie.movieDetailsId}`}>{movie.title}</a>
                        </Item.Header>
                        <Item.Description>
                             {movie.description}
                        </Item.Description>
                        <Rating icon={"star"} defaultRating={movie.rating} maxRating={5}/>
                    </Item.Content>

                </Item>
            )
        })
    }

    return (
        <Segment loading={isMoviesLoading} color='purple'>
            <Grid stackable divided>
                <Grid.Row columns='2'>
                    <Grid.Column width='3'>
                        <Header as='h2'>
                            <Icon name='video camera' />
                            <Header.Content>Movies</Header.Content>
                        </Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Form onSubmit={handleSearchMovie}>
                            <Input
                                action={{ icon: 'search' }}
                                name='movieTextSearch'
                                placeholder='Search by Title'
                                value={movieTextSearch}
                                onChange={handleInputChange}
                            />
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Item.Group divided unstackable relaxed link>
                {movieList}
            </Item.Group>
        </Segment>
    )
}

export default MovieList