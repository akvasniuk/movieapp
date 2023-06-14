import axios from 'axios'
import {config} from '../Constants'
import {parseJwt} from '../components/helpers/Helpers'

export const movieApi = {
    authenticate,
    signup,
    numberOfUsers,
    numberOfMovies,
    getUsers,
    saveUserAvatar,
    deleteUser,
    updateUser,
    getMovies,
    deleteMovie,
    addMovie,
    updateMovie,
    getMovieDetails,
    createReview,
    getReviews,
    getReviewsStat,
    getGenres,
    saveGenre,
    saveProductCompany,
    getProductCompanies,
    getRoles
}

function authenticate(username, password) {
    return instance.post('/auth/authenticate', {username, password}, {
        headers: {'Content-type': 'application/json'}
    })
}

function signup(user) {
    return instance.post('/auth/signup', user, {
        headers: {'Content-type': 'application/json'}
    })
}

function numberOfUsers() {
    return instance.get('/public/numberOfUsers')
}

function numberOfMovies() {
    return instance.get('/public/numberOfMovies')
}

function getUsers(user, username) {
    const url = username ? `/api/users/${username}` : '/api/users'
    return instance.get(url, {
        headers: {'Authorization': bearerAuth(user)}
    })
}

function updateUser(user, username, updatedUser) {
    const url = `/api/users/${username}`

    return instance.put(url, updatedUser, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user)
        }
    })
}

function getRoles(user) {
    const url = '/api/users/roles'
    return instance.get(url, {
        headers: {'Authorization': bearerAuth(user)}
    })
}

function saveUserAvatar(user, username, avatar) {
    const url = `/api/users/${username}/avatar`

    return instance.put(url, avatar, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user)
        }
    })
}

function deleteUser(user, username) {
    return instance.delete(`/api/users/${username}`, {
        headers: {'Authorization': bearerAuth(user)}
    })
}

function getMovies(user, text) {
    const url = text ? `/api/movies?text=${text}` : '/api/movies'
    return instance.get(url, {
        headers: {'Authorization': bearerAuth(user)}
    })
}

function getMovieDetails(user, movieDetailsId) {
    const url = `/api/movie-details/${movieDetailsId}`
    return instance.get(url, {
        headers: {'Authorization': bearerAuth(user)}
    })
}

function deleteMovie(user, id) {
    return instance.delete(`/api/movies/${id}`, {
        headers: {'Authorization': bearerAuth(user)}
    })
}

function addMovie(user, movie) {
    return instance.post('/api/movies/movie_details', movie, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user)
        }
    })
}

function updateMovie(user, movie) {
    return instance.put('/api/movies/movie_details', movie, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user)
        }
    })
}

function getReviews(user, movieDetailsId) {
    const url = `/api/movie-details/review/${movieDetailsId}`
    return instance.get(url, {
        headers: {'Authorization': bearerAuth(user)}
    })
}

function getReviewsStat(user, movieDetailsId) {
    const url = `/api/movie-details/review/stat/${movieDetailsId}`
    return instance.get(url, {
        headers: {'Authorization': bearerAuth(user)}
    })
}

function createReview(user, review) {
    return instance.post('/api/movie-details/review', review, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user)
        }
    })
}

function getGenres(user) {
    const url = `/api/movie-details/genre`
    return instance.get(url, {
        headers: {'Authorization': bearerAuth(user)}
    })
}

function saveGenre(user, genre) {
    return instance.post('/api/movie-details/genre', genre, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user)
        }
    })
}

function getProductCompanies(user) {
    const url = `/api/movie-details/product-company`
    return instance.get(url, {
        headers: {'Authorization': bearerAuth(user)}
    })
}

function saveProductCompany(user, productCompany) {
    return instance.post('/api/movie-details/product-company', productCompany, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user)
        }
    })
}

const instance = axios.create({
    baseURL: config.url.API_BASE_URL
})

instance.interceptors.request.use(function (config) {
    if (config.headers.Authorization) {
        const token = config.headers.Authorization.split(' ')[1]
        const data = parseJwt(token)
        if (Date.now() > data.exp * 1000) {
            window.location.href = "/login"
        }
    }
    return config
}, function (error) {
    return Promise.reject(error)
})


function bearerAuth(user) {
    return `Bearer ${user.accessToken}`
}