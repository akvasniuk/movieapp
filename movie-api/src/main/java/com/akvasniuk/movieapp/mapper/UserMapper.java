package com.akvasniuk.movieapp.mapper;

import com.akvasniuk.movieapp.dto.SignUpRequest;
import com.akvasniuk.movieapp.entity.User;
import com.akvasniuk.movieapp.dto.UserDto;

public interface UserMapper {

    UserDto toUserDto(User user);

    User mapSignUpRequestToUser(SignUpRequest signUpRequest);
}