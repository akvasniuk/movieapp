package com.akvasniuk.movieapp.controller;

import com.akvasniuk.movieapp.dto.AuthResponse;
import com.akvasniuk.movieapp.dto.LoginRequest;
import com.akvasniuk.movieapp.dto.SignUpRequest;
import com.akvasniuk.movieapp.entity.User;
import com.akvasniuk.movieapp.exception.ResourceAlreadyExist;
import com.akvasniuk.movieapp.mapper.UserMapper;
import com.akvasniuk.movieapp.security.TokenProvider;
import com.akvasniuk.movieapp.service.MailService;
import com.akvasniuk.movieapp.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;
    private final UserMapper userMapper;
    private final MailService mailService;

    @PostMapping("/authenticate")
    public AuthResponse login(@Valid @RequestBody LoginRequest loginRequest) {
        String token = authenticateAndGetToken(loginRequest.getUsername(), loginRequest.getPassword());
        return new AuthResponse(token);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/signup")
    public AuthResponse signUp(@Valid @RequestBody SignUpRequest signUpRequest) {
        if (userService.hasUserWithUsername(signUpRequest.getUsername())) {
            throw new ResourceAlreadyExist("User", "username", signUpRequest.getUsername());
        }
        if (userService.hasUserWithEmail(signUpRequest.getEmail())) {
            throw new ResourceAlreadyExist("User", "email", signUpRequest.getEmail());
        }

        signUpRequest.setVerificationCode(RandomStringUtils.randomAlphabetic(10));
        signUpRequest.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        final User user = userService.saveUser(userMapper.mapSignUpRequestToUser(signUpRequest));

        mailService.sendVerificationCode(user);

        String token = authenticateAndGetToken(signUpRequest.getUsername(), signUpRequest.getPassword());
        return new AuthResponse(token);
    }

    @GetMapping("/verification")
    public ResponseEntity<String> verifyUser(@RequestParam String code) {
        final String username = userService.verifyUser(code);

        return new ResponseEntity<>(String.format("User with username %s successful verified", username), HttpStatus.OK);
    }

    private String authenticateAndGetToken(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        return tokenProvider.generate(authentication);
    }
}
