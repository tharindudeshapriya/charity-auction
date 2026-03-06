package com.tmdeshapriya.charity_auction.service;

import com.tmdeshapriya.charity_auction.dto.UpdateUserRequest;
import com.tmdeshapriya.charity_auction.dto.UserCreateRequest;
import com.tmdeshapriya.charity_auction.entity.Role;

public interface UserService {
    Long createUser(UserCreateRequest request, Role creatorRole);

    Long updateUser(Long id, UpdateUserRequest request);
}
