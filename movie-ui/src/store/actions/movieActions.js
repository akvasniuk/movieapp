function saveMovie(movie){
    return {
        type: "SAVE_MOVIE",
        payload: movie
    }
}

function saveMovieDetailsId(id){
    return {
        type: "SAVE_MOVIE_DETAILS",
        payload: id
    }
}

export {
    saveMovie,
    saveMovieDetailsId
}