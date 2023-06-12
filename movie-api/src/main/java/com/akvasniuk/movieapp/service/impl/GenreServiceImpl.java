package com.akvasniuk.movieapp.service.impl;

import com.akvasniuk.movieapp.entity.Genre;
import com.akvasniuk.movieapp.exception.ResourceNotFoundException;
import com.akvasniuk.movieapp.repository.GenreRepository;
import com.akvasniuk.movieapp.service.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GenreServiceImpl implements GenreService {
    private final GenreRepository genreRepository;

    @Override
    public Genre saveGenre(Genre genre) {
        System.out.println();
        return genreRepository.save(genre);
    }

    @Override
    public Genre getGenreById(Long id) {
        return genreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Genre", "id", id.toString()));
    }

    @Override
    public Genre getGenreByName(String name) {
        return genreRepository.findGenreByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("Genre", "name", name));
    }

    @Override
    public List<Genre> getGenres() {
        return genreRepository.findAll();
    }
}
