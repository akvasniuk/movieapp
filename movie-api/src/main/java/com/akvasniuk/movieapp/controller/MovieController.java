package com.akvasniuk.movieapp.controller;

import com.akvasniuk.movieapp.dto.CreateMovieRequest;
import com.akvasniuk.movieapp.dto.CreateMovieWithDetailsRequest;
import com.akvasniuk.movieapp.dto.MovieDto;
import com.akvasniuk.movieapp.entity.Movie;
import com.akvasniuk.movieapp.entity.MovieDetails;
import com.akvasniuk.movieapp.mapper.MovieMapper;
import com.akvasniuk.movieapp.service.MovieService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;
    private final MovieMapper movieMapper;

    @GetMapping
    public List<MovieDto> getMovies(@RequestParam(value = "text", required = false) String text) {
        List<Movie> movies = (text == null) ? movieService.getMovies() : movieService.getMoviesContainingText(text);
        return movies.stream()
                .map(movieMapper::toMovieDto)
                .toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MovieDto createMovie(@Valid @RequestBody CreateMovieRequest createMovieRequest) {
        Movie movie = movieMapper.toMovie(createMovieRequest);
        return movieMapper.toMovieDto(movieService.saveMovie(movie));
    }

    @PostMapping("/movie_details")
    @ResponseStatus(HttpStatus.CREATED)
    public MovieDetails createMovieWithMovieDetails(@Valid @RequestBody CreateMovieWithDetailsRequest createMovieWithDetailsRequest) {
        return movieService.saveMovieWithMovieDetails(createMovieWithDetailsRequest);
    }

    @PutMapping("/movie_details")
    public MovieDetails updateMovieWithMovieDetails(@Valid @RequestBody CreateMovieWithDetailsRequest createMovieWithDetailsRequest){
        return movieService.updateMovieWithMovieDetails(createMovieWithDetailsRequest);
    }

    @DeleteMapping("/{id}")
    public MovieDto deleteMovie(@PathVariable Long id) {
        Movie movie = movieService.validateAndGetMovie(id);
        movieService.deleteMovie(movie);
        return movieMapper.toMovieDto(movie);
    }
}
