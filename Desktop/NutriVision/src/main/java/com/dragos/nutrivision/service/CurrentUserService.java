package com.dragos.nutrivision.service;

import com.dragos.nutrivision.entity.User;
import com.dragos.nutrivision.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class CurrentUserService {

    private final UserRepository userRepository;

    public CurrentUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) auth.getPrincipal();
        String email = userDetails.getUsername();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Current user not found"));
    }
}