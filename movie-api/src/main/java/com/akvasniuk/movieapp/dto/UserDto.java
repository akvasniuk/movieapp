package com.akvasniuk.movieapp.dto;

import java.time.LocalDateTime;

public record UserDto(Long id, String username, String name, String email, String role,
                      LocalDateTime createdAt, String avatar, boolean enabled,
                      String verificationCode, LocalDateTime updatedAt) {
}