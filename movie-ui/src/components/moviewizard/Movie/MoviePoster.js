import React, {Component} from 'react'
import css from "../../user/MovieDetails/MovieDetails.module.css";
import {Rating} from "semantic-ui-react";
import {GenreBadge} from "../../user/GenreBadge/GenreBadge";
import {ProductCompany} from "./ProductCompany";

class MoviePoster extends Component {
    render() {
        const {
            rating,
            title,
            poster,
            tagline,
            runtime,
            releaseDate,
            popularity,
            overview,
            genres,
            productCompanies
        } = this.props?.movie;


        return (
            <div>
                <div className={css.movieCard}>
                    <div className={css.container}
                         style={{background: `url(${poster}) 0 0 / 300px 316px no-repeat`}}>

                        <div className={css.hero}>

                            <div className={css.details}>

                                <div className={css.title1} style={{color: "black"}}>{title}
                                </div>

                                <div className={css.title2} style={{color: "black"}}>{tagline}
                                    <span className={css.span}>{overview}</span>
                                    <span className={css.span}>runtime {runtime}</span>
                                </div>

                                <div className={css.title2}>
                                    {this.props.movie && rating
                                        && <Rating icon={"star"} defaultRating={rating} maxRating={5}/>}
                                </div>
                            </div>
                        </div>

                        <div className={css.description} style={{display: "flex", justifyContent: "center"}}>
                            <div className={css.column1}>
                                {genres && <GenreBadge receivedGenres={genres} isIds={true}/>}
                                <p>
                                    Release data {releaseDate}
                                </p>
                                <p>
                                    Popularity {popularity}
                                </p>
                            </div>
                        </div>
                        <h4 className={css.center}>Companies</h4>
                        <div className={css.companies}>
                            <ProductCompany companies={productCompanies}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MoviePoster;