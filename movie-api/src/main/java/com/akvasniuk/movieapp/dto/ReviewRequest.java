package com.akvasniuk.movieapp.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReviewRequest {
    private String comments;
    private Double rating;
    private boolean likeMovie;
    private boolean dislikeMovie;
    private String userUsername;
    private Long movieDetailsId;
}
