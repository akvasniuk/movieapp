package com.akvasniuk.movieapp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateMovieRequest {
    @NotBlank
    private String description;

    @NotNull
    private Integer rating;

    @NotBlank
    private String title;

    private String poster;
}
