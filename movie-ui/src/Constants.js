const prod = {
  url: {
    API_BASE_URL: 'https://myapp.herokuapp.com',
    OMDB_BASE_URL: 'https://api.themoviedb.org/3'
  }
}

const dev = {
  url: {
    API_BASE_URL: 'http://localhost:8080',
    OMDB_BASE_URL: 'https://api.themoviedb.org/3'
  }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod