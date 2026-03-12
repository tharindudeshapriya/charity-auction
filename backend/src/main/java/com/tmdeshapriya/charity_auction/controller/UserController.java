package com.tmdeshapriya.charity_auction.controller;

import com.tmdeshapriya.charity_auction.dto.UpdateUserRequest;
import com.tmdeshapriya.charity_auction.dto.UserCreateRequest;
import com.tmdeshapriya.charity_auction.entity.Role;
import com.tmdeshapriya.charity_auction.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<Long> createUser(
            @Valid @RequestBody UserCreateRequest request,
            Authentication authentication // Injected by Spring Security from the logged-in principal
    ) {

        Role creatorRole = Role.valueOf(
                authentication.getAuthorities().iterator().next().getAuthority());

        Long userId = userService.createUser(request, creatorRole);
        return new ResponseEntity<>(userId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Long> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest request) {
        return ResponseEntity.ok(userService.updateUser(id, request));
    }
}
