package com.akvasniuk.movieapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(force = true)
@RequiredArgsConstructor
@Table(name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String title;

    @NonNull
    private String poster;

    @NonNull
    @Column(columnDefinition = "TEXT")
    private String description;

    @NonNull
    private Integer rating;

    @OneToOne(mappedBy = "movie", cascade = CascadeType.ALL)
    @JsonIgnore
    private MovieDetails movieDetails;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    public void onPrePersist() {
        createdAt = LocalDateTime.now();
    }
}
