package com.akvasniuk.movieapp.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class CreateMovieWithDetailsRequest extends CreateMovieRequest {
    Long movieId;
    Long movieDetailsId;

    @NotBlank
    private String tagline;

    @NotNull
    private Integer runtime;

    @NotNull
    private String status;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate releaseDate;

    @NotNull
    private Integer popularity;

    @NotNull
    private String overview;

    private List<Long> genres;

    private List<Long> productCompanies;

}
