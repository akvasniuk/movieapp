package com.akvasniuk.movieapp.exception;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String entity, String field, String value) {
        super(String.format("%s doesn't exist with such %s[%s]", entity, field, value));
    }
}
