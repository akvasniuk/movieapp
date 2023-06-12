package com.akvasniuk.movieapp.service.impl;

import com.akvasniuk.movieapp.entity.MovieDetails;
import com.akvasniuk.movieapp.exception.ResourceNotFoundException;
import com.akvasniuk.movieapp.repository.MovieDetailsRepository;
import com.akvasniuk.movieapp.service.MovieDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MovieDetailsServiceImpl implements MovieDetailsService {
    private final MovieDetailsRepository movieDetailsRepository;

    @Override
    public List<MovieDetails> getMoviesDetails() {
        return movieDetailsRepository.findAll();
    }

    @Override
    public MovieDetails saveMovieDetails(MovieDetails movieDetails) {
        return movieDetailsRepository.save(movieDetails);
    }

    @Override
    public MovieDetails getMovieDetailsById(Long id) {
        return movieDetailsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MovieDetails", "id", id.toString()));
    }

    @Override
    public void deleteMovieDetails(Long id) {
        validateMovieDetailsIdExists(id);
        movieDetailsRepository.deleteById(id);
    }

    @Override
    public MovieDetails updateMovieDetails(Long id, MovieDetails movieDetails) {
        validateMovieDetailsIdExists(id);
        movieDetails.setId(id);
        return movieDetails;
    }

    private void validateMovieDetailsIdExists(Long id) {
        if (!movieDetailsRepository.existsById(id)) {
            throw new ResourceNotFoundException("MovieDetails", "id", id.toString());
        }
    }
}
