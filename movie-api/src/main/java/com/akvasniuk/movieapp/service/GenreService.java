package com.akvasniuk.movieapp.service;

import com.akvasniuk.movieapp.entity.Genre;

import java.util.List;

public interface GenreService {
    Genre saveGenre(Genre genre);

    Genre getGenreById(Long id);

    Genre getGenreByName(String name);

    List<Genre> getGenres();
}
