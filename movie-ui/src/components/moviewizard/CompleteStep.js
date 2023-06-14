import React from 'react'
import { Card } from 'semantic-ui-react'
import MoviePoster from "./Movie/MoviePoster";

function CompleteStep({ movie }) {
    return (
        <Card.Group doubling centered>
            <MoviePoster movie={movie}  />
        </Card.Group>
    )
}

export default CompleteStep