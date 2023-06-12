package com.akvasniuk.movieapp.repository;

import com.akvasniuk.movieapp.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

    List<Movie> findAllByOrderByTitle();

    List<Movie> findByTitleContainingIgnoreCaseOrderByTitle(String title);
}
