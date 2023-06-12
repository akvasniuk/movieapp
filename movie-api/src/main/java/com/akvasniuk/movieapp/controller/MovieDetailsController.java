package com.akvasniuk.movieapp.controller;

import com.akvasniuk.movieapp.dto.ReviewRequest;
import com.akvasniuk.movieapp.entity.Genre;
import com.akvasniuk.movieapp.entity.MovieDetails;
import com.akvasniuk.movieapp.entity.ProductCompany;
import com.akvasniuk.movieapp.entity.Review;
import com.akvasniuk.movieapp.service.GenreService;
import com.akvasniuk.movieapp.service.MovieDetailsService;
import com.akvasniuk.movieapp.service.ProductCompanyService;
import com.akvasniuk.movieapp.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/movie-details")
public class MovieDetailsController {
    private final MovieDetailsService movieDetailsService;
    private final GenreService genreService;
    private final ProductCompanyService productCompanyService;
    private final ReviewService reviewService;

    @GetMapping
    List<MovieDetails> getAllMoviesDetails() {
        return movieDetailsService.getMoviesDetails();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    MovieDetails createMovieDetails(@Valid @RequestBody MovieDetails movieDetails) {
        return movieDetailsService.saveMovieDetails(movieDetails);
    }

    @GetMapping("/{id}")
    MovieDetails getMovieDetailsById(@PathVariable Long id) {
        return movieDetailsService.getMovieDetailsById(id);
    }

    @PutMapping("/{id}")
    MovieDetails updateMoviDetailsById(@PathVariable Long id, @RequestBody MovieDetails movieDetails) {
        return movieDetailsService.updateMovieDetails(id, movieDetails);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteMovieDetails(@PathVariable Long id) {
        movieDetailsService.deleteMovieDetails(id);
    }

    @GetMapping("/genre")
    List<Genre> getGenres() {
        return genreService.getGenres();
    }

    @PostMapping("/genre")
    Genre createGenre(@Valid @RequestBody Genre genre) {
        System.out.println();
        return genreService.saveGenre(genre);
    }

    @GetMapping("/genre/{id}")
    Genre getGenreById(@PathVariable Long id) {
        return genreService.getGenreById(id);
    }

    @GetMapping("/product-company")
    List<ProductCompany> getProductCompanies() {
        return productCompanyService.getProductCompanies();
    }

    @PostMapping("/product-company")
    ProductCompany createProductCompany(@Valid @RequestBody ProductCompany productCompany) {
        return productCompanyService.saveProductCompany(productCompany);
    }

    @GetMapping("/product-company/{id}")
    ProductCompany getProductCompanyById(@PathVariable Long id) {
        return productCompanyService.getProductCompanyById(id);
    }

    @PostMapping("/review")
    @ResponseStatus(HttpStatus.CREATED)
    Review createReview(@RequestBody ReviewRequest review) {
        return reviewService.saveReview(review);
    }

    @GetMapping("/review/{movieDetailsId}")
    List<Review> getReviewsByMovieDetailsId(@PathVariable Long movieDetailsId) {
        return reviewService.getReviewsByMovieDetailsId(movieDetailsId);
    }

    @GetMapping("/review/stat/{movieDetailsId}")
    Map<String, Long> getLikeOrDislikeReviewsByMovieDetailsId(@PathVariable Long movieDetailsId) {
        Map<String, Long> reviewsStat = new HashMap<>();
        reviewsStat.put("likes", reviewService.countLikeReviewsByMovieDetailsId(movieDetailsId));
        reviewsStat.put("dislikes", reviewService.countDislikeReviewsByMovieDetailsId(movieDetailsId));
        reviewsStat.put("avgRating", Math.round(reviewService.getAverageRatingReviewsByMovieDetailsId(movieDetailsId)));

        return reviewsStat;
    }
}
