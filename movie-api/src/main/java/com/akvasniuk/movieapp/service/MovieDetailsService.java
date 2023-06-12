package com.akvasniuk.movieapp.service;

import com.akvasniuk.movieapp.entity.Movie;
import com.akvasniuk.movieapp.entity.MovieDetails;

import java.util.List;

public interface MovieDetailsService {

    List<MovieDetails> getMoviesDetails();
    MovieDetails saveMovieDetails(MovieDetails movieDetails);

    MovieDetails getMovieDetailsById(Long id);

    void deleteMovieDetails(Long id);

    MovieDetails updateMovieDetails(Long id, MovieDetails movieDetails);
}
