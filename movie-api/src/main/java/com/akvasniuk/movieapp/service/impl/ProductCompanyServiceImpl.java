package com.akvasniuk.movieapp.service.impl;

import com.akvasniuk.movieapp.entity.ProductCompany;
import com.akvasniuk.movieapp.exception.ResourceNotFoundException;
import com.akvasniuk.movieapp.repository.ProductCompanyRepository;
import com.akvasniuk.movieapp.service.ProductCompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class ProductCompanyServiceImpl implements ProductCompanyService {
    private final ProductCompanyRepository productCompanyRepository;

    @Override
    public ProductCompany saveProductCompany(ProductCompany productCompany) {
        return productCompanyRepository.save(productCompany);
    }

    @Override
    public ProductCompany getProductCompanyById(Long id) {
        return productCompanyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ProductCompany", "id", id.toString()));
    }

    @Override
    public ProductCompany getProductCompanyByName(String name) {
        return productCompanyRepository.findProductCompaniesByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("ProductCompany", "name", name));
    }

    @Override
    public List<ProductCompany> getProductCompanies() {
        return productCompanyRepository.findAll();
    }
}
