package com.akvasniuk.movieapp.service.impl;

import com.akvasniuk.movieapp.dto.ReviewRequest;
import com.akvasniuk.movieapp.entity.MovieDetails;
import com.akvasniuk.movieapp.entity.Review;
import com.akvasniuk.movieapp.entity.User;
import com.akvasniuk.movieapp.exception.ResourceNotFoundException;
import com.akvasniuk.movieapp.repository.ReviewRepository;
import com.akvasniuk.movieapp.service.MovieDetailsService;
import com.akvasniuk.movieapp.service.ReviewService;
import com.akvasniuk.movieapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserService userService;
    private final MovieDetailsService movieDetailsService;

    @Override
    public Review saveReview(ReviewRequest reviewRequest) {
        final User userByUsername = userService.getUserByUsername(reviewRequest.getUserUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", reviewRequest.getUserUsername()));
        final MovieDetails movieDetailsById = movieDetailsService.getMovieDetailsById(reviewRequest.getMovieDetailsId());

        Review review = new Review();
        review.setUser(userByUsername);
        review.setComments(reviewRequest.getComments());
        review.setMovieDetails(movieDetailsById);
        review.setRating(reviewRequest.getRating());
        review.setDislikeMovie(reviewRequest.isDislikeMovie());
        review.setLikeMovie(reviewRequest.isLikeMovie());

        return reviewRepository.save(review);
    }

    @Override
    public Review getReview(Long id) {
        return reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review", "id", id.toString()));
    }

    @Override
    public List<Review> getReviewsByMovieDetailsId(Long movieDetailsId) {
        return reviewRepository.findReviewsByMovieDetailsIdOrderByCreatedAtDesc(movieDetailsId);
    }

    @Override
    public void deleteReview(Long id) {
        if (!reviewRepository.existsById(id)) {
            throw new ResourceNotFoundException("Review", "id", id.toString());
        }

        reviewRepository.deleteById(id);
    }

    @Override
    public Long countLikeReviewsByMovieDetailsId(Long movieDetailsId) {
        return reviewRepository.countLikeReviewsByMovieDetailsId(movieDetailsId).orElse(0L);
    }

    @Override
    public Long countDislikeReviewsByMovieDetailsId(Long movieDetailsId) {
        return reviewRepository.countDislikeReviewsByMovieDetailsId(movieDetailsId).orElse(0L);
    }

    @Override
    public Double getAverageRatingReviewsByMovieDetailsId(Long movieDetailsId) {
        return reviewRepository.selectAverageRatingReviewsByMovieDetailsId(movieDetailsId).orElse(0.0);
    }
}
