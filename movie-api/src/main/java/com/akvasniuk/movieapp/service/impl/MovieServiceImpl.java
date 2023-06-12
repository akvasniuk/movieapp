package com.akvasniuk.movieapp.service.impl;

import com.akvasniuk.movieapp.dto.CreateMovieWithDetailsRequest;
import com.akvasniuk.movieapp.entity.Genre;
import com.akvasniuk.movieapp.entity.Movie;
import com.akvasniuk.movieapp.entity.MovieDetails;
import com.akvasniuk.movieapp.entity.ProductCompany;
import com.akvasniuk.movieapp.exception.ResourceNotFoundException;
import com.akvasniuk.movieapp.repository.MovieRepository;
import com.akvasniuk.movieapp.service.GenreService;
import com.akvasniuk.movieapp.service.MovieDetailsService;
import com.akvasniuk.movieapp.service.MovieService;
import com.akvasniuk.movieapp.service.ProductCompanyService;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MovieServiceImpl implements MovieService {

    private final MovieRepository movieRepository;
    private final GenreService genreService;
    private final ProductCompanyService productCompanyService;
    private final MovieDetailsService movieDetailsService;
    private final EntityManager entityManager;

    @Override
    public List<Movie> getMovies() {
        return movieRepository.findAllByOrderByTitle();
    }

    @Override
    public List<Movie> getMoviesContainingText(String text) {
        return movieRepository.findByTitleContainingIgnoreCaseOrderByTitle(text);
    }

    @Override
    public Movie validateAndGetMovie(Long id) {
        return movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie", "id", id.toString()));
    }

    @Override
    public Movie saveMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    @Override
    public void deleteMovie(Movie movie) {
        movieRepository.delete(movie);
    }

    @Override
    @Transactional
    public MovieDetails saveMovieWithMovieDetails(CreateMovieWithDetailsRequest createMovieWithDetailsRequest) {
        Movie movie = new Movie();
        movie.setRating(createMovieWithDetailsRequest.getRating());
        movie.setDescription(createMovieWithDetailsRequest.getDescription());
        movie.setTitle(createMovieWithDetailsRequest.getTitle());
        movie.setPoster(createMovieWithDetailsRequest.getPoster());
        entityManager.persist(movie);

        MovieDetails movieDetails = new MovieDetails();
        return getMovieDetails(createMovieWithDetailsRequest, movie, movieDetails);
    }

    @Override
    @Transactional
    public MovieDetails updateMovieWithMovieDetails(CreateMovieWithDetailsRequest createMovieWithDetailsRequest) {
        final Movie movieById = movieRepository.findById(createMovieWithDetailsRequest.getMovieId())
                .orElse(new Movie());

        final MovieDetails movieDetailsById = movieDetailsService.getMovieDetailsById(
                createMovieWithDetailsRequest.getMovieDetailsId());


        movieById.setRating(createMovieWithDetailsRequest.getRating());
        movieById.setDescription(createMovieWithDetailsRequest.getDescription());
        movieById.setTitle(createMovieWithDetailsRequest.getTitle());
        movieById.setPoster(createMovieWithDetailsRequest.getPoster());
        entityManager.persist(movieById);

        return getMovieDetails(createMovieWithDetailsRequest, movieById, movieDetailsById);
    }

    private MovieDetails getMovieDetails(CreateMovieWithDetailsRequest createMovieWithDetailsRequest, Movie movieById,
                                         MovieDetails movieDetailsById) {
        movieDetailsById.setRuntime(createMovieWithDetailsRequest.getRuntime());
        movieDetailsById.setStatus(createMovieWithDetailsRequest.getStatus());
        movieDetailsById.setTagline(createMovieWithDetailsRequest.getTagline());
        movieDetailsById.setPopularity(createMovieWithDetailsRequest.getPopularity());
        movieDetailsById.setOverview(createMovieWithDetailsRequest.getOverview());
        movieDetailsById.setReleaseDate(createMovieWithDetailsRequest.getReleaseDate());
        movieDetailsById.setMovie(movieById);
        entityManager.persist(movieDetailsById);

        final List<Genre> genres = createMovieWithDetailsRequest.getGenres().stream()
                .map(genre -> {
                    final Genre genreById = genreService.getGenreById(genre);
                    genreById.setMovieDetails(List.of(movieDetailsById));
                    return genreById;
                })
                .toList();
        final List<ProductCompany> productCompanies = createMovieWithDetailsRequest.getProductCompanies().stream()
                .map(productCompany -> {
                    final ProductCompany productCompanyById = productCompanyService.getProductCompanyById(productCompany);
                    productCompanyById.setMovieDetails(List.of(movieDetailsById));
                    return productCompanyById;
                })
                .toList();

        movieDetailsById.setGenres(genres);
        movieDetailsById.setProductCompanies(productCompanies);
        entityManager.persist(movieDetailsById);
        return movieDetailsById;
    }
}
