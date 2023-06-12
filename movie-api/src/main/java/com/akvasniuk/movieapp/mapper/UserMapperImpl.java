package com.akvasniuk.movieapp.mapper;

import com.akvasniuk.movieapp.dto.SignUpRequest;
import com.akvasniuk.movieapp.dto.UserDto;
import com.akvasniuk.movieapp.entity.User;
import org.springframework.stereotype.Component;

import static com.akvasniuk.movieapp.entity.USER_ROLE.USER;

@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDto toUserDto(User user) {
        if (user == null) {
            return null;
        }

        return new UserDto(user.getId(), user.getUsername(), user.getName(), user.getEmail(), user.getRole(),
                user.getCreatedAt(), user.getAvatar(), user.isEnabled(), user.getVerificationCode(), user.getUpdatedAt());
    }

    @Override
    public User mapSignUpRequestToUser(SignUpRequest signUpRequest) {
        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(signUpRequest.getPassword());
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setRole(USER.name());
        user.setAvatar(signUpRequest.getAvatar());
        user.setVerificationCode(signUpRequest.getVerificationCode());
        return user;
    }
}
