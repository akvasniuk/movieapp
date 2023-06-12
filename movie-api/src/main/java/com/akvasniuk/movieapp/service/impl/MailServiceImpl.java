package com.akvasniuk.movieapp.service.impl;

import com.akvasniuk.movieapp.entity.User;
import com.akvasniuk.movieapp.service.MailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {
    private final JavaMailSender mailSender;

    @Async
    @Override
    public void sendVerificationCode(User user) {
        String toAddress = user.getEmail();
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "Your company name.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        content = content.replace("[[name]]", user.getUsername());
        String verifyURL = "http://localhost:8080/auth/verification?code=" + user.getVerificationCode();
        content = content.replace("[[URL]]", verifyURL);

        try {
            helper.setTo(toAddress);
            helper.setSubject(subject);
            helper.setText(content, true);
        } catch (MessagingException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong mail setup");
        }

        mailSender.send(message);
    }
}
