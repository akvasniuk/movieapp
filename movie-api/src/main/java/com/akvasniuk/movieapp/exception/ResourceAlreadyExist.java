package com.akvasniuk.movieapp.exception;

public class ResourceAlreadyExist extends RuntimeException {
    public ResourceAlreadyExist(String entity, String field, String value) {
        super(String.format("%s with %s %s already exists", entity, field, value));
    }
}
