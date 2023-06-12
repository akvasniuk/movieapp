package com.akvasniuk.movieapp.controller;

import com.akvasniuk.movieapp.dto.UserDto;
import com.akvasniuk.movieapp.entity.USER_ROLE;
import com.akvasniuk.movieapp.entity.User;
import com.akvasniuk.movieapp.mapper.UserMapper;
import com.akvasniuk.movieapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping("/me")
    public UserDto getCurrentUser(@AuthenticationPrincipal User currentUser) {
        return userMapper.toUserDto(userService.validateAndGetUserByUsername(currentUser.getUsername()));
    }

    @GetMapping
    public List<UserDto> getUsers() {
        return userService.getUsers().stream()
                .map(userMapper::toUserDto)
                .toList();
    }

    @GetMapping("/{username}")
    public UserDto getUser(@PathVariable String username) {
        return userMapper.toUserDto(userService.validateAndGetUserByUsername(username));
    }

    @DeleteMapping("/{username}")
    public UserDto deleteUser(@PathVariable String username) {
        User user = userService.validateAndGetUserByUsername(username);
        userService.deleteUser(user);
        return userMapper.toUserDto(user);
    }

    @PutMapping("/{username}/avatar")
    public UserDto updateUserAvatar(@PathVariable String username, @RequestBody UserDto userDto) {
        User user = userService.validateAndGetUserByUsername(username);
        user.setAvatar(userDto.avatar());
        return userMapper.toUserDto(userService.saveUser(user));
    }

    @PutMapping("/{username}")
    public User updateUser(@PathVariable String username, @RequestBody UserDto userDto) {
        return userService.updateUserByUsername(username, userDto);
    }

    @GetMapping("/roles")
    public List<String> getRoles() {
        return Arrays.stream(USER_ROLE.values())
                .map(Enum::name)
                .toList();
    }
}