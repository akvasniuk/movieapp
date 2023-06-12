package com.akvasniuk.movieapp.service;

import com.akvasniuk.movieapp.entity.User;

public interface MailService {
    void sendVerificationCode(User user);
}
