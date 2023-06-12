package com.akvasniuk.movieapp.dto;

import java.time.LocalDateTime;

public record MovieDto(Long id, String title, String poster, String description, Integer rating, Long movieDetailsId,
                       LocalDateTime createdAt) {
}