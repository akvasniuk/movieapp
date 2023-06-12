package com.akvasniuk.movieapp.runner;

import com.akvasniuk.movieapp.entity.*;
import com.akvasniuk.movieapp.service.*;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static com.akvasniuk.movieapp.entity.USER_ROLE.ADMIN;
import static com.akvasniuk.movieapp.entity.USER_ROLE.USER;

@Slf4j
@RequiredArgsConstructor
@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final MovieService movieService;
    private final GenreService genreService;
    private final ProductCompanyService productCompanyService;
    private final MovieDetailsService movieDetailsService;
    private final EntityManager entityManager;

    @Override
    @Transactional
    public void run(String... args) {
        if (!userService.getUsers().isEmpty()) {
            return;
        }
        USERS.forEach(user -> {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userService.saveUser(user);
        });

        MOVIES.forEach(movieService::saveMovie);
        GENRES.forEach(genreService::saveGenre);
        PRODUCT_COMPANIES.forEach(productCompanyService::saveProductCompany);

        MOVIE_DETAILS.forEach(movieDetails -> {
            movieDetailsService.saveMovieDetails(movieDetails);

            movieDetails.getGenres()
                            .forEach(genre -> {
                                genre.setMovieDetails(List.of(movieDetails));
                                entityManager.persist(genre);
                            });

            movieDetails.getProductCompanies()
                    .forEach(productCompany -> {
                        productCompany.setMovieDetails(List.of(movieDetails));
                        entityManager.persist(productCompany);
                    });
        });

        log.info("Database initialized");
    }

    private static final List<User> USERS = Arrays.asList(
            User.builder().email("admin@mycompany.com")
                    .name("Admin")
                    .username("admin")
                    .password("admin")
                    .role(ADMIN.name())
                    .enabled(true)
                    .build(),
            User.builder().email("user@mycompany.com")
                    .name("User")
                    .username("user")
                    .password("user")
                    .role(USER.name())
                    .enabled(true)
                    .build()
    );

    private static final List<Genre> GENRES = Arrays.asList(
            new Genre("Adventure"),
            new Genre("Action"),
            new Genre("Comedy"),
            new Genre("Crime and mystery"),
            new Genre("Fantasy"),
            new Genre("Historical"),
            new Genre("Horror"),
            new Genre("Romance")
    );

    private static final List<ProductCompany> PRODUCT_COMPANIES = Arrays.asList(
            new ProductCompany("Walt Disney Company", "https://media.glassdoor.com/sql/717/walt-disney-company-squarelogo-1574088286127.png"),
            new ProductCompany("Paramount", "https://media.glassdoor.com/sql/40260/paramount-squareLogo-1663339194978.png"),
            new ProductCompany("Warner Bros. Discovery", "https://media.glassdoor.com/sql/12777/warnermedia-squareLogo-1674847123342.png"),
            new ProductCompany("Warner Bros.", "https://media.glassdoor.com/sql/13195/warner-bros-squarelogo-1576670982067.png"),
            new ProductCompany("Universal Studios", "https://media.glassdoor.com/sql/4200/universal-studios-squarelogo-1497379363448.png"),
            new ProductCompany("Sony Pictures Entertainment", "https://media.glassdoor.com/sql/7878/sony-pictures-entertainment-squarelogo-1573432718022.png"),
            new ProductCompany("Paramount Pictures", "https://media.glassdoor.com/sql/13273/paramount-pictures-squareLogo-1650990628983.png")
    );

    private static final List<Movie> MOVIES = Arrays.asList(
            new Movie("I, Tonya", "https://m.media-amazon.com/images/M/MV5BMjI5MDY1NjYzMl5BMl5BanBnXkFtZTgwNjIzNDAxNDM@._V1_SX300.jpg",
                    "In 1991, talented figure skater Tonya Harding becomes the first American woman to complete a triple axel during a competition. In 1994, her world comes crashing down when her ex-husband conspires to injure Nancy Kerrigan, a fellow Olympic hopeful, in a poorly conceived attack that forces the young woman to withdraw from the national championship. Harding's life and legacy instantly become tarnished as she's forever associated with one of the most infamous scandals in sports history. ", 3),
            new Movie("American Pie", "https://m.media-amazon.com/images/M/MV5BMTg3ODY5ODI1NF5BMl5BanBnXkFtZTgwMTkxNTYxMTE@._V1_SX300.jpg",
                    "A riotous and raunchy exploration of the most eagerly anticipated -- and most humiliating -- rite of adulthood, known as losing one's virginity. In this hilarious lesson in life, love and libido, a group of friends, fed up with their well-deserved reputations as sexual no-hitters, decide to take action. ", 5),
            new Movie("I Am Legend", "https://m.media-amazon.com/images/M/MV5BYTE1ZTBlYzgtNmMyNS00ZTQ2LWE4NjEtZjUxNDJkNTg2MzlhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
                    "Robert Neville (Will Smith), a brilliant scientist, is a survivor of a man-made plague that transforms humans into bloodthirsty mutants. He wanders alone through New York City, calling out for other possible survivors, and works on finding a cure for the plague using his own immune blood. Neville knows he is badly outnumbered and the odds are against him, and all the while, the infected wait for him to make a mistake that will deliver Neville into their hands. ", 3),
            new Movie("Resident Evil", "https://m.media-amazon.com/images/M/MV5BZmI1ZGRhNDYtOGVjZC00MmUyLThlNTktMTQyZGE3MzE1ZTdlXkEyXkFqcGdeQXVyNDE5MTU2MDE@._V1_SX300.jpg",
                    "Soldiers battle hordes of zombies while trying to prevent a madman from unleashing a deadly virus in New York.", 4),
            new Movie("Rocky", "https://m.media-amazon.com/images/M/MV5BMTY5MDMzODUyOF5BMl5BanBnXkFtZTcwMTQ3NTMyNA@@._V1_SX300.jpg",
                    "A young man with a lackadaisical attitude is thrust headfirst into a world of violence after he decides to seek vengeance against an evil villain. ", 3),
            new Movie("The Green Line", "https://m.media-amazon.com/images/M/MV5BMzZkNTRjZjEtNDVhNi00NGEyLWE2NWYtNTUzOTFlNGVmMDFjXkEyXkFqcGdeQXVyODg0NjM4MDg@._V1_SX300.jpg",
                    "This film covers certain personalities' efforts and sacrifices to make Kerala an organ and body donor state in India.", 5),
            new Movie("Joker", "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
                    "Forever alone in a crowd, failed comedian Arthur Fleck seeks connection as he walks the streets of Gotham City. Arthur wears two masks -- the one he paints for his day job as a clown, and the guise he projects in a futile attempt to feel like he's part of the world around him. Isolated, bullied and disregarded by society, Fleck begins a slow descent into madness as he transforms into the criminal mastermind known as the Joker. ", 4),
            new Movie("Braveheart", "https://m.media-amazon.com/images/M/MV5BMzkzMmU0YTYtOWM3My00YzBmLWI0YzctOGYyNTkwMWE5MTJkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
                    "Tells the story of the legendary thirteenth century Scottish hero named William Wallace (Mel Gibson). Wallace rallies the Scottish against the English monarch and Edward I (Peter Hanly) after he suffers a personal tragedy by English soldiers. Wallace gathers a group of amateur warriors that is stronger than any English army. ", 3),
            new Movie("Into the Wild", "https://m.media-amazon.com/images/M/MV5BMTAwNDEyODU1MjheQTJeQWpwZ15BbWU2MDc3NDQwNw@@._V1_SX300.jpg",
                    "Christopher McCandless (Emile Hirsch), son of wealthy parents (Marcia Gay Harden, William Hurt), graduates from Emory University as a top student and athlete. However, instead of embarking on a prestigious and profitable career, he chooses to give his savings to charity, rid himself of his possessions, and set out on a journey to the Alaskan wilderness. ", 4),
            new Movie("Back to the Future", "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
                    "In this 1980s sci-fi classic, small-town California teen Marty McFly (Michael J. Fox) is thrown back into the '50s when an experiment by his eccentric scientist friend Doc Brown (Christopher Lloyd) goes awry. Traveling through time in a modified DeLorean car, Marty encounters young versions of his parents (Crispin Glover, Lea Thompson), and must make sure that they fall in love or he'll cease to exist. Even more dauntingly, Marty has to return to his own time and save the life of Doc Brown. ", 5)
    );

    private static final List<MovieDetails> MOVIE_DETAILS = Arrays.asList(
            MovieDetails.builder().tagline("There's no need to have class when you have talent.").runtime(90)
                    .genres(List.of(GENRES.get(0), GENRES.get(1))).releaseDate(LocalDate.of(2020, 4, 13))
                    .status("Released").popularity(1000).overview("In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.")
                    .productCompanies(List.of(PRODUCT_COMPANIES.get(2), PRODUCT_COMPANIES.get(3)))
                    .movie(MOVIES.get(0)).build(),

            MovieDetails.builder().tagline("There's no need to have class when you have talent.").runtime(60)
                    .genres(List.of(GENRES.get(3), GENRES.get(2))).releaseDate(LocalDate.of(2019, 4, 13))
                    .status("Released").popularity(1000).overview("In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.")
                    .productCompanies(List.of(PRODUCT_COMPANIES.get(1), PRODUCT_COMPANIES.get(0)))
                    .movie(MOVIES.get(1)).build(),

            MovieDetails.builder().tagline("There's no need to have class when you have talent.").runtime(120)
                    .genres(List.of(GENRES.get(4), GENRES.get(5))).releaseDate(LocalDate.of(2013, 4, 13))
                    .status("Released").popularity(1000).overview("In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.")
                    .productCompanies(List.of(PRODUCT_COMPANIES.get(4), PRODUCT_COMPANIES.get(5)))
                    .movie(MOVIES.get(2)).build(),

            MovieDetails.builder().tagline("There's no need to have class when you have talent.").runtime(100)
                    .genres(List.of(GENRES.get(6), GENRES.get(7))).releaseDate(LocalDate.of(2012, 4, 13))
                    .status("Released").popularity(1000).overview("In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.")
                    .productCompanies(List.of(PRODUCT_COMPANIES.get(6), PRODUCT_COMPANIES.get(0)))
                    .movie(MOVIES.get(3)).build(),

            MovieDetails.builder().tagline("There's no need to have class when you have talent.").runtime(60)
                    .genres(List.of(GENRES.get(4), GENRES.get(2))).releaseDate(LocalDate.of(2011, 4, 13))
                    .status("Released").popularity(1000).overview("In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.")
                    .productCompanies(List.of(PRODUCT_COMPANIES.get(2), PRODUCT_COMPANIES.get(1)))
                    .movie(MOVIES.get(4)).build(),

            MovieDetails.builder().tagline("There's no need to have class when you have talent.").runtime(130)
                    .genres(List.of(GENRES.get(2), GENRES.get(2))).releaseDate(LocalDate.of(2009, 4, 13))
                    .status("Released").popularity(1000).overview("In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.")
                    .productCompanies(List.of(PRODUCT_COMPANIES.get(1), PRODUCT_COMPANIES.get(3)))
                    .movie(MOVIES.get(5)).build(),

            MovieDetails.builder().tagline("There's no need to have class when you have talent.").runtime(60)
                    .genres(List.of(GENRES.get(1), GENRES.get(0))).releaseDate(LocalDate.of(2014, 4, 13))
                    .status("Released").popularity(1000).overview("In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.")
                    .productCompanies(List.of(PRODUCT_COMPANIES.get(5), PRODUCT_COMPANIES.get(1)))
                    .movie(MOVIES.get(6)).build(),

            MovieDetails.builder().tagline("There's no need to have class when you have talent.").runtime(60)
                    .genres(List.of(GENRES.get(4), GENRES.get(2))).releaseDate(LocalDate.of(2002, 4, 13))
                    .status("Released").popularity(1000).overview("In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.")
                    .productCompanies(List.of(PRODUCT_COMPANIES.get(1), PRODUCT_COMPANIES.get(0)))
                    .movie(MOVIES.get(7)).build(),

            MovieDetails.builder().tagline("There's no need to have class when you have talent.").runtime(60)
                    .genres(List.of(GENRES.get(6), GENRES.get(0))).releaseDate(LocalDate.of(2005, 4, 13))
                    .status("Released").popularity(1000).overview("In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.")
                    .productCompanies(List.of(PRODUCT_COMPANIES.get(6), PRODUCT_COMPANIES.get(1)))
                    .movie(MOVIES.get(8)).build(),

            MovieDetails.builder().tagline("There's no need to have class when you have talent.").runtime(60)
                    .genres(List.of(GENRES.get(4), GENRES.get(5))).releaseDate(LocalDate.of(2007, 4, 13))
                    .status("Released").popularity(1000).overview("In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.")
                    .productCompanies(List.of(PRODUCT_COMPANIES.get(3), PRODUCT_COMPANIES.get(4)))
                    .movie(MOVIES.get(9)).build()
    );
}
