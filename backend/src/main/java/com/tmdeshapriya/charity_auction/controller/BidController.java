package com.tmdeshapriya.charity_auction.controller;

import com.tmdeshapriya.charity_auction.dto.PlaceBidRequest;
import com.tmdeshapriya.charity_auction.security.AuthenticatedUser;
import com.tmdeshapriya.charity_auction.service.BidService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/items")
@RequiredArgsConstructor
public class BidController {

    private final BidService bidService;

    @PostMapping("/{itemId}/bids")
    public ResponseEntity<Long> placeBid(
            @PathVariable Long itemId,
            @Valid @RequestBody PlaceBidRequest request,
            Authentication authentication) {
        Long userId = ((AuthenticatedUser) authentication.getPrincipal()).getUserId();
        return new ResponseEntity<>(bidService.placeBid(itemId, request, userId), HttpStatus.CREATED);
    }
}
