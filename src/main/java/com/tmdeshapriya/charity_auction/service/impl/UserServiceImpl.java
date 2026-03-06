package com.tmdeshapriya.charity_auction.service.impl;

import com.tmdeshapriya.charity_auction.dto.UserCreateRequest;
import com.tmdeshapriya.charity_auction.entity.Role;
import com.tmdeshapriya.charity_auction.entity.User;
import com.tmdeshapriya.charity_auction.exception.AccessDeniedException;
import com.tmdeshapriya.charity_auction.exception.DuplicateResourceException;
import com.tmdeshapriya.charity_auction.repository.UserRepository;
import com.tmdeshapriya.charity_auction.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public Long createUser(UserCreateRequest request, Role creatorRole) {
        // 1. Validate Hierarchy Logic
        validateHierarchy(creatorRole, request.getRole());

        // 2. Validate Username Uniqueness
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new DuplicateResourceException("Username already exists: " + request.getUsername());
        }

        // 3. Map DTO to Entity
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword()); // Temporarily plain text as requested
        user.setRole(request.getRole());

        // 4. Save and return ID
        User savedUser = userRepository.save(user);
        return savedUser.getId();
    }

    private void validateHierarchy(Role creatorRole, Role targetRole) {
        if (creatorRole == Role.ROLE_ADMIN) {
            // Admin can create Organizer or Bidder
            if (targetRole == Role.ROLE_ADMIN) {
                throw new AccessDeniedException("Admin cannot create another Admin via this endpoint");
            }
        } else if (creatorRole == Role.ROLE_ORGANIZER) {
            // Organizer can ONLY create Bidder
            if (targetRole != Role.ROLE_BIDDER) {
                throw new AccessDeniedException("Organizers can only create Bidders");
            }
        } else {
            // Bidders cannot create anyone
            throw new AccessDeniedException("Bidders are not allowed to create users");
        }
    }
}
