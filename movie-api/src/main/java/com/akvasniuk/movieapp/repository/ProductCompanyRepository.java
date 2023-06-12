package com.akvasniuk.movieapp.repository;

import com.akvasniuk.movieapp.entity.ProductCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductCompanyRepository extends JpaRepository<ProductCompany, Long> {
    Optional<ProductCompany> findProductCompaniesByName(String name);
}
