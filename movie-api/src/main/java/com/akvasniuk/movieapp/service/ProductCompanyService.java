package com.akvasniuk.movieapp.service;

import com.akvasniuk.movieapp.entity.ProductCompany;

import java.util.List;

public interface ProductCompanyService {
    ProductCompany saveProductCompany(ProductCompany productCompany);

    ProductCompany getProductCompanyById(Long id);

    ProductCompany getProductCompanyByName(String name);

    List<ProductCompany> getProductCompanies();
}
