package com.tmdeshapriya.charity_auction.service.impl;

import com.tmdeshapriya.charity_auction.dto.PlaceBidRequest;
import com.tmdeshapriya.charity_auction.entity.Bid;
import com.tmdeshapriya.charity_auction.entity.Item;
import com.tmdeshapriya.charity_auction.entity.ItemStatus;
import com.tmdeshapriya.charity_auction.entity.User;
import com.tmdeshapriya.charity_auction.exception.AccessDeniedException;
import com.tmdeshapriya.charity_auction.exception.BusinessException;
import com.tmdeshapriya.charity_auction.exception.ResourceNotFoundException;
import com.tmdeshapriya.charity_auction.repository.BidRepository;
import com.tmdeshapriya.charity_auction.repository.ItemRepository;
import com.tmdeshapriya.charity_auction.repository.UserRepository;
import com.tmdeshapriya.charity_auction.service.BidService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BidServiceImpl implements BidService {

    private final BidRepository bidRepository;
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public Long placeBid(Long itemId, PlaceBidRequest request, Long userId) {
        // 1. Fetch Item and User
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found: " + itemId));
        
        User currentUser = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));

        // 2. Validate Auction Status and End Time
        if (item.getStatus() != ItemStatus.ACTIVE || item.getAuctionEndTime().isBefore(LocalDateTime.now())) {
            throw new BusinessException("Auction is not active or has already ended");
        }

        // 3. Anti-Shill Bidding: Organizer cannot bid on their own item
        if (item.getOrganizer().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Organizers cannot bid on their own items");
        }

        // 4. Anti-Self Bidding: Highest bidder cannot outbid themselves
        if (item.getHighestBidder() != null && item.getHighestBidder().getId().equals(currentUser.getId())) {
            throw new BusinessException("You are already the highest bidder");
        }

        // 5. Amount Validation
        // If it's the first bid, it must be >= starting price. 
        // If there are previous bids, it must be > current highest bid.
        // (Note: Implementation logic ensures currentHighestBid starts at startingPrice in ItemServiceImpl)
        if (item.getHighestBidder() == null) {
            if (request.getAmount() < item.getStartingPrice()) {
                throw new BusinessException("Bid must be at least the starting price: " + item.getStartingPrice());
            }
        } else {
            if (request.getAmount() <= item.getCurrentHighestBid()) {
                throw new BusinessException("Bid must be higher than the current highest bid: " + item.getCurrentHighestBid());
            }
        }

        // 6. Save Bid and Update Item
        // Note: @Version field in Item handles concurrent race conditions automatically.
        Bid bid = new Bid();
        bid.setAmount(request.getAmount());
        bid.setBidTime(LocalDateTime.now());
        bid.setItem(item);
        bid.setUser(currentUser);
        bidRepository.save(bid);

        item.setCurrentHighestBid(request.getAmount());
        item.setHighestBidder(currentUser);
        itemRepository.save(item);

        return bid.getId();
    }
}
