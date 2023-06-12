package com.akvasniuk.movieapp.service;

import com.akvasniuk.movieapp.dto.UserDto;
import com.akvasniuk.movieapp.entity.User;

import java.util.List;
import java.util.Optional;
import java.util.Stack;

public interface UserService {

    List<User> getUsers();

    Optional<User> getUserByUsername(String username);

    boolean hasUserWithUsername(String username);

    boolean hasUserWithEmail(String email);

    User validateAndGetUserByUsername(String username);

    User saveUser(User user);

    void deleteUser(User user);

    String verifyUser(String code);

    User getUserById(Long id);

    User updateUserByUsername(String username, UserDto userDto);
}
