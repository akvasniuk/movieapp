package com.akvasniuk.movieapp.repository;

import com.akvasniuk.movieapp.entity.MovieDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieDetailsRepository extends JpaRepository<MovieDetails, Long> {
}
