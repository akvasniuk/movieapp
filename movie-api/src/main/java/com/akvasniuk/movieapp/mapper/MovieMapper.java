package com.akvasniuk.movieapp.mapper;

import com.akvasniuk.movieapp.dto.CreateMovieRequest;
import com.akvasniuk.movieapp.dto.MovieDto;
import com.akvasniuk.movieapp.entity.Movie;

public interface MovieMapper {

    Movie toMovie(CreateMovieRequest createOrderRequest);

    MovieDto toMovieDto(Movie order);
}