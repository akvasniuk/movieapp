package com.akvasniuk.movieapp.service;

import com.akvasniuk.movieapp.dto.CreateMovieWithDetailsRequest;
import com.akvasniuk.movieapp.entity.Movie;
import com.akvasniuk.movieapp.entity.MovieDetails;

import java.util.List;

public interface MovieService {

    List<Movie> getMovies();

    List<Movie> getMoviesContainingText(String text);

    Movie validateAndGetMovie(Long id);

    Movie saveMovie(Movie movie);

    void deleteMovie(Movie movie);

    MovieDetails saveMovieWithMovieDetails(CreateMovieWithDetailsRequest createMovieWithDetailsRequest);

    MovieDetails updateMovieWithMovieDetails(CreateMovieWithDetailsRequest createMovieWithDetailsRequest);
}
