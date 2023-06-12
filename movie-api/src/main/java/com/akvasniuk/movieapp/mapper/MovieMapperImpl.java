package com.akvasniuk.movieapp.mapper;

import com.akvasniuk.movieapp.dto.CreateMovieRequest;
import com.akvasniuk.movieapp.dto.MovieDto;
import com.akvasniuk.movieapp.entity.Movie;
import org.springframework.stereotype.Component;

@Component
public class MovieMapperImpl implements MovieMapper {


    @Override
    public Movie toMovie(CreateMovieRequest createMovieRequest) {
        if (createMovieRequest == null) {
            return null;
        }

        return Movie.builder().description(createMovieRequest.getDescription())
                .rating(createMovieRequest.getRating())
                .title(createMovieRequest.getTitle())
                .poster(createMovieRequest.getPoster()).build();
    }


    @Override
    public MovieDto toMovieDto(Movie movie) {
        if (movie == null) {
            return null;
        }

        return new MovieDto(movie.getId(), movie.getTitle(), movie.getPoster(), movie.getDescription(),
                movie.getRating(), movie.getMovieDetails().getId(), movie.getCreatedAt());
    }
}
