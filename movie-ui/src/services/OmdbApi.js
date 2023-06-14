import axios from 'axios'
import {config} from '../Constants'

export const omdbApi = {
    getMovies,
    getMovieById,
    getGenres
}

function getMovies(query, page = 1) {
    return instance.get(`/search/movie`, {params: {query, page}})
}

function getMovieById(id) {
    return instance.get(`/movie/${id}`)
}

function getGenres() {
    return instance.get("/genre/movie/list")
}


const instance = axios.create({
    baseURL: config.url.OMDB_BASE_URL
})

instance.interceptors.request.use((config) => {
    config.headers = config.headers ?? {};
    config.headers['Authorization'] = `Bearer ${process.env.REACT_APP_OMDB_API_KEY}`

    return config;
})