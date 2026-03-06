package com.tmdeshapriya.charity_auction.service;

import com.tmdeshapriya.charity_auction.dto.PlaceBidRequest;

public interface BidService {
    Long placeBid(Long itemId, PlaceBidRequest request, Long userId);
}
