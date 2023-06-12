package com.akvasniuk.movieapp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "movie_details")
public class MovieDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String tagline;

    @NotNull
    private Integer runtime;

    @NotNull
    private String status;


    @Column(name = "release_date")
    @NotNull
    private LocalDate releaseDate;

    @NotNull
    private Integer popularity;

    @NotNull
    @Column(columnDefinition = "TEXT")
    private String overview;

    @ManyToMany(mappedBy = "movieDetails", fetch = FetchType.EAGER,
            cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @Fetch(value = FetchMode.SUBSELECT)
    private List<Genre> genres;

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, mappedBy = "movieDetails", fetch = FetchType.EAGER)
    @Fetch(value = FetchMode.SUBSELECT)
    private List<ProductCompany> productCompanies;

    @OneToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    public void onPrePersist() {
        createdAt = LocalDateTime.now();
    }
}
