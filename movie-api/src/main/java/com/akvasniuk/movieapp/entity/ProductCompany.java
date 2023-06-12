package com.akvasniuk.movieapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(force = true)
@RequiredArgsConstructor
@Table(name = "product_company")
public class ProductCompany {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column(unique = true)
    private String name;

    @NonNull
    @Column(name = "logo_path")
    private String logoPath;

    @ManyToMany
    @JoinTable(
            name = "movie_details_product_company",
            joinColumns = @JoinColumn(name = "movie_details_id"),
            inverseJoinColumns = @JoinColumn(name = "product_company_id")
    )
    @JsonIgnore
    private List<MovieDetails> movieDetails;
}
