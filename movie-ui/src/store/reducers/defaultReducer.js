export const initialState = {
    isOpen: false,
    movie: {
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
    },
    username: "",
    movieDetailsId: 0
}

export function defaultReducer(state = initialState, action) {
    switch (action.type) {
        case 'OPEN_MODAL':
            return {...state, isOpen: true};
        case 'CLOSE_MODAL':
            return {...state, isOpen: false};
        case 'TOGGLE_MODAL':
            return {...state, isOpen: !state.isOpen};
        case 'SAVE_MOVIE' :
            return {...state, movie: {...state.movie, ...action.payload}}
        case "SAVE_USERNAME":
            return {...state, username: action.payload}
        case "SAVE_MOVIE_DETAILS":
            return {...state, movieDetailsId: action.payload}
        default:
            return state;
    }
}