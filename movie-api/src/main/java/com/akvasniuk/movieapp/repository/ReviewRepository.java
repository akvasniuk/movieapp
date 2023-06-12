package com.akvasniuk.movieapp.repository;

import com.akvasniuk.movieapp.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findReviewsByMovieDetailsIdOrderByCreatedAtDesc(Long movieDetailsId);

    @Query("select COUNT(r.likeMovie) from Review r where r.movieDetails.id = :movieDetailsId and r.likeMovie = true")
    Optional<Long> countLikeReviewsByMovieDetailsId(Long movieDetailsId);

    @Query("select COUNT(r.dislikeMovie) from Review r where r.movieDetails.id = :movieDetailsId and r.dislikeMovie = true ")
    Optional<Long> countDislikeReviewsByMovieDetailsId(Long movieDetailsId);

    @Query("select avg(r.rating) from Review r where r.movieDetails.id = :movieDetailsId")
    Optional<Double> selectAverageRatingReviewsByMovieDetailsId(Long movieDetailsId);
}
