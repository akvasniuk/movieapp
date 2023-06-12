package com.akvasniuk.movieapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@RequiredArgsConstructor
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column(unique = true)
    private String name;

    @ManyToMany
    @JoinTable(name = "movie_details_genre",
    joinColumns = @JoinColumn(name = "movie_details_id"),
    inverseJoinColumns = @JoinColumn(name = "genre_id"))
    @JsonIgnore
    private List<MovieDetails> movieDetails;
}
