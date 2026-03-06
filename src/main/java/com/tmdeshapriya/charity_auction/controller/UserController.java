package com.tmdeshapriya.charity_auction.controller;

import com.tmdeshapriya.charity_auction.dto.UserCreateRequest;
import com.tmdeshapriya.charity_auction.entity.Role;
import com.tmdeshapriya.charity_auction.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<Long> createUser(
            @Valid @RequestBody UserCreateRequest request,
            @RequestHeader(name = "X-Creator-Role") Role creatorRole // Temporary header until Security is added
    ) {
        Long userId = userService.createUser(request, creatorRole);
        return new ResponseEntity<>(userId, HttpStatus.CREATED);
    }
}
