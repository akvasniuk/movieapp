package com.akvasniuk.movieapp.service;

import com.akvasniuk.movieapp.dto.ReviewRequest;
import com.akvasniuk.movieapp.entity.Review;
import com.akvasniuk.movieapp.repository.ReviewRepository;

import java.util.List;


public interface ReviewService {
    Review saveReview(ReviewRequest review);

    Review getReview(Long id);

    List<Review> getReviewsByMovieDetailsId(Long movieDetailsId);

    void deleteReview(Long id);

    Long countLikeReviewsByMovieDetailsId(Long movieDetailsId);

    Long countDislikeReviewsByMovieDetailsId(Long movieDetailsId);

    Double getAverageRatingReviewsByMovieDetailsId(Long movieDetailsId);
}
