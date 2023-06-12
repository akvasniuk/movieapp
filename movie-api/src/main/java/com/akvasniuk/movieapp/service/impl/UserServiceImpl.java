package com.akvasniuk.movieapp.service.impl;

import com.akvasniuk.movieapp.dto.UserDto;
import com.akvasniuk.movieapp.entity.User;
import com.akvasniuk.movieapp.exception.ResourceAlreadyExist;
import com.akvasniuk.movieapp.exception.ResourceNotFoundException;
import com.akvasniuk.movieapp.repository.UserRepository;
import com.akvasniuk.movieapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public boolean hasUserWithUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean hasUserWithEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User validateAndGetUserByUsername(String username) {
        return getUserByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    @Override
    public String verifyUser(String code) {
        final User userByVerificationCode = userRepository.findUserByVerificationCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("User", "verificationCode", code));

        userByVerificationCode.setEnabled(true);
        userByVerificationCode.setVerificationCode(null);
        userRepository.flush();

        return userByVerificationCode.getUsername();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id.toString()));
    }

    @Override
    public User updateUserByUsername(String username, UserDto userDto) {
        final User user = validateAndGetUserByUsername(username);

        if (!userDto.username().equals(user.getUsername()) && userRepository.existsByUsername(userDto.username())) {
            throw new ResourceAlreadyExist("User", "username", userDto.username());
        }

        if (!userDto.email().equals(user.getEmail()) && userRepository.existsByEmail(userDto.email())) {
            throw new ResourceAlreadyExist("User", "email", userDto.email());
        }

        user.setAvatar(userDto.avatar());
        user.setUsername(userDto.username());
        user.setEmail(userDto.email());
        user.setEnabled(userDto.enabled());
        user.setName(userDto.name());
        user.setUpdatedAt(LocalDateTime.now());
        user.setRole(userDto.role());

        userRepository.flush();
        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("Username %s not found", username)));
    }
}
