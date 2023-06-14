import css from "../../user/Company/Company.module.css";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../../context/AuthContext";
import {movieApi} from "../../../services/MovieApi";

const ProductCompany = ({companies}) => {
    const Auth = useContext(AuthContext)
    const user = Auth.getUser();
    const [productCompanies, setProductCompanies] = useState([]);

    useEffect(() => {
        const getCompanies = async () => {
            const {data: companiesApi} = await movieApi.getProductCompanies(user);
            setProductCompanies(companiesApi.filter(productCompany => companies.includes(productCompany.id)))
        }

        getCompanies()
    }, [])

    console.log(productCompanies)

    return (
        productCompanies &&
        productCompanies.map(company =>
            <div className={css.company}>
                <div className={css.img_container}>
                    <img src={company.logoPath} alt={company.name}/>
                </div>
                <span>{company.name}</span>
            </div>)
    );
};

export {ProductCompany};